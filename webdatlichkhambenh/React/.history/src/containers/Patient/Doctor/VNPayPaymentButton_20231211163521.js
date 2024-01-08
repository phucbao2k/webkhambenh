// VNPayPaymentButton.js

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class VNPayPaymentButton extends Component {
    handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:7070/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1000, // Đặt số tiền cần thanh toán ở đây
                    bankCode: 'NCB', // Đặt mã ngân hàng (nếu có)
                    orderDescription: 'Payment for something', // Đặt mô tả đơn hàng ở đây
                    orderType: 'billpayment', // Đặt loại đơn hàng ở đây
                    language: 'vn', // Đặt ngôn ngữ ở đây
                }),
            });

            const data = await response.json();
            window.location.href = data.payUrl;
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    render() {
        return (
            <div className="pay-now">
                <button onClick={this.handlePayment}>
                    <FormattedMessage id="patient.extra-infor-doctor.pay" />
                </button>
            </div>
        );
    }
}

export default VNPayPaymentButton;
