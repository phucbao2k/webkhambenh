import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getProfileDoctorById } from '../../../services/userService';
class VNPayPaymentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            extraInfor: {},
        };
    }

    async componentDidMount() {
        this.fetchData();
       
    }

    async componentDidUpdate(prevProps) {
        if (this.props.doctorId !== prevProps.doctorId || this.props.language !== prevProps.language) {
            this.fetchData();
        }
    }

    apiUrl = 'http://localhost:7070';

    fetchData = async () => {
        const { doctorId, language } = this.props;

        if (doctorId) {
            try {
                const [profileRes, extraInforRes] = await Promise.all([
                    getProfileDoctorById(doctorId),
                    getExtraInforDoctorById(doctorId),
                ]);

                if (profileRes && profileRes.errCode === 0 && extraInforRes && extraInforRes.errCode === 0) {
                    this.setState({
                        dataProfile: profileRes.data,
                        extraInfor: extraInforRes.data,
                    });

                    console.log('Profile Data:', profileRes.data);
                    console.log('Extra Information Data:', extraInforRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    handlePayment = async () => {
        try {
            const { language, extraInfor } = this.state;

            const amountVi = extraInfor.priceTypeData?.valueVi;

            // Kiểm tra nếu amount không phải là một số hợp lệ
            if (!this.isValidNumber(amountVi)) {
                console.error('Invalid amount value:', amountVi);
                return;
            }

            const amount = Number(amountVi);

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

            setTimeout(() => {
                window.location.href = data.redirectUrl;
            }, 3000);
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };


    isValidNumber = (value) => {
        return !isNaN(value) && typeof value !== 'object' && !Array.isArray(value);
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

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

export default connect(mapStateToProps, null)(VNPayPaymentButton);
