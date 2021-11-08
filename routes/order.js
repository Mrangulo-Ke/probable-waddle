const { Router } = require("express");
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req,body);
    try {
        const savedOrder = await newOrder
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const  orders = await Order.findOne(req.params.id);
        res.status(200).json(orders);
    } catch (errr) {
        res.status(500).json(err)        
    }
});

//GET ALL INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastMounth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
    
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount",
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"},
                    },
                },
            ]);
            res.status(200).json(err);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;