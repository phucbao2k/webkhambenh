import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';
let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
try{
    if (!data.email || !data.doctorId || !data.timeType || !data.specialtyName
    ){
    resolve({
        errCode: 1,
        errMessage: 'Missing required fields'
    })
}else{
    await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: 'Tên bệnh nhân...',
        time: '9:00 - 10:00 '
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