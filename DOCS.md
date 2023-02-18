# Tài liệu lưu hành nội bộ
## Đôi lời dự án base-nestjs

Vui lòng đọc file README.MD trước file này.

## Kiến trúc
1. Tư tưởng kiến trúc dự án là bao gồm các base module được sử dụng chung trên nhiều loại dự án
2. Việc bật tắt các module sử dụng qua file .env hoặc biến môi trường khi chạy
3. Không modify các base module 1 cách tùy tiện, có thể override lên dựa theo kiến trúc. Sau đó cân nhắc sửa đổi base module 1 cách đồng bộ.
4. File .env.example luôn luôn đồng bộ với các config, phải duy trì và đảm bảo, kèm theo đó file .env.dev và file .env.prod phải cấu hình đúng để CI/CD chạy ổn định 
5. Các database như mongodb, redis sẽ dùng hàng free của cloud để test.
    - mongodb cloud: https://www.mongodb.com/cloud/atlas/register2
    - redis cloud: https://app.redislabs.com/#/login
    
## Giới thiệu các module
### Auth
Thực hiện việc đăng ký, đăng nhập, đăng xuất

.env liên quan
```
# CONFIG USER VERIFY DEFAULT
ENABLE_USER_VERIFY=true
USER_VERIFY_URL_CALLBACK=https://izisoft.io
```
- Cờ ENABLE_USER_VERIFY `true` thì các user đăng kí xong sẽ có trạng thái mặc định là `verified: false`, và trong service auth sẽ tự động gọi hàm gửi mã xác thực hoặc email xác thực tới email đăng ký hoặc phone đăng ký. Nhớ đảm bảo muốn dùng tính năng này thì sử dụng fỏm login email hoặc phone.
- Ngược lại user đăng ký xong sẽ không cần verify
- Cờ USER_VERIFY_URL_CALLBACK là đường dẫn callback sau khi user xác thực thành công = email link

### Mail
Thực hiện việc gửi email, bật tắt các cặp giá trị .env tương ứng để sử dụng

.env liên quan:
####Nếu muốn sử dụng sendgrid cấu hình .env như sau
```
# CONFIG MAIL_SERVER: sendgrid|gmail
MAIL_SERVER=sendgrid
MAILER_FROM_NAME=BaoHQ
MAILER_FROM_EMAIL=quangbao1994@gmail.com
# CONFIG SENDGRID
MAILER_SENDGRID_API_KEY=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
```

####Nếu muốn sử dụng gmail cấu hình .env như sau
```
# CONFIG MAIL_SERVER: sendgrid|gmail
MAIL_SERVER=gmail
MAILER_FROM_NAME=BaoHQ
MAILER_FROM_EMAIL=quangbao1994@gmail.com
# CONFIG GMAIL
MAILER_GMAIL_USERNAME=izisoftwwaremail@gmail.com
MAILER_GMAIL_PASSWORD=vkfjdzmyfdoyqycf
```

### Storage
Lưu trữ file, có 2 loại lưu trữ:
- Local disk tức là lưu tại folder mount trong docker, hoặc folder trên vps
- S3 của aws

.env liên quan:
####Nếu muốn sử dụng s3 cấu hình .env như sau
```
# CONFIG STORAGE local|s3
STORAGE_SERVER=s3
# CONFIG S3
S3_ACCESS_KEY_ID=AKIA2Q6U4BY53P266AWA
S3_ACCESS_KEY_SECRET=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
S3_REGION=ap-southeast-1
S3_BUCKET_NAME_PATH=izisoft/test-base
```
Lưu ý trên acocunt s3 phải config Bucket policy:
```
{
    "Version": "2012-10-17",
    "Id": "Policy1644231058549",
    "Statement": [
        {
            "Sid": "Stmt1644231053397",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::izisoft/*"
        }
    ]
}
```
####Nếu muốn sử dụng local disk cấu hình .env như sau
```
# CONFIG STORAGE local|s3
STORAGE_SERVER=local
```

### Upload
Upload file lên storage đã được config trước đó:
- Upload sẽ chỉ lưu tên `tmp` folder, có lập lịch xóa sau 1h nếu không được sử dụng
- Sau khi upload cần gọi service function `confirmFileWasUsed` để lưu file vào `upload` folder, nơi tệp tin được lưu trữ dài hạn
- Hàm `confirmFileWasUsed` sẽ tự động resize file ảnh ra nhiều size phục vụ vấn đề responsive

.env liên quan:
####Cấu hình upload .env bao gồm như sau
```
# CONFIG UPLOAD_CONFIG
UPLOAD_MAX_SIZE=25
UPLOAD_MAX_FILE=5
UPLOAD_FILE_EXT=jpg|jpeg|png|gif|txt|pdf|doc|docx|xls|xlsx|ppt|pptx|csv
UPLOAD_IMAGE_QUALITY_COMPRESS=75
```
`UPLOAD_MAX_SIZE` là dung lượng tối đa của 1 file
`UPLOAD_MAX_FILE` là số file uploads tối đa trong 1 request

### User
Cho phép đăng ký user dưới các cặp giá trị sau:
- email || username || deviceID || phone
- password: bắt buộc
.env liên quan:
#### Nếu cấu hình `ENABLE_USER_VERIFY` là true thì cần chọn cách user module gửi mã OTP
```
# CONFIG OTP_CHANNEL: mail|phone
OTP_CHANNEL=mail
```

### Websocket
Sử dụng socket.io để cấu hình websocket
Yêu cầu bắt buộc cấu hình `REDIS_URL` trước để sử dụng websocket, tránh tình trạng lỗi duplicate, lag, không đồng bộ

.env liên quan:
```
# CONFIG ENABLE WEBSOCKET
ENABLE_WEBSOCKET=true
```

### FCM
Sử dụng Firebase Cloud Message để bắn thông báo tới device

Cần thay đổi lại file `src/lazy-module/fcm/firebase-project-service.json` cho từng dự án

Trong user service có 2 hàm `pushFCMToTopic` và `pushFCMToUser` để đẩy thông báo đến user, gọi thông báo sẽ đẩy đến tất cả device token của user đang có

### Global instance 
Là static module để cache data 1 cách tối ưu về tốc độ.
