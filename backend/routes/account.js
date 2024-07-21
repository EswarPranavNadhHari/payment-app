const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { User, Account } = require("./../db.js");
const { authMiddleware } = require("./../middleware.js")
const {z} = require("zod");

const transferBody = z.object({
    to: z.string(),
    amount: z.string()
})

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    if(!account) {
        return res.status(400).send({
            message: "Invalid account"
        })
    }
    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const success = transferBody.safeParse(req.body);
    if(!success){
        return res.status(400).send({
            message: "Invalid account"
        })
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    const {to, amount} = req.body;
    const userAccount = await Account.findOne({userId: req.userId}).session(session);
    const balance = userAccount.balance;
    if(amount > balance) {
        await session.abortTransaction();
        return res.status(400).send({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).res.send({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc:{balance: amount}}).session(session);
    await session.commitTransaction();

    return res.send({
        message: "Transaction successful"
    });


});

router.all("/*", (req, res)=>{
    return res.status(404).send("page not found");
})
module.exports = router;

