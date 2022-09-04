import db from "../models/index";
let handleUserLogin = (email, password) =>{
return new Promise(async(resolve, reject) =>{
    try{
let isExist 
    }catch(e){
        reject(e);
    }
})
}
let checkUserEmail = (userEmail)=>{
    return new Promise( async(resolve, reject)=>{
        try{
let user = await db.User.find0ne({
    where:{email: userEmail}
})
if(user){
    resolve(true);
}else{
    resolve(false);
}
        }catch(e){
            reject(e);
        }
    })
}