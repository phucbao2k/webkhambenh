import paymentService from '../services/paymentService.js';
let postpayment = async (req, res) => {
    let message = await paymentService.createNewUser(req.body);
    console.log(message);
    return res.send('post');

}