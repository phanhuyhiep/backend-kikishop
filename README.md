# backend shop ban hang truc tuyen

**document**
https://nodejs.org/docs/latest/api/

```
Requirement:
   ✨ Node == v23.2.0
   ✨ npm == 10.9.0
```

# 1. Cách chạy:

## Build backend

Cài đặt dependencies cho dự án:

```
npm install
```

Tạo file .env có nội dung được ví dụ trong file env-example
Cuối cùng dùng lệnh dưới để chạy dự án

```
npm start
```

# 2. Bảng biến môi trường:

Là các thông số đầu vào cần thiết để chạy dự án:

### 3.1 Các biến môi trường để cấu hình app khi chạy:

| Tên biến môi trường | Giá trị    | Mô tả                               |
| ------------------- | ---------- | ----------------------------------- |
| PORT                | 80081      | Port mà server sẽ lắng nghe         |
| SECRET_KEY          | SECRET_KEY | jwt secret key                      |

### 3.2 Các biến collection trong mongodb

| Tên biến môi trường   | Giá trị                       | Mô tả                                     |
| --------------------- | ------- ----------------------| ----------------------------------------- |
| MONGO_URI             | mongodb://localhost:27017/    | url kết nối mongodb                       |

**document**
https://www.mongodb.com/docs/


### 3.3 Các biến collection của api vnpay

| Tên biến môi trường                  | Giá trị  | Mô tả                                     |
| ------------------------------------ | -------- | ----------------------------------------- |
| VNPAY_SECRET                         | \_\_\_\_ | VNPAY_SECRET                              |
| VNPAY_TMN_CODE                       | \_\_\_\_ | VNPAY_TMN_CODE                            |
| VNPAY_URL                            | \_\_\_\_ | VNPAY_URL                                 |

**document**
https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html

### 3.4 các biến môi trường để kết nối đến nodemailer

| Tên biến môi trường                  | Giá trị  | Mô tả                                     |
| ------------------------------------ | -------- | ----------------------------------------- |
| EMAIL_APP_PASSWORD                   | \_\_\_\_ | password lấy ở bảo mật 3 lớp của email    |
| EMAIL_APP                            | \_\_\_\_ | email                                     |

**document**
https://nodemailer.com/


# Format code

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
