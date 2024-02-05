const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const Razorpay=require("razorpay");
const crypto=require("crypto");


const id="rzp_test_L1JPeGnZbS2ffv";
const PORT = process.env.PORT

// const CustomerModel = require('./models/Customer')
const CustomerModel  = require('./models/Customer.jsx')
const CartModel= require('./models/Items.jsx');
const CartItems=require('./models/CartItems.jsx')
const History=require('./models/History.jsx');
const Inventory=require('./models/Inventory.jsx')
const TemporaryTable=require('./models/Temporarytable.jsx')
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/Customer");

app.post('/Register', (req, res) => {
    const { email,secretkey,type } = req.body;
   console.log("body",req.body)
    CustomerModel.findOne({ email })
        .then(existingUser=> {
          
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

Inventory.create([
  {
    product_id:'12345',
    Product:'Salt',
    Price:'13',

  },
  {
    product_id:'21345',
    Product:'Gold Winner',
    Price:'135',
    
  },
  {
    product_id:'15432',
    Product:'Sugar',
    Price:'50',
    
  },
  {
    product_id:'54213',
    Product:'Surf excel',
    Price:'400',
    
  },
  {
    product_id:'12345',
    Product:'Salt',
    Price:'23',
    
  }
])




app.post('/histories', async (req, res) => {
  try {
    // Extract data from the request body
    const { Date, Cartno, Name, Phone, Email, OrderId,Amount } = req.body;

    // Create a new History instance
    const newHistory = new History({
      Date,
      Cartno,
      Name,
      Phone,
      Email,
      OrderId,
      Amount,
    });

    // Save the newHistory instance to the database
    await newHistory.save();

    res.status(201).json({ message: 'History added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/deleteCart/:cart_no', async (req, res) => {
  const cartNumber = req.params.cart_no;

  try {
    // Check if the cart exists
    const existingCart = await TemporaryTable.findOne({ cartNumber });

    if (existingCart) {
      // Cart exists, delete the entry
      await TemporaryTable.deleteOne({ cartNumber });
      res.json(`Cart with cartNumber ${cartNumber} deleted successfully`);
    } else {
      // Cart doesn't exist
      res.status(404).json(`Cart with cartNumber ${cartNumber} not found`);
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});
app.get('/items',async (req,res)=>{
  try{
         const {product_id} = req.body;
         console.log(product_id)
         const id={};
         if (product_id) id.product_id=product_id;
         const data=await Inventory.find(id);
         res.json(data);
  }
  catch(error){
        console.log(error);
  }
})

app.post('/addItemsToCart', async (req, res) => {
  const { cart_no, product_id } = req.body;
  const id = {};
  if (product_id) id.product_id = product_id;

  // Check if cartNumber already exists in TemporaryTable
  const existingCart = await TemporaryTable.findOne({ cartNumber: cart_no });

  if (existingCart) {
    // Cart exists, add items to the existing cart
    const data = await Inventory.find(id);
    
    // Update the existing entry by adding new items
    await TemporaryTable.updateOne(
      { cartNumber: cart_no },
      { $push: { items: data } }
    );
  } else {
    const data = await Inventory.find(id);
    await TemporaryTable.create({
      cartNumber: cart_no,
      items: data,
    });
  }

  res.json("Successfully inserted the Item");
});


app.post('/TempItems', async (req, res) => {
  try {
    const { cartNumber } = req.body;

    if (!cartNumber) {
      return res.status(400).json('Cart number is required');
    }

    const temporaryTableData = await TemporaryTable.findOne({ cartNumber:cartNumber });
     console.log("table",temporaryTableData)
    if (temporaryTableData===null) {
      return res.status(404).json("null");
      
    }

    res.json(temporaryTableData);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/filterHistory', async (req, res) => {
  try {
    const { date,cartNo, name, email, orderId, phoneNumber } = req.body;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (date) filter.Date = date;
    if (cartNo) filter.Cartno=cartNo;
    if (name) filter.Name = name;
    if (email) filter.Email = email;
    if (orderId) filter.OrderId = orderId;
    if (phoneNumber) filter.Phone = phoneNumber;

    // Query the History collection with the filter object
    const filteredData = await History.find(filter);

    res.json(filteredData);
  } catch (e) {
    console.error(error);
    res.status(500).send(e);
  }
});



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

app.get('/history',async(req,res)=>{
  
    const history=await History.find()
    .then(items=>res.json(items))
    .catch(err=>res.json(err));
  
})
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




app.post("/validate",async(req,res)=>{
  console.log("validate started")
  const  {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
  const sha = crypto.createHmac("sha256",process.env.Secret);
  console.log("sha",sha)
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest=sha.digest("hex");
  if(digest!==razorpay_signature){
    return res.status(400).json({msg:"Transaction is not legit!"})

  }
  res.json({
    msg:"success",
    orderId:razorpay_order_id,
    paymentId:razorpay_payment_id,
  
  })
})





app.listen(3000,()=>{
    console.log("server is running on port ",3000);
})
