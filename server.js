const express = require("express")
const cors = require('cors')
require('dotenv').config();
const app = express()
const mongoURI = process.env.MONGO_URI
const mongoose = require("mongoose");
const PORT = 5000
const userRoutes = require('./routes/userRoutes');
const routeRoutes = require('./routes/routeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const customerRoutes = require('./routes/customerRoutes');
const driverRoutes = require('./routes/driverRoutes');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))


// async function connectTOMongoDB(uri){
//     try{
//         await mongoose.connect(uri);
//         console.log('Connected To DB');
//     }
//     catch(err){
//         console.log(err.message);
//     }
// }

// connectTOMongoDB(mongoURI)
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://root:uIDkxtvbNjLber6v@cluster0.icrzmzw.mongodb.net/watercan"
  )
  .then((con) => console.log("connected to remote database"));

 // uIDkxtvbNjLber6v
app.get("/",(req,res)=>{
    res.send("All is well!")
} );

// Use user routes
app.use('/api', userRoutes);

// Use customer routes
app.use('/api', customerRoutes);
app.use('/api', routeRoutes);
app.use('/api', transactionRoutes);
app.use('/api', driverRoutes);
app.use("/api/admin",require("./routes/adminRoutes"))



app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});