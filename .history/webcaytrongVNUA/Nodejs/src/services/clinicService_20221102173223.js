import db from "../models/index";
let createClinic = (data) => {
    return new Promise(async(resolve, reject)=> {
        try{
            if(!data.name || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown){
                    resolve({
                        errCode: 1,
                        errMessage: ' Missing parameter '
                    })
                }else{
                    await db.Clinic.create({
                        name: data.name,
                        address: data.address,
                        image: data.imageBase64,
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML
                    })
                    resolve({
                        errCode: 0,
                        errMessage:'ok'
                    })
                }

        }catch(e){
            reject(e);

        }
    })
}
let getAllClinic = () => {
    return new Promise(async(resolve, reject)=> {
        try{
let data = await db.Clinic.findAll({

});
if(data && data.length > 0){
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

        }catch(e){
            reject(e);

        }
    })
}
let getDetailClinicById = (inputId) => {
    return new Promise(async(resolve, reject)=> {
        try{
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else{
                let data = await db.Clinic.findOne({
                    where:{
                        id: inputId
                    },
                    attributes:['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })
                if(data){
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: {clinicId: inputId},
                        attributes: ['doctorId', 'provinceId'],
                    })
                    data.doctorClinic = doctorClinic;
                    
                }else data = {}
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
let getTopClinicHome = (limitInput) => {
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
let showAllClinics = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = '';
            if (clinicId === 'ALL') {
                clinics = await db.Clinic.findAll({
                })
            }
            if (clinicId && clinicId !== 'ALL') {
                clinics = await db.Clinic.findOne({
                    where: { id: clinicId }
                })
            }
            resolve(clinics)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
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
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found!`
                });
            }
        } catch (e) {

        }
    })
}
module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    showAllClinics: showAllClinics
}