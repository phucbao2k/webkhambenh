import db from "../models/index";
let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.avatar
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })

            } else {
                await db.Handbook.create({
                    name: data.name,
                    image: data.avatar,
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
let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({

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
let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing paramenter'
                })
            }
            else {
                let data = await db.Handbook.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: [
                        'descriptionHTML', 'descriptionMarkdown'
                    ]

                })
               
                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }



        } catch (e) {
            reject(e);

        }
    })
}
let showAllHandbooks = (handbookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbooks = '';
            if (handbookId === 'ALL') {
                handbooks = await db.Handbook.findAll({
                })
            }
            if (handbookId && handbookId !== 'ALL') {
                handbooks = await db.Handbook.findOne({
                    where: { id: handbookId },
                    include: [
                        {
                            model: db.Handbook,
                            attributes: ['descriptionMarkdown', 'descriptionHTML']
                        },
                    ],
                })
            }
            resolve(handbooks)
            //resolve để thoát ra khỏi Promise 
        } catch (e) {
            reject(e);
        }
    })
}
let deleteHandbook = (handbookId) => {
    return new Promise(async (resolve, reject) => {
        let foundHandbook = await db.Speciality.findOne({
            where: { id: handbookId }
        })
        if (!foundHandbook) {
            resolve({
                errCode: 2,
                errMessage: `The handbook isn't exist`
            })
        }
        await db.Speciality.destroy({
            where: { id: handbookId }
        })
        resolve({
            errCode: 0,
            message: `The handbook is deleted`
        })
    })
}
let updateHandbookData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 200,
                    errMessage: 'Missing required parameters'
                })
            }
            let specialty = await db.Speciality.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.address = data.address;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                specialty.descriptionHTML = data.descriptionHTML;
                if (data.avatar) {
                    specialty.image = data.avatar;
                }
                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update the specialty succeeds!'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Handbook's not found!`
                });
            }
        } catch (e) {
            reject(e);

        }
    })
}
module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    showAllHan: showAllHan,
    deleteHandbook: deleteHandbook,
    updateHandbookData: updateHandbookData

}