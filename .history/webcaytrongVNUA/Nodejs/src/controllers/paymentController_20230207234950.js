import paymentService from '../services/paymentService.js';
let postPayment = async (req, res) => {
    let message = await paymentService.createNewUser(req.body);
    console.log(message);
    return res.send('post');

}
export default {
    postPayment:
}