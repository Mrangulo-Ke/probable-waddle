const { Router } = require("express");
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken async (req, res) => {
    const newCart = new Cart(req,body);
    try {
        const savedCart = await newCart
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleting Cart has been succesful!")
    } catch (err) {
        res.status(500).json(err)        
    }
})

//GET
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    } catch (errr) {
        res.status(500).json(err)        
    }
});

module.exports = router;