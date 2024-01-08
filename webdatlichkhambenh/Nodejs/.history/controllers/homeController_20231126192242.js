import db from '../src/models/index.js';
import CRUDService from '../services/CRUDService.js';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post');

}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            user: userData
        });

    } else {
        return res.send('ERROR_NAME_NOT_FOUND');
    }



}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });

}


let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserByID(id);
        return res.send('Deleted');
    }
    else {
        return res.send('User not found!');
    }

}
let getpaymentPage = (req, res) => {
    return res.render('test/index.ejs');
}
let getSuccessPage = (req, res) => {
    return res.render('test/success.ejs');
}
let getCancelPage = (req, res) => {
    return res.render('test/cancel.ejs');
}
//  try {
// let data = await db.User.findAll();
// return res.render('test/homepage.ejs', {
//     data: JSON.stringify(data)
// });
//     } catch (e) {
//     console.log(e);
// }
let postCRUD = async (req, res) => {
    try {
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.send('post');
    } catch (e) {
        console.log(e);
    }


}
let displayGetCRUD = async (req, res) => {
    try {
        let data = await CRUDService.getAllUsers();
        return res.render('test/displayCRUD.ejs', {
            dataTable: data,
        });
    } catch (e) {
        console.log(e);
    }

}
let getEditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDService.getUserInfoById(userId);
            return res.render('test/editCRUD.ejs', {
                user: userData
            });

        } else {
            return res.send('ERROR_NAME_NOT_FOUND');
        }
    } catch (e) {
        console.log(e);
    }




}
let putCRUD = async (req, res) => {
    try {
        let data = req.body;
        let allUsers = await CRUDService.updateUserData(data);
        return res.render('/displayCRUD.ejs', {
            dataTable: allUsers
        });

    } catch (e) {
        console.log(e);
    }

}


let deleteCRUD = async (req, res) => {
    try {
        let id = req.query.id;
        if (id) {
            await CRUDService.deleteUserByID(id);
            return res.send('Deleted');
        }
        else {
            return res.send('User not found!');
        }
    } catch (e) {
        console.log(e);
    }


}
export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    getpaymentPage: getpaymentPage,
    getSuccessPage: getSuccessPage,
    getCancelPage: getCancelPage
};
