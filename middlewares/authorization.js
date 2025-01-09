import Auth from "../modules/Auth/Model/Auth.js";
import status from "http-status";
import jwt from "jsonwebtoken"
const veryfiletoken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            req.user = null;
            return next();
        }

        const accessToken = token.split(" ")[1];
        const decoder = await jwt.verify(accessToken, process.env.SECRET_KEY);
        if (!decoder) {
            req.user = null;
            return next();
        }

        const user = await Auth.findOne({ _id: decoder._id });
        req.user = user;
        next();
    } catch (error) {
        console.error('Lỗi trong quá trình xác thực:', error.message);
        req.user = null;
        next();
    }
};

const checkAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "ADMIN") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
const checkUserStoreAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "USER_STORE") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
const checkUserStoreAndAdminAuthorization = (req, res, next) => {
    veryfiletoken(req, res, () => {
        if (req.user.role == "USER_STORE" || req.user.role == "ADMIN") {
            next()
        } else {
            return res.status(status.UNAUTHORIZED).json('Thất Bại')
        }
    })
}
export { checkAdminAuthorization, checkUserStoreAuthorization, veryfiletoken, checkUserStoreAndAdminAuthorization }