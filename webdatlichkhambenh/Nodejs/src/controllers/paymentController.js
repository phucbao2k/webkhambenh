
let postPayment = async (req, res) => {
    return res.render('paypal.ejs');
}
export default {
    postPayment: postPayment
}