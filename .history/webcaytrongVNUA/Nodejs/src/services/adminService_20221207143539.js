import db from '../models/index';
require('dotenv').config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getAllBookingForAdmin = ( date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if ( !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        date: date
                    },
                    attributes: {
                        exclude: ['id']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],
                            // include: [
                            //     {
                            //         model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                            //     }
                            // ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        }
                    ],
                    raw: false,
                    nest: true
                })
               
               
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
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
let getAllBookings = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookings = '';
            if (bookingId === 'ALL') {
                bookings = await db.Booking.findAll({
                   
                    attributes: {
                        exclude: ['token']
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address'],
                            // include: [
                            //     {
                            //         model: db.Allcode, as: 'genderData', attributes:['valueEn', 'valueVi']
                            //     }
                            // ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']

                        }
                    ],
                    raw: false,
                    nest: true
                })
            }
            if (bookingId && bookingId !== 'ALL') {
                bookings = await db.Booking.findOne({
                    where: { id: bookingId }
                })
            }
            resolve(bookings)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let adminBulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required fields'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //find data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                });
                // compare data
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                    // a = '5'; b = +a;
                    // => b= 5. 
                    //Đây là cách convert từ string sang số
                });
                //insert data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok bro'
                })
            }
        } catch (e) {
            console.log(e);

            reject(e);
        }
    })
}
module.exports = {
    getAllBookingForAdmin: getAllBookingForAdmin,
    deleteBooking: deleteBooking,
    getAllBookings: getAllBookings,
    adminBulkCreateSchedule: adminBulkCreateSchedule
}