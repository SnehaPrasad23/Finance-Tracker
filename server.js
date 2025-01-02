const express = require("express");   // import statement
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const path = require("path");

//config dotenv file
dotenv.config();

//database call
connectDb();

//rest object to use express features
const app = express();

//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors());

//routes
// app.get("/", (req,res) => {
//     res.send('<h1>Hello from server</h1>');
// })

//user routes
app.use("/api/v1/users", require("./routes/userRoute"))

//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoute"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

//port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});