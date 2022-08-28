

// let getHomePage = (req, res) => {
//     console.log(res)
//     return res.render('homepage.ejs');
// }

let getHomePage =(req, res) => { 
    return res.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('views/test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
};
