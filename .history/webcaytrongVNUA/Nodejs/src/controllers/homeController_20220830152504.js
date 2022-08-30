import db from '../models/index';

let getHomePage =ásync(req, res) => { 
    try{

    }catch(e){}
    return res.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
};
