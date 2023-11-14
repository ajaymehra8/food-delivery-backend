const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post('/orderData', async (req, res) => {
    console.log("hey hello");

    // Create a new item with Order_date and prepend it to the existing order_data
    const newDataItem = { Order_date: req.body.order_date };
    const data = [newDataItem, ...req.body.order_data];

    // Check if email exists in the database
    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            console.log(data);
            console.log("1231242343242354", req.body.email);

            // Create a new document with email and order_data
            await Order.create({
                email: req.body.email,
                order_data: data,
            }).then(() => {
                console.log("Added successfully");
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        try {
            // Update the existing document with the new order_data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { order_data: data },
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


module.exports = router;
