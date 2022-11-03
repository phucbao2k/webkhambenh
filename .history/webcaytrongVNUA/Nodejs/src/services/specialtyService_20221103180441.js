import db from "../models/index";
let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

            } else {
                await db.Speciality.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Speciality.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })

        } catch (e) {
            reject(e)
        }
    })
}
let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async ( resolve, reject)=> {
        try{
            if(!inputId || !location){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing paramenter'
                })
            }
            else{
                let data = await db.Speciality.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'descriptionHTML','descriptionMarkdown'
                    ]

                })
                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where:{specialtyId: inputId},
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                     else {
                         doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId'],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                }
                else data = {}    
                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })  
            } 
          
            

        }catch(e){
            reject(e);

        }
    })
}
let showAllSpecialties = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = '';
            if (specialtyId === 'ALL') {
                specialties = await db.Clinic.findAll({
                })
            }
            if (specialtyId && specialtyId !== 'ALL') {
                specialties = await db.Clinic.findOne({
                    where: { id: specialtyId },
                    include: [
                        {
                            model: db.Clinic,
                            attributes: ['descriptionMarkdown', 'descriptionHTML']
                        },
                    ],
                })
            }
            resolve(specialties)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let deleteClinic = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let foundClinic = await db.Clinic.findOne({
            where: { id: specialtyId }
        })
        if (!foundClinic) {
            resolve({
                errCode: 2,
                errMessage: `The clinic isn't exist`
            })
        }
        await db.Clinic.destroy({
            where: { id: clinicId }
        })
        resolve({
            errCode: 0,
            message: `The user is deleted`
        })
    })
}
let updateClinicData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 200,
                    errMessage: 'Missing required parameters'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                clinic.descriptionHTML = data.descriptionHTML;
                if (data.avatar) {
                    clinic.image = data.avatar;
                }
                await clinic.save();
                resolve({
                    errCode: 0,
                    message: 'Update the clinic succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Clinic's not found!`
                });
            }
        } catch (e) {
            reject(e);

        }
    })
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}