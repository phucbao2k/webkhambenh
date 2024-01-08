// import express from 'express';
// import bodyParser from 'body-parser';
// import { configViewEngine } from './src/config/viewEngine.js';
// import { initWebRoutes } from './route/web.js';
// import { sequelize, connectDB } from './src/config/connectDB.js';
// import cors from 'cors';

// require('dotenv').config();
import { format } from 'date-fns';
import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from './src/config/viewEngine.js';
import { initWebRoutes } from './route/web.js';
import { sequelize, connectDB } from './src/config/connectDB.js';
import cors from 'cors';
require('dotenv').config();
let querystring = require('querystring');
// Configure environment variables from .env file
// Create an Express application
let app = express();
let crypto = require('crypto-browserify');
// Use body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.options('*', cors());
// Configure view engine
configViewEngine(app);

// Initialize web routes
initWebRoutes(app);
// app.get('/admin/search', async (req, res) => {
//     try {
//         let { searchTerm } = req.query;

//         let results = await sequelize.query(
//             `SELECT Users.*, Bookings.reasons, Bookings.date, Bookings.birthday, Bookings.statusId
//               FROM Users
//               LEFT JOIN Bookings ON Users.id = Bookings.patientId
//               WHERE Users.id LIKE :searchTerm
//               OR Users.firstName LIKE :searchTerm
//               OR Users.lastName LIKE :searchTerm`,
//             {
//                 replacements: { searchTerm: `%${searchTerm}%` },
//                 type: Sequelize.QueryTypes.SELECT,
//             }
//         );

//         res.json(results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });
import qs from 'qs';
import { createHmac } from 'crypto';
/**
 * Created by CTT VNPAY
 */



import { Router } from 'express';
let router = Router();
let $ = require('jquery');
import request from 'request';
import moment from 'moment';


app.get('/order', function (req, res, next) {
    res.render('orderlist.pug', { title: 'Danh sách đơn hàng' })
});

app.get('/create_payment_url', function (req, res, next) {
    res.render('order.pug', { title: 'Tạo mới đơn hàng', amount: 10000 })
});

app.get('/querydr', function (req, res, next) {

    let desc = 'truy van ket qua thanh toan';
    res.render('querydr.pug', { title: 'Truy vấn kết quả thanh toán' })
});

app.get('/refund', function (req, res, next) {

    let desc = 'Hoan tien GD thanh toan';
    res.render('refund.pug', { title: 'Hoàn tiền giao dịch thanh toán' })
});


app.post('/create_payment_url', async (req, res,next) => {
    try {
        // Process payment logic here
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let tmnCode = 'GXH3U4ZT';
        let secretKey = 'NYYZTXVDGFWGTVBZDZDRSYJIUWWTOZSN';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        let returnUrl = 'http://localhost:7070/order/vnpay_return';

        let date = new Date();
        let createDate = format(date, 'yyyyMMddHHmmss');
        let orderId = format(date, 'HHmmss');
        let amount = '30000';
        let bankCode ='https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=3000000&vnp_BankCode=VIETCOMBANK&vnp_Command=pay&vnp_CreateDate=20231212185255&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A185255&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A7070%2Forder%2Fvnpay_return&vnp_TmnCode=GXH3U4ZT&vnp_TxnRef=185255&vnp_Version=2.1.0&vnp_SecureHash=a17e34243c8c74345ca9e411db72a2d7cd17b23ad1ad6922006610a572b825ec26efa5db1d2685dfbfce808266aba670a18b0c301dfb30dd467393a25df13056';
        let locale = 'vn';
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
       
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.redirect(vnpUrl)
        res.json({ redirectUrl: vnpUrl });
    } catch (error) {
        console.error('Error during payment URL creation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/vnpay_return', function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = "NYYZTXVDGFWGTVBZDZDRSYJIUWWTOZSN";


    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

        res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
    } else {
        res.render('success', { code: '97' })
    }
});

app.get('/vnpay_ipn', function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let secretKey = "NYYZTXVDGFWGTVBZDZDRSYJIUWWTOZSN";
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    let paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (secureHash === signed) { //kiểm tra checksum
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == "0") { //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                    if (rspCode == "00") {
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({ RspCode: '00', Message: 'Success' })
                    }
                    else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({ RspCode: '00', Message: 'Success' })
                    }
                }
                else {
                    res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' })
                }
            }
            else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' })
            }
        }
        else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' })
        }
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' })
    }
});

app.post('/querydr', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();


    let crypto = require("crypto");

    let vnp_TmnCode = "GXH3U4ZT";
    let secretKey = "NYYZTXVDGFWGTVBZDZDRSYJIUWWTOZSN";

    let vnp_Api = config.get('vnp_Api');

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'querydr';
    let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = 'VND';
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // /merchant_webapi/api/transaction
    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        console.log(response);
    });

});

app.post('/refund', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let config = require('config');
    let crypto = require("crypto");

    let vnp_TmnCode = 'GXH3U4ZT';
    let secretKey = 'NYYZTXVDGFWGTVBZDZDRSYJIUWWTOZSN';
    let vnp_Api = config.get('vnp_Api');

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;
    let vnp_Amount = req.body.amount * 100;
    let vnp_TransactionType = req.body.transType;
    let vnp_CreateBy = req.body.user;

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TransactionType': vnp_TransactionType,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_Amount': vnp_Amount,
        'vnp_TransactionNo': vnp_TransactionNo,
        'vnp_CreateBy': vnp_CreateBy,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        console.log(response);
    });

});

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.pug');
});
connectDB()
    .then(() => {
        let port = process.env.PORT || 7070;

        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });