
let postPayment = async (req, res) => {
    return res.render('paypal.ejs');
    console.log(message);
    return res.send('post');

}
export default {
    postPayment: postPayment
}