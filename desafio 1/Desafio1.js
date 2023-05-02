class productManager{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
    
    addProduct(objProduct, arrayProductos){
        let existeCode = false;
        existeCode = arrayProductos.some((p) => p.code == objProduct.code);
        while (existeCode) {
            objProduct.code = Math.random();
            existeCode = arrayProductos.some((p) => p.code == objProduct.code);
        }
        arrayProductos.push(objProduct);
        return arrayProductos;
    }
    getProducts (arrayProductos){
        return arrayProductos;
    }
    getProductsById (code, arrayProductos){
        let objProductFilter = arrayProductos.filter((p) => p.code == code);
        if (objProductFilter.length == 0){
            return "Not found";
        }
        else {
            return objProductFilter;
        }
    }
}
let arrayProductos = [];
let objProduct = new productManager();
arrayProductos = objProduct.addProduct(new productManager("tomate", "tomate silvestre", 5, "img", Math.random(), 50), arrayProductos);

let arrayNuevosObjProductos = [
    new productManager("queso", "queso rancio", 5, "imgQueso", Math.random(), 34),
    new productManager("fresa", "fresa grande", 5, "imgFresa", Math.random(), 45),
    new productManager("granada", "granada roja", 5, "imgGranada", Math.random(), 12)
]
arrayNuevosObjProductos.forEach(obj => {
    arrayProductos = objProduct.addProduct(obj, arrayProductos);
});


console.log(objProduct.getProducts(arrayProductos));
console.log(objProduct.getProductsById(arrayProductos[2].code, arrayProductos));
console.log(objProduct.getProductsById(1123123, arrayProductos));