const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

dotenv.config();

mongoose
    .connect(
     process.env.MONGO_URL
    )
    .then(() => console.log("Database Connection was a success"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/users", userRoute); 

app.listen(process.env.PORT, () => {
    console.log("Backend server is running on port 3005");
});