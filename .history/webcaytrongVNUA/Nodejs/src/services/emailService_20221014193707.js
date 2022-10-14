require('dotenv').config();
import nodemailer from 'nodemailer';
let sendSimpleEmail = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from:'"Phúc vnua" <baophucta2k@gmail.com>',
        to: dataSend.receiverEmail,
        subject: "Thông tin đặt lịch khám bệnh cho cây",
        html: getBodyHTMLEmail(dataSend),
        // `<h3>Xin chào ${dataSend.patientName}!</h3>
        // <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
        // <p>Thông tin đặt lịch khám bệnh:</p>
        // <div><b>Thời gian: ${dataSend.time}</b></div>
        // <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        // <div><b>Chuẩn đoán bệnh sơ bộ ban đầu: ${dataSend.diagnosis}</b></div>
        // <p>Nếu các thông tin trên là đúng sư thật, vui lòng click vào đường link bên dưới
        // để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        // <div>
        // <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        // </div>
        // <div>Xin chân thành cảm ơn</div>`,


    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result =
        `
        <h3> Xin chào ${ dataSend.patientName } !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Chuẩn đoán bệnh sơ bộ ban đầu: ${dataSend.diagnosis}</b></div>
        <p>Nếu các thông tin trên là đúng sư thật, vui lòng click vào đường link bên dưới
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
         <div>Xin chân thành cảm ơn</div>
         `
        
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>Information to book a medical appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <div><b>Preliminary diagnosis of disease: ${dataSend.diagnosis}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
         <div>Thank you</div>
         `

    }
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail
}

