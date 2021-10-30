const router = require("express").Router();
const User = require("../models/User")
const CryptoJs = require("crypto-js")

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email, 
        password: CryptoJs.AES.encrypt(
            req.body.password,
            process.env.SECRET_PASSCODE
        ).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Users Credentials")

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.SECRET_PASSCODE);
        const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong Users Credentials");
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;
