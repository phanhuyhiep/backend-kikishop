import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { deleteVorchers } from '../../service/Service.js';

const deleteVorcher = catchAsync(async (req, res) => {
    const remove = await deleteVorchers(req)
    return res.status(status.OK).json(remove)
})
export default deleteVorcher