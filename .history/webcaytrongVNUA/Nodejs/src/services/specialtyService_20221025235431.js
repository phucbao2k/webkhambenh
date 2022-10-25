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
                            attributes: ['doc']
                        })
                    }
                }
                // if(data){
                //     let doctorSpecialty = await db.Doctor_Infor.findAll({
                //         where: {
                //             specialtyId: inputId,
                //             provinceId: location
                //         },
                //         attributes: ['doctorId', 'provinceId'],
                //     })
                // }
               
                data.doctorSpecialty = doctorSpecialty;
                
            } 
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
            

        }catch(e){

        }
    })
}
module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty
}