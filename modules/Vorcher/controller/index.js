import createVorcher from './api/createVorcher.js';
import getAllVorcher from './api/getAllVorcher.js';
import deleteVorcher from './api/deleteVorcher.js';
import updateVorcher from './api/updateVorcher.js';
import searchVouchers from './api/searchVoucher.js';

const vorcherController = {
    createVorcher,
    getAllVorcher,
    deleteVorcher,
    updateVorcher,
    searchVouchers
}
export default vorcherController