const PORT = 4000;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authroute.js");
const app = express();


mongoose.connect("mongodb+srv://rugvedwagh02:rugved76@cluster0.vkfquoj.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB is  connected successfully")).catch((err) => {
    console.error(err)
});


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

app.listen(PORT, () => {
    console.log(`\nServer is listening on port ${PORT}`);
});