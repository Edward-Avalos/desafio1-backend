import {Router} from 'express';
import {productManager} from '../ProductManager.js';

import bodyParser from "body-parser";
let jsonParser = bodyParser.json();  

const router = Router();


router.get("/api/products/", (req, res)=>{
    let objProduct = new productManager();
    let limit = req.query.limit;
    let arrayProducts = objProduct.getProducts();
    //Si no ingreso numero de limite con tipo de dato entero, no vale el filtro
    if(!limit||isNaN(limit)) return res.send({arrayProducts})
    //Obtener cantidad limitada de registros que esten primero
    let arrayProductsFilter = arrayProducts.lenght == 0 || arrayProducts === undefined ? [] : arrayProducts.slice(0,limit)
    res.send({
        statusCode: 200,
        payload: arrayProductsFilter
    });
})

router.get('/api/products/:pid', (req,res) =>{
    let objProduct = new productManager();
    let idProduct = req.params.pid;
    let product = objProduct.getProductsById(idProduct);
    res.send(product);
})

router.post("/api/products/", jsonParser, (req,res)=>{
    let objProduct = new productManager();
    const params = req.body;
    // console.log(params);
    let respuesta = objProduct.addProduct(params);
    res.send(respuesta);
})

router.put("/api/products/:pid", jsonParser, (req,res)=>{
    let objProduct = new productManager();
    const params = req.body;
    // console.log(params);
    let respuesta = objProduct.updateProduct(params);
    res.send(respuesta);
})

router.delete("/api/products/:pid", (req,res)=>{
    let objProduct = new productManager();
    let idProduct = req.params.pid;
    let respuesta = objProduct.deleteProduct(idProduct);
    res.send(respuesta);
})

export { router }