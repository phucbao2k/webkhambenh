import db from "../models/index";
require('dotenv').config();
let postBookAppointment = (data) => {
    return new Promise(async(resolve, reject) =>{
try{
if( !data.email || !data.doctorId || !data.timeType || !data.date){
    resolve({
        errCode: 1,
        errMessage: 'Missing required fields'
    })
}else{
    let user = await db.User.findOrCreate({
        where: {email: data.email},
        defaults:{
            email: data.email,
            roleId: 'R3'
        },
    });
    if(user && user[0]){
        await db.Booking.findOrCreate({
            where: {patientId:}
        })
    }
}
}catch(e){

}
    })
}