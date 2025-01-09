import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status';
import { filterDataOrderByStatus } from "../../service/orderService.js";


const filterDataOrderByStatuss = catchAsync(async (req, res) => {
    const dataResponse = await filterDataOrderByStatus(req.query)
    return res.status(status.OK).json(dataResponse)
})
export default filterDataOrderByStatuss