import express from 'express';
import {productManager} from './ProductManager.js';
const app = express();


app.use(express.urlencoded({extended:true}))

app.get('/products', (req,res) =>{
    let objProduct = new productManager();
    let limit = req.query.limit;
    let arrayProducts = objProduct.getProducts();
    //Si no ingreso numero de limite con tipo de dato entero, no vale el filtro
    if(!limit||isNaN(limit)) return res.send({arrayProducts})
    //Obtener cantidad limitada de registros que esten primero
    let arrayProductsFilter = arrayProducts.lenght == 0 || arrayProducts === undefined ? [] : arrayProducts.slice(0,limit)
    res.send({arrayProductsFilter})  
})

app.get('/products/:pid', (req,res) =>{
    let objProduct = new productManager();
    let idProduct = req.params.pid;
    let product = objProduct.getProductsById(idProduct);
    res.send(product);
})

app.get('/',(req,res)=>{
    res.send(`<h1 style="color: blue;">Hola Mundo con express!</h1>`)
})

app.listen(8082, () => {
    console.log(`Server is running on http`)
})