import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import { connect } from 'react-redux';
import { getProfileDoctorById } from '../../../services/userService';
class VNPayPaymentButton extends Component {
    apiUrl = 'http://localhost:7070';
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

    handlePayment = () => {
        try {
            const { extraInfor } = this.state;

            const amountVi = extraInfor.priceTypeData?.valueVi;

            // Kiểm tra nếu amount không phải là một số hợp lệ
            if (!this.isValidNumber(amountVi)) {
                console.error('Invalid amount value:', amountVi);
                return;
            }

            const amount = Number(amountVi);

            console.log('Amount:', amount);

            // Tạo URL redirect dựa trên `/order/create_payment_url` và thêm query parameter
            const redirectUrl = `/order/create_payment_url?amount=${amount}&bankCode=&orderDescription=Payment+for+online+appointment+booking&orderType=billpayment&language=vn`;

            console.log('Redirect URL:', redirectUrl);

            // Chuyển hướng đến URL được tạo
            window.location.href = redirectUrl;
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
