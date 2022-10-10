const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());


app.use(express.json());

mongoose.connect("mongodb+srv://NikitaMalik:test123@cluster0.gmrnl7o.mongodb.net/food",{useNewUrlParser:true,});

app.post("/insert", async (req,res)=>{
  const foodName : req.body.foodName;
  const days : req.body.days;
  const food = new FoodModel({foodName:foodName,daysSinceIate:days});
  try {
    await food.save();
  }
  catch (err){
    console.log(err);
  }

});

app.get("/read", async (req, res) => {
    FoodModel.find({}, (err,result)=>{
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});

app.put("/update",async(req, res)=>{

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
        await FoodModel.findById(id, (err, updatedFood)=>{
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update")
        });
    } catch(err){
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('deleted');
});



app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
