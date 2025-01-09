import crypto from "crypto";
import configs from "../../../config/configVnpay.js";
var secretKey = configs.vnPay.secret;

export const checkPaymentStatus = async (vnpayResponse) => {
    let vnp_Params = vnpayResponse;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    if (vnp_Params['vnp_ResponseCode'] === '00') {
        const amount = vnp_Params['vnp_Amount'];
        const txnRef = vnp_Params['vnp_TxnRef'];
        const payDate = vnp_Params['vnp_PayDate'];
        const bankCode = vnp_Params['vnp_BankCode'];
        const bankTranNo = vnp_Params['vnp_BankTranNo'];
        const cartType = vnp_Params['vnp_CardType'];
        const transactionNo = vnp_Params['vnp_TransactionNo'];

        let isSuccess = false, message = 'Payment failed';

        if (vnp_Params['vnp_ResponseCode'] === '00') {
            isSuccess = true;
            message = 'Payment success';
        }

        return {
            isSuccess: true,
            message: 'Payment success'
        };
    } else {
        return {
            isSuccess: false,
            message: 'Invalid secure hash',
        };
    }
};

export const sortObject = (obj) => {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
};
