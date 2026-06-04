import express from "express"
import dotenv from "dotenv"
import Connection from "./db/conn.js";
import productsRouter from "./routes/produtRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";

const app = express();

dotenv.config() 
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

Connection() 


app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/orders", orderRouter);

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
    
})

//http://localhost:8000/api/v1/products/create-product