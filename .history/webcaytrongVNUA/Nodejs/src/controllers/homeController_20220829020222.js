

// let getHomePage = (req, res) => {
//     console.log(res)
//     return res.render('homepage.ejs');
// }

let getHomePage =(req, res) => { 
    return res.get('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    // getAboutPage
};
