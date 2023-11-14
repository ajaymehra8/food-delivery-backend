const express = require("express");
const mongoDB = require("../db");
const router = express.Router();


router.post("/foodData",async (req,res)=>{
    try{
        await mongoDB();
res.send([global.food_items,global.food_cat]);
    }
    catch (error){
console.error(error.message);
res.send('Server error');

    }
})

module.exports=router;