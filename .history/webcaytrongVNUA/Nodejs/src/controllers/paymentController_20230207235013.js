import paymentService from '../services/paymentService.js';
let postPayment = async (req, res) => {
    let message = await paymentService.postNewUser(req.body);
    console.log(message);
    return res.send('post');

}
export default {
    postPayment: postPayment
}