const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const Razorpay=require("razorpay");

const id="rzp_test_L1JPeGnZbS2ffv";
const PORT = process.env.PORT

// const CustomerModel = require('./models/Customer')
const CustomerModel  = require('./models/Customer.jsx')
const CartModel= require('./models/Items.jsx');
const CartItems=require('./models/CartItems.jsx')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/Customer");

app.post('/Register', (req, res) => {
    const { email,secretkey,type } = req.body;
   console.log("body",req.body)
    CustomerModel.findOne({ email })
        .then(existingUser => {
          
          if (existingUser) {
                 
            res.json({ message: 'Record already exists for this email' });
        } 
         else if (type=="admin"){
         
               if ( secretkey!=="suhas"){
              
                res.json({message:"Invalid secret key"})
                console.log("a")}
                else{
                  CustomerModel.create(req.body)
                  .then(newRecord => res.json(newRecord))
                  .catch(err => res.json(err));
                }
                
          
        }
          else {
                {console.log(req.body)}
                CustomerModel.create(req.body)
                    .then(newRecord => res.json(newRecord))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

CartModel.create( [
    {
      cartNumber: 1,
      items: [
        { name: 'Salt', quantity: '1', price: '12' },
        { name: 'Gold Winner', quantity: '1', price: '50' },
        { name: 'Atta', quantity: '1', price: '23' },
      ],
    },
    {
      cartNumber: 2,
      items: [
        { name: 'Gold Winner', quantity: '1', price: '50' },
        { name: 'Gold Winner', quantity: '1', price: '50' },
      ],
    },
  ])
console.log("hello")
  app.post('/sendData', (req, res) => {
    console.log("hello")
    console.log(req)
    const { tagId } = req.body;
  
    const newData = new CartItems({ tagId });
    newData.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data saved to MongoDB');
        res.status(200).send('Data saved successfully');
      }
    });
  });


  app.get('/users', async (req, res) => {
    try {
      const totalUsers = await CustomerModel.countDocuments({});
      res.json({ totalUsers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  app.get('/getItems', (req, res) => {
    console.log("get");
    CartModel.find() // Use find instead of findOne
      .then(items => res.json(items))
      .catch(err => res.json(err));
  });

app.post('/Login',(req,res)=>{
   const {email,password}=req.body;
   CustomerModel.findOne({email:email})
   .then(user=>{
    if(user){
        if(user.password===password){
            res.json(user)
        }
        else{
            res.json("Password is incorrect");
        }
    }
    else{
        res.json("No record Existed")
    }
   })
})

app.post("/order",async(req,res)=>{
    try{
    const razorpay=new Razorpay({
         key_id:process.env.key_id,
         key_secret:process.env.Secret
    });
    const options=req.body;
    const order = await razorpay.orders.create(options);

    if(!order){
        return res.statusCode(500).send("Error");
    }
    res.json(order);
    } 
catch(err){
    console.log(err);
    res.status(500).send("Error");
}}
)



app.listen(3000,()=>{
    console.log("server is running on port ",PORT);
})
