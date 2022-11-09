import db from '../models/index';
require('dotenv').config();
let getAllBookingForAdmin = ( date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if ( !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                if(date === 'ALL'){

                }
              
            }

        } catch (e) {
            reject(e);
        }
    })
}
let deleteBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        let foundBooking = await db.Booking.findOne({
            where: { id: bookingId }
        })
        if (!foundBooking) {
            resolve({
                errCode: 2,
                errMessage: `The booking isn't exist`
            })
        }
        await db.Booking.destroy({
            where: { id: bookingId }
        })
        resolve({
            errCode: 0,
            message: `The booking is deleted`
        })
    })
}
module.exports = {
    getAllBookingForAdmin: getAllBookingForAdmin,
    deleteBooking: deleteBooking
}