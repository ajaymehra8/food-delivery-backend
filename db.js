const mongoose=require("mongoose");
require('dotenv').config();

const mongoDB = async () => {
    try {
      await mongoose.connect(process.env.Connection);
      console.log("connected");
  
      const fetchedData = await mongoose.connection.db.collection("foodItems");
      const data = await fetchedData.find({}).toArray();
      const catData = await mongoose.connection.db.collection("foodCategory");
      const food_category = await catData.find({}).toArray()
      .then((categData)=>{
        global.food_items=data;
        global.food_cat=categData;
        console.log(categData);

      })
      .catch((err)=>{
console.log(err);
      })

    } catch (err) {
      console.error(err);
    }
  };


module.exports=mongoDB;

