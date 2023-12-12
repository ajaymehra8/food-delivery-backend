const express=require("express");
const cors=require("cors");
const mongoDB=require("./db")
mongoDB();



const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());

// CORS middleware with preflight request handling
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));



app.get("/",(req,res)=>{
res.send("Hello");
})

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})
