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
if(data && data.len)
        }catch(e){

        }
    })
}
module.exports = {
    createClinic: createClinic
}