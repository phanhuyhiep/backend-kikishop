import getOneproducts from "./Api/getOneproduct.js";
import getAllProducts from "./Api/getAllProduct.js";
import deleteProducts from "./Api/deleteProduct.js";
import addProducts from "./Api/addProduct.js";
import editProduct from "./Api/updateroduct.js";
import searchProducts from "./Api/searchProduct.js";

const productController = {
   getOneproducts,
   getAllProducts,
   deleteProducts,
   addProducts,
   editProduct,
   searchProducts
}
export default productController