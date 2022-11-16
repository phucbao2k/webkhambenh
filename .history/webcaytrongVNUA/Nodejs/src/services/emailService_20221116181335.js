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
        <div><b>Lý do của khách hàng đưa ra: ${dataSend.reasons}</b></div>
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
        <div><b>Reasons from customer: ${dataSend.reasons}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
         <div>Thank you</div>
         `

    }
    return result;
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Thông tin đặt lịch khám bệnh/ hóa đơn đã được gửi trong file đính kèm</p>
       <div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản</div>
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>Information to book a medical appointment/Invoice has been sent in attachment</p>
        <div>You can manage your tree's medical schedule through the account management section</div>
         <div>Thank you!</div>
         `

    }
    return result;
}
let getBodyHTMLEmailCancelRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3> Xin chào ${dataSend.patientName} !</h3 >
        <p>Bạn nhận được thư này vì đã đặt lịch khám bệnh online trên web khamchuabenhchocayvnua</p>
     <p>Rất tiếc nhưng bác sĩ/phòng khám hiện tại của chúng tôi không thể xử lý </p>
       <div>Bạn có thể quản lý lịch khám bệnh cho cây của mình qua mục quản lý tài khoản</div>
         <div>Xin chân thành cảm ơn!</div>

         `

    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3> Hello ${dataSend.patientName} !</h3 >
        <p>You received this message because you booked an online medical appointment on web khamchuabenhchocayvnua</p>
     <p>Information to book a medical appointment/Invoice has been sent in attachment</p>
        <div>You can manage your tree's medical schedule through the account management section</div>
         <div>Thank you!</div>
         `

    }
    return result;
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject)=> {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            })
resolve(true)
        }catch(e){
            reject(e)

        }
    })
}
let sendCancelAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from: '"Team Tạ Bảo Phúc" <baophucta2k@gmail.com>',
                to: dataSend.email,
                subject: "Dear",
                html: getBodyHTMLEmailCancelRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            })
            resolve(true)
        } catch (e) {
            reject(e)

        }
    })
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
    sendCancelAttachment: sendCancelAttachment
}

