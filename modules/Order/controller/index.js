import addOrders from './api/addOrder.js';
import updateOders from './api/updateOrder.js';
import getAllOrder from './api/getAllOrder.js';
import getAllOrderAdmin from './api/getallOrderAdmin.js';
import deleteUser from './api/deleteOrder.js';
import searchOrders from './api/searchOrder.js';
import filterDataOrderByStatuss from './api/filterOrderByStatus.js';

const controllerOrder = {
    addOrders,
    updateOders,
    getAllOrder,
    getAllOrderAdmin,
    deleteUser,
    searchOrders,
    filterDataOrderByStatuss
}
export default controllerOrder