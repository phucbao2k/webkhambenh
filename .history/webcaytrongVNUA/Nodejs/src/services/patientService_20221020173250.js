import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';
import {v4 as uuidv4} from 'uuid';

let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
try{
    if (!data.email || !data.doctorId || !data.timeType || !data.specialtyName  || !data.fullName
        || !data.date
    ){
    resolve({
        errCode: 1,
        errMessage: 'Missing required fields'
    })
}else{
    await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        patientName: data.fullName,
        time: data.timeString,
        doctorName:data.doctorName,
        diagnosis:data.diagnosis,
        language: data.language,
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
                image: data.image,
                date: data.date,
                token: data.token,

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