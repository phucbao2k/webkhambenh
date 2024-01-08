import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './DoctorDetail.scss';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
        };
    }

    componentDidMount() {
        this.setState({
            selectedDoctor: this.props?.location?.state?.selectedDoctor,
        });
    }

    handleViewDetailDoctor = (doctorId) => {
        const { history } = this.props;
        if (history && doctorId) {
            history.push(`/detail-doctor/${doctorId}`);
        }
    };

    render() {
        const { selectedDoctor } = this.state;

        if (!selectedDoctor) {
            return <p>Không có thông tin bác sĩ được chọn.</p>;
        }

        const {
            valueVi,
            valueEn,
            doctors: {
                firstName,
                lastName,
                addressClinic,
                nameClinic,
                priceTypeData,
                provinceTypeData,
                specialityData,
            },
        } = selectedDoctor;

        return (
            <div className="doctor-detail-container">
                <>
                    <h2>Thông tin chi tiết bác sĩ</h2>
                    <p>Chức danh: {valueVi}</p>
                    <p>Position: {valueEn}</p>

                    <h3>Thông tin cơ bản</h3>
                    <div className="doctor-info">
                        <p>Họ và Tên: {firstName} {lastName}</p>
                        <div className="clinic-info">
                            <p>Địa chỉ cơ sở Y tế: {addressClinic}</p>
                            <p>Tên cơ sở Y tế: {nameClinic}</p>
                        </div>

                        {priceTypeData && (
                            <div className="price-info">
                                <p>Loại giá (VND): {priceTypeData.valueVi}</p>
                            </div>
                        )}

                        {provinceTypeData && (
                            <div className="province-info">
                                <p>Tỉnh/Thành phố: {provinceTypeData.valueVi}</p>
                            </div>
                        )}

                        {specialityData && (
                            <div className="speciality-info">
                                <p>Tên chuyên khoa: {specialityData.name}</p>
                            </div>
                        )}

                        <div className="button-container">
                            <Button
                                color="primary"
                                onClick={() => this.handleViewDetailDoctor(selectedDoctor.doctorId)}
                            >
                                <FormattedMessage id="patient.booking-modal.viewdoctor" />
                            </Button>
                        </div>
                    </div>
                </>
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
