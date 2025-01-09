import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { updateVorchers } from "../../service/Service.js";

const updateVorcher = catchAsync(async (req, res) => {
    const category = await updateVorchers(req)
    return res.status(status.OK).json(category)
})

export default updateVorcher