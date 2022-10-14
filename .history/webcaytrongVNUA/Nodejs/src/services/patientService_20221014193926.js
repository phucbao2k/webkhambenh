import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';
let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
try{
    if (!data.email || !data.doctorId || !data.timeType || !data.specialtyName  || !data.fullName
    ){
    resolve({
        errCode: 1,
        errMessage: 'Missing required fields'
    })
}else{
    await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data,
        doctorName:"Phúc",
        diagnosis: "Cây lúa - Bệnh đạo ôn",
        redirectLink: 'https://www.facebook.com/ta.phucbao'
    })
    let user = await db.User.findOrCreate({
        where: {email: data.email},
        defaults:{
            email: data.email,
            roleId: 'R3'
        },
    });
    
    console.log('check customer: ', user[0])
    if(user && user[0]){
        await db.Booking.create({        
                statusId: 'S1',
                doctorId: data.doctorId,
                patientId: user[0].id,
                specialtyName: data.specialtyName,
                plantName: data.plantName,
                timeType: data.timeType,
                image: data.image

        })
    }
    resolve({
        errCode: 0,
        errMessage: 'Save infor patient succeed!'
    })
}
}catch(e){
reject(e);
}
    })
}
module.exports ={
    postBookAppointment: postBookAppointment
}