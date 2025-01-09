import { updateOrder } from '../../service/orderService.js';
import catchAsync from './../../../../utils/catchAsync.js';
import status from 'http-status';
import Pusher from 'pusher';

const updateOders = catchAsync(async (req, res) => {
    await updateOrder(req)

    const pusher = new Pusher({
        appId: "1724672",
        key: "e42502c24124b723c7c8",
        secret: "732f98b8ad7132ee6f27",
        cluster: "ap1",
        useTLS: true
    });

    pusher.trigger("my-channel", "my-event", {
        message: req.body.orderId
    });
    return res.status(status.OK).json(`Đã chuyển đổi trạng thái thành ${req.body.orderStatus}`)
})
export default updateOders

