import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getProfileDoctorById } from '../../../services/userService';

class VNPayPaymentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            amount: null,
        };
    }

    async componentDidMount() {
        this.fetchDoctorProfile();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.fetchDoctorProfile();
        }
    }

    apiUrl = 'http://localhost:7070';

    fetchDoctorProfile = async () => {
        const { doctorId } = this.props;
        if (doctorId) {
            try {
                const res = await getProfileDoctorById(doctorId);
                if (res && res.errCode === 0) {
                    this.setState({ dataProfile: res.data });
                    // Lấy giá trị amount từ API và cập nhật state
                    this.setAmountFromApi(res.data);
                }
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
            }
        }
    };

    setAmountFromApi = (data) => {
        // Thực hiện logic để lấy giá trị amount từ dữ liệu API
        // Ở đây, bạn có thể thực hiện bất kỳ xử lý nào để lấy giá trị amount
        // Dưới đây là một ví dụ, bạn cần điều chỉnh nó phù hợp với dữ liệu API của bạn
        const { language } = this.props;
        const amountVi = data.priceTypeData?.valueVi;
        const amountEn = data.priceTypeData?.valueEn;
        const amount = language === 'vi' ? amountVi : amountEn;

        this.setState({ amount });
    };

    handlePayment = async () => {
        try {
            const { language } = this.props;
            const { amount } = this.state;

            // Kiểm tra nếu amount không phải là một số hợp lệ
            if (isNaN(amount) || typeof amount !== 'number') {
                console.error('Invalid amount value:', amount);
            } else {
                console.log('Amount:', amount);

                const requestBody = {
                    amount: amount,
                    bankCode: 'NCB',
                    orderDescription: 'Payment for online appointment booking',
                    orderType: 'billpayment',
                    language: language,
                };

                console.log('Request Body:', requestBody);

                const response = await fetch(`${this.apiUrl}/order/create_payment_url`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                console.log('Full Response:', response);

                const data = await response.json();

                // Chuyển hướng từ phía client
                window.location.href = data.redirectUrl;
            }
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


export default connect(mapStateToProps, null)(VNPayPaymentButton);
