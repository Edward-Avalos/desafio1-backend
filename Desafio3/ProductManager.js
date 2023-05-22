import fs from 'fs';
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = 0;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

export class productManager {
    constructor() {
        this.arrayProductos = [];
        this.path = "./products.json"
    }

    addProduct(objProduct) {
        /*Obtenemos contenido del archivo json*/
        if(fs.existsSync(this.path)){
            try {
                this.arrayProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (err) {
                console.log("No hay informacion en el archivo: ", err)
            }   
        }else{
            console.log("No existe el archivo json");
        }
        /*Validacion de atributos y si code existe*/
        let existeCode = false;
        existeCode = this.arrayProductos.some((p) => p.code == objProduct.code);
        if (!objProduct.title || !objProduct.description || !objProduct.price || !objProduct.thumbnail || !objProduct.code || !objProduct.stock) {
            console.log("All filds are required");
        }
        else if (existeCode) {
            console.log("Code already exists");
        }
        else {
            /*Agregando nuevo producto*/
            objProduct.id = this.arrayProductos.length + 1;
            this.arrayProductos.push(objProduct);
            fs.writeFile(this.path, JSON.stringify(this.arrayProductos), "utf-8", (err) => {
                if (err) {
                    console.log("Error al agregar", err);
                } else {
                    console.log("Se agrego producto correctamente")
                }
            })
        }
    }
    getProducts() {
        if(fs.existsSync(this.path)){
            try {
                return JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (err) {
                console.log("No hay informacion en el archivo: ", err)
            }   
        }else{
            console.log("No existe el archivo json");
        }
    }
    getProductsById(id) {
        if(fs.existsSync(this.path)){
            try {
                let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
                let objProductFilter = products.find((p) => p.id == id);
                if (objProductFilter === undefined) {
                    console.log("Not found");
                }
                else {
                    return objProductFilter;
                }
            } catch (err) {
                console.log("No hay informacion en el archivo: ", err)
            }   
        }else{
            console.log("No existe el archivo json");
        }
    }
    updateProduct(objProduct){
        /*Obtenemos contenido del archivo json*/
        if(fs.existsSync(this.path)){
            try {
                this.arrayProductos = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (err) {
                console.log("No hay informacion en el archivo: ", err)
            }   
        }else{
            console.log("No existe el archivo json");
        }
        /*Validar si existe producto y obtener indice del producto en el array */
        let existeCode = false;
        existeCode = this.arrayProductos.some((p) => p.code == objProduct.code);
        if (!objProduct.title || !objProduct.description || !objProduct.price || !objProduct.thumbnail || !objProduct.code || !objProduct.stock) {
            console.log("All filds are required");
        }
        else if (existeCode) {
            let indexObj = this.arrayProductos.findIndex((p) => p.code == objProduct.code);
            this.arrayProductos[indexObj].title = objProduct.title;
            this.arrayProductos[indexObj].description = objProduct.description;
            this.arrayProductos[indexObj].price = objProduct.price;
            this.arrayProductos[indexObj].thumbnail = objProduct.thumbnail;
            this.arrayProductos[indexObj].stock = objProduct.stock;

            /*Actualizar archivo json con el producto actualizado*/
            fs.writeFileSync(this.path, JSON.stringify(this.arrayProductos), "utf-8");

            console.log("Se actualizo correctamente el producto con el code: ", objProduct.code);
        }else{
            console.log("No existe el producto con el code: ", objProduct.code);
        }
    } 

    deleteProduct(id){
        return fs.readFile(this.path, "utf-8", (err, data) => {
            if (err) {
                console.log("Error al leer productos: ", err);
            } else {
                this.arrayProductos = JSON.parse(data);
                console.log(this.arrayProductos);
                let existProduct = this.arrayProductos.some((p) => p.id == id);
                console.log(existProduct);
                if (!existProduct) {
                    console.log("Not found");
                }
                else {
                    let indexObj = this.arrayProductos.findIndex((p) => p.id === id);
                    console.log(indexObj);
                    this.arrayProductos.splice(indexObj,1);
                    console.log(this.arrayProductos);
                    /*Escribir array en archivo json*/
                    fs.writeFileSync(this.path, JSON.stringify(this.arrayProductos), "utf-8");
                    console.log("Se elimino correctamente el producto con el id: ", id);
                }
            }
        })
    }
}

// let objProduct = new productManager();
// objProduct.addProduct(new Product("tomate", "tomate silvestre", 5, "img", Math.random(), 50));


// let arrayNuevosObjProductos = [
//     new Product("queso", "", 5, "imgQueso", Math.random(), 34),
//     new Product("fresa", "fresa grande", 5, "imgFresa", Math.random(), 45),
//     new Product("granada", "granada roja", 5, "imgGranada", Math.random(), 12)
// ]
// arrayNuevosObjProductos.forEach(obj => {
//     objProduct.addProduct(obj);
// });

// console.log("Lista de productos");
// console.log(objProduct.getProducts());
// let arrayProductos = [];
// arrayProductos = objProduct.getProducts();
// console.log("Filtra producto existen");
// console.log(objProduct.getProductsById(arrayProductos[2].code));
// console.log("ingresar producto con codigo duplicado")
// objProduct.addProduct(new Product("Naranja", "naranja sin pepa", 10, "imgNaranja", arrayProductos[2].code, 40));
// console.log("Filtra producto inexistente");
// console.log(objProduct.getProductsById(4));

// let arrayNuevosObjProductos = [
//     new Product("licuadora", "licua todo", 5, "imgQueo", Math.random(), 3)
// ]
// arrayNuevosObjProductos.forEach(obj => {
//     objProduct.addProduct(obj);
// });

// objProduct.updateProduct(new Product("sdsdfsdfsd", "gamer", 5, "imgPlay", 0.3610957287386707, 5000));
// objProduct.getProductsById(2);
// objProduct.getProductsById();
// objProduct.getProductsById(1);