import express from 'express';
import {router as productRouter} from "./Routers/products.router.js";
const app = express();

//Routers
app.use(productRouter);

app.listen(8082, () => {
    console.log(`Server is running on http`)
})