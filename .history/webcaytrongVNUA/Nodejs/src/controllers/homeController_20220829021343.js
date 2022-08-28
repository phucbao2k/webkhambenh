

// let getHomePage = (req, res) => {
//     console.log(res)
//     return res.render('homepage.ejs');
// }

let getHomePage =(req, res) => { 
    return res.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

exports define([
    'require',
    'dependency'
], function(require, factory) {
    'use strict';
    
}); {
    getHomePage: getHomePage,
    // getAboutPage
};
