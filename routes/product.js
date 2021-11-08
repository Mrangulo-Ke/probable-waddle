const { Router } = require("express");
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req,body);
    try {
        const savedProduct = await newProduct
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleting product has been succesful!")
    } catch (err) {
        res.status(500).json(err)        
    }
})

//GET
router.get("/find/:id",async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (errr) {
        res.status(500).json(err)        
    }
});

//GET ALL USERS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.categories;
    try {
        let products;
         
        if (qNew){
            products= Product.find().sort({createdAt: -1}).limit(5)
        } else if (qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find(products);
        }
    } catch (errr) {
        res.status(500).json(err)        
    }
});

module.exports = router;