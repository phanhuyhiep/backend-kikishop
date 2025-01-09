import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { createVorchers } from '../../service/Service.js';
const createVorcher = catchAsync(async (req, res) => {
    const vorcher = await createVorchers(req)
    return res.status(status.OK).json(vorcher)
})
export default createVorcher