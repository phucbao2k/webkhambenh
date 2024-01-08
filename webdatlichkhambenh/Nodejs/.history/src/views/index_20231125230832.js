import {express} from 'express';
import {paypal} from 'paypal-rest-sdk';
import fs from 'fs';
import exphdbs from 'express-handlebars';
import path from 'path';
let app_payment = express();
app_payment.set('views', path.join(__dirname, 'views'));
app_payment.engine('handlebars',exphdbs({defaultLayout:'main'}));
app_payment.set('view engine', 'handlebars');

app_payment.get('/', function(req, res){
res.render('index.handlebars');
})
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AXQsQrZpknOZlFrjSpEOgoDi7Ab81ji97cC0d6oIihV44eQkc-Ke0s1hRCqhAlk9PDjmPfw5LUalJt0B',
    'client_secret': 'ENo_RjBRdFZ4xbFKoZjqDlztCKGiXCGvPz6Zd1QSbK6h5DMrJtUJrqf3Ro43dQGkAqpvmjCDWaSOijoi'
});


var items = JSON.parse(fs.readFileSync('items.json'));
var total = 0;
for (i = 0; i < items.length; i++) {
    total += parseFloat(items[i].price) * items[i].quantity;
}

app_payment.get('/thanhtoan', function (req, res) {
    res.render('index');
});

app_payment.post('/pay', function (req, res) {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:7070/success",
            "cancel_url": "http://localhost:7070/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
            },
            "description": "Pay online now!"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

});
app_payment.get('/cancle', function (req, res) {
    res.render('cancle');
});
app_payment.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.render('cancle');
        } else {
            console.log(JSON.stringify(payment));
            res.render('success');
        }
    });
});

app_payment.get('/cancel', (req, res) => res.send('Cancelled'));

app_payment.listen(7070, function () {
    console.log(total);
});

