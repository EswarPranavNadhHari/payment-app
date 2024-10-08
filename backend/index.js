const rootRouter = require("./routes/index.js")
const cors = require("cors")
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, ()=>{
    console.log("Server is running...")
});