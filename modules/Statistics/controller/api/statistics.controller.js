import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { getStatistics } from "../../service/statistics.service.js";


const statisticsProduct = catchAsync(async (req, res) => {
    const products = await getStatistics()
    return res.status(status.OK).json(products)
})
export default statisticsProduct