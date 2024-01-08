import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    handlePayment = async () => {
        try {
            const { language, extraInfor } = this.props;
            const amount = language === LANGUAGES.VI ? extraInfor.priceTypeData?.valueVi : extraInfor.priceTypeData?.valueEn;

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

                console.log('Redirecting in 300 seconds...');
                setTimeout(() => {
                    window.location.href = data.redirectUrl;
                }, 300000);
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

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

export default connect(mapStateToProps, null)(VNPayPaymentButton);
