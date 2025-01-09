import Auth from "../Model/Auth.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
export const register = async (dataBody) => {
    const { password } = dataBody
    const bcryptPassword = await bcrypt.hash(password, 10)
    const user = await Auth.create({
        ...dataBody,
        password: bcryptPassword
    })
    return user
}

export const signin = async (req) => {
    const user = req
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "5d",
    });
    user.password = undefined
    const auth = { user, accessToken: token }
    return auth
}

export const getAllUsers = async (req) => {
    const users = await Auth.find()
    return users
}

export const getOneUsers = async (req) => {
    const users = await Auth.findById(req.params.id)
    return users
}

export const deleteUsers = async (req) => {
    const remove = await Auth.findByIdAndDelete(req.params.id)
    return remove
}

export const updateUsers = async (req) => {
    const id = req.params.id
    const { password } = req.body
    const bcryptPassword = await bcrypt.hash(password, 10)
    const update = await Auth.updateOne({
        _id: id
    },
        {
            ...req.body,
            password: bcryptPassword
        });
    return update
}

export const sendEmails = async (email) => {
    try {
        // Generate a random password
        const newPassword = Math.random().toString(36).slice(-8);
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await Auth.findOne({ email: email });
        if (user) {
            user.password = hashedPassword;
            await user.save();
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: '"KiKi Shop👻" <fptkiki@gmail.com>',
            to: email,
            subject: "KiKi Password Reset",
            html: `
            <p>Mật khẩu mới của tài khoản ${email} là: <strong>${newPassword}</strong></p>
            <p>Vui lòng giữ thông tin này riêng tư và không chia sẻ với người khác.</p>
            <p>Để bảo mật tài khoản. Hãy đổi mật khẩu ngay sau khi đăng nhập thành công.<p/>
            <p>Trân trọng!<p/>
          `
        });
        return info;
    } catch (error) {
        console.error("Error sending password reset email: ", error);
        throw error;
    }
}
export const searchUser = async (req, res) => {
    const { email } = req.query;
    const searchRegex = new RegExp(email, "i");
    const users = await Auth.find({ email: searchRegex });
    return users
};
export const getUserDetails = async (query) => {
    const user = await authModel.findById(query.userId)
    return user
}
