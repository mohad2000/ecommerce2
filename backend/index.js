import express from "express"
import dotenv from "dotenv"
import Connection from "./db/conn.js";
import productsRouter from "./routes/produtRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";
import paymentRouter from "./routes/paymentRoutes.js";
import qs from "qs"

const app = express();

dotenv.config() 

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(cookieParser())
app.set("query parser", (str) => qs.parse(str));

Connection() 


app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payment", paymentRouter)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
    
})

//http://localhost:8000/api/v1/products/create-product