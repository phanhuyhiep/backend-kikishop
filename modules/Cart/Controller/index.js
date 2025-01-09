import deleteCarts from "./Api/deleteCart.js"
import  getAllCarts  from "./Api/getAllCart.js";
import editCart from "./Api/updateCart.js";
import addCarts from "./Api/addCart.js";
const cartController = {
    getAllCarts,
    deleteCarts,
    editCart,
    addCarts
    
}

export default cartController