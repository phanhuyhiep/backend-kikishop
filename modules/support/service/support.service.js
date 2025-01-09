import supportModel from "../model/support.model.js"
import nodemailer from 'nodemailer'

export const createSupports = async (req) => {
    const support = await supportModel.create({ ...req.body })
    return support
}

export const getAllSupports = async () => {
    const support = await supportModel.find()
    return support
}

export const updateSupports = async (req) => {
    const id = req.params.id
    const support = await supportModel.updateOne(
        {
            _id: id
        },
        {
            ...req.body
        }
    )
    return support
}

export const deleteSupports = async (req) => {
    const support = await supportModel.findByIdAndDelete(req.params.id)
    return support
}

export const repSupports = async (req) => {
    const { reqbody, id, topic } = req.body
    const data = await supportModel.findById(id)
    const toemail = data.email;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div>
            <p>Chào bạn,</p>
            <p>Cảm ơn bạn đã phản hồi lại cho KiKi Shop. Về vấn đề ${topic}, chúng tôi có phản hồi như sau:</p> 
            ${reqbody ? `<div style="margin-top: 20px; margin-button: 20px;">${reqbody}</div>` : ''}
            <p>Thân mến,</p>
            <p>KiKi Shop.</p>
        </div>
    </div>
`;
    const info = await transporter.sendMail({
        from: '"KiKi Shop👻" <fptkiki@gmail.com>',
        to: toemail,
        subject: "Phản hồi liên hệ của bạn từ Admin KiKi Shop",
        html: emailContent
    });
    return info;

}
export const searchSupport = async (req, res) => {
    const { email } = req.query;
    const searchRegex = new RegExp(email, "i");
    const support = await supportModel.find({ email: searchRegex })
    return support
}