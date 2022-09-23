import db from '../models/index';
let getTopDoctorHome =(limitInput)=>{
    return new Promise(async (resolve, reject)=>{
try{
let users = await db.User.findAll({
     limit: limitInput,
    where: {roleId: 'R2'},

attributes:{
    exclude:['password']
},
include:[
    {model: db.Allcode, as:'positionData', attributes:['valueEn', 'valueVi']},
    {model: db.Allcode, as:'genderData', attributes:['valueEn', 'valueVi']}
],
raw: true,
nest: true
})
resolve({
    errCode: 0,
    data: users
})
}catch(e){
  reject(e);
}
    })
}
let getAllDoctors = ()=>{
    return new Promise((resolve, reject)=>{
        try{
let doctors = await db.User.find
        }catch(e){
            reject(e);
        }
    })
}
module.exports ={
    getTopDoctorHome: getTopDoctorHome
}