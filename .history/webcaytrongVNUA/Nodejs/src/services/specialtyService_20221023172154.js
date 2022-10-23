const db = require("../models");
let createSpecialty =(data) => {
    return new Promise(async(resolve, reject)=> {
        try{
if(!data.name
    || !data.imageBase64
    || !data.descriptionHTML
    || !data.descriptionMarkdown){
        resolve({
            errCode: 1,
            errMessage: 'Missing parameter'
        })
       
    }else{
        await db.Specialty.create({})
    }
        }catch(e){

        }
    })
}