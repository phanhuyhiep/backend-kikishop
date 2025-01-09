import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import Auth from "../../Model/Auth.js";
import { register } from "../../service/Auth.js";

const registers = catchAsync(async(req,res)=> {
    const {email, password, phoneNumber} = req.body
    if (!password && (!email||phoneNumber)) {
        return res.status(status.BAD_REQUEST).json('Nhập đầy đủ thông tin');
      }
    const checkUser = await Auth.findOne({$or: [{phoneNumber}, {email}]})
    if(checkUser){
        return res.status(status.BAD_REQUEST).json('Người dùng đã tồn tại')
    }
    const users = await register(req.body)
    return res.status(status.OK).json(users)
})
export default registers
