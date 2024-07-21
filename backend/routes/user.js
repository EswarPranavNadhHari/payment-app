const express = require('express');
const { User, Account } = require("./../db.js");
const {authMiddleware} = require("./../middleware.js")
const z = require('zod');
const {JWT_SECRET: TOKEN} = require("./../config.js")
const jwt = require("jsonwebtoken");

const signupBody = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6, "Password must be atleast 6 characters")
})

const signinBody = z.object({
    username: z.string(),
	password: z.string()
})

const updateBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6, "Password must be atleast 6 characters")
})

const router = express.Router();

router.post("/signup", async (req, res)=>{

    try {
        signupBody.safeParse(req.body);
        const username = req.body.username;
        const list = await User.find({username});

        if(list.length > 0){
            return res.status(409).send({
                message: "Username already taken"
            })
        }

        const {_id} = await User.create(req.body);
        randomBalance = Math.random()*10000;
        await Account.create({userId: _id, balance: randomBalance})
        const token = jwt.sign({id:_id}, TOKEN);

        return res.send({
            message: "User created successfully",
            token,
        })

    } catch (error) {
        return res.status(400).send({
            "message": error.message
        })
    }

});

router.post("/signin", async (req, res) => {

    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({username: req.body.username, password: req.body.password})

    if(user){
        const token = jwt.sign({
            id: user._id,
        }, TOKEN)
        return res.send({
            "token": token
        })
    }

    return res.status(411).send({
        message: "Error while logging in"
    })

});

router.put("/", authMiddleware, async (req, res)=>{
    try{
        updateBody.safeParse(req.body)
        await User.updateOne({_id: req.userId}, req.body);
    }
    catch(error){
        return res.status(411).send({message: "Error while updating information"})
    }
    return res.send({message: "Updated successfully"})
});

router.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter;
        let users = await User.find({
            $or: [
              { firstName: { $regex: filter, $options: 'i' } },
              { lastName: { $regex: filter, $options: 'i' } }
            ]
        });

        const id = req.userId;
        // console.log(id);

        

        users = await users.filter((user) => user._id != id);

        // console.log(users);

        users = users.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }));

        // console.log(users);
        
        return res.send({
            users
        })
    } catch (error) {
        return res.status(403).send({
            message: "Forbidden"
        })
    }
    
});

router.get("/details", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.userId
        });
        if(!user) {
            return res.status(400).send({
                message: "Invalid account"
            })
        }
        const firstName = user.firstName
        res.json({
            firstName
        })
    } catch (error) {
        return res.status(403).send({
            message: "Forbidden"
        })
    }
    
});

router.all("/*", (req, res) => {
    return res.status(404).send("page not found");
});



module.exports = router