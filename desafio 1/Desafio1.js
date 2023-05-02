class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class productManager{
    constructor(){
        this.arrayProductos = [];
    }
    
    addProduct(objProduct){
        let existeCode = false;
        existeCode = this.arrayProductos.some((p) => p.code == objProduct.code);
        while (existeCode) {
            objProduct.code = Math.random();
            existeCode = this.arrayProductos.some((p) => p.code == objProduct.code);
        }
        this.arrayProductos.push(objProduct);
    }
    getProducts(){
        return this.arrayProductos;
    }
    getProductsById (code){
        let objProductFilter = this.arrayProductos.filter((p) => p.code == code);
        if (objProductFilter.length == 0){
            return "Not found";
        }
        else {
            return objProductFilter;
        }
    }
}

let objProduct = new productManager();
objProduct.addProduct(new Product("tomate", "tomate silvestre", 5, "img", Math.random(), 50));


let arrayNuevosObjProductos = [
    new Product("queso", "queso rancio", 5, "imgQueso", Math.random(), 34),
    new Product("fresa", "fresa grande", 5, "imgFresa", Math.random(), 45),
    new Product("granada", "granada roja", 5, "imgGranada", Math.random(), 12)
]
arrayNuevosObjProductos.forEach(obj => {
    objProduct.addProduct(obj);
});

console.log("Lista de productos");
console.log(objProduct.getProducts());
let arrayProductos = [];
arrayProductos = objProduct.getProducts();
console.log("Filtra producto existen");
console.log(objProduct.getProductsById(arrayProductos[2].code));
console.log("Filtra producto inexistente");
console.log(objProduct.getProductsById(1123123));
