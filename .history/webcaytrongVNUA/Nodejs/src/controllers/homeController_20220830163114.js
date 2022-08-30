import { response } from 'express';
import db from '../models/index';

let getHomePage = (req, res)=>{
    return response.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
};
