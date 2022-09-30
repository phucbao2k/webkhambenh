import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },

                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e);
        }
    })
}
let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if (doctorMarkdown) {
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.updateAt = new Date();
                        await doctorMarkdown.save();
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Success!'
                })
            }
        } catch (e) {
            console.log(e);
        }
    })
}
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentMarkdown', 'contentHTML']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
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
let bulkCreateSchedule = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try{

if(!data.arrSchedule || !data.doctorId || !data.formatedDate){
    resolve({
        errCode: 1,
        errMessage: 'Missing required fields'
    })
}else{
let schedule = data.arrSchedule;
if(schedule && schedule.length >0){
    schedule = schedule.map(item => {
        item.maxNumber = MAX_NUMBER_SCHEDULE;
        return item;
    })
}
let existing = await db.Schedule.findAll({
    where: {doctorId: data.doctorId, date: data.formatedDate},
    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
    raw: true
});
if(existing && existing.length > 0){
    existing = existing.map(item =>{
        item.date = new Date(item.date).getTime();
        return item;
    })
}
let toCreate = _.differenceWith(schedule, existing,(a,b)=>{
    return a.timeType === b.timeType && a.date === b.date;
});
if(toCreate && toCreate.length >0){
    await db.Schedule.bulkCreate(toCreate);
}
resolve({
    errCode: 0,
    errMessage:'ok bro'
})
}
        }catch(e){
console.log(e);
reject(e);
        }
    })
}
let getScheduleByDate = (doctorId, date)=>{
    return new Promise(async(resolve, reject)=>{
        try{
if(!doctorId || !date){
    resolve({
        errCode: 1,
        errMessage: 'Missing required parameters'
    })
}else{
    let dataSchedule = await db.Schedule.findAll({
        where:{
            doctorId: doctor
        }
    })
}
        }catch(e){

        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule
}