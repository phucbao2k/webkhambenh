require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from:'"Phúc lcs" <phuclongchausa912@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh cho cây",
        html: 
        `<h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Chuẩn đoán bệnh sơ bộ ban đầu: ${dataSend.diagnosis}</b></div>
        <p>Nếu các</p>`

    })
}

