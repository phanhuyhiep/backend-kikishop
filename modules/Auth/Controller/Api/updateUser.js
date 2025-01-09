import catchAsync from "../../../../utils/catchAsync.js";
import status from "http-status"
import { updateUsers } from "../../service/Auth.js";
import Auth from "../../Model/Auth.js";
const updateUser = catchAsync(async (req, res) => {
    const {email, phoneNumber} = req.body
    if(email){
        const checkEmail = await Auth.findOne({email})
        if(checkEmail == email){
            return res.status(status.BAD_REQUEST).json("Email đã tồn tại") 
        }
    }
    if(phoneNumber){
        const checkPhoneNumber = await Auth.findOne({phoneNumber})
        if(checkPhoneNumber == phoneNumber){
            return res.status(status.BAD_REQUEST).json("PhoneNumber đã tồn tại") 
        }
    }
    const user = await updateUsers(req)
    return res.status(status.OK).json(user)
})

export default updateUser