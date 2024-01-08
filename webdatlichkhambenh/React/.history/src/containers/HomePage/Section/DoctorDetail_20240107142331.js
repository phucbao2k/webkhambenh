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

    handleViewDetailDoctor = () => {
        const { selectedDoctor } = this.state;
        const { history } = this.props;

        if (history && selectedDoctor && selectedDoctor.doctors && selectedDoctor.doctors.doctorId) {
            history.push(`/detail-doctor/${selectedDoctor.doctors.doctorId}`);
        }
    };

    render() {
        const { selectedDoctor } = this.state;

        if (!selectedDoctor) {
            return <p>Không có thông tin bác sĩ được chọn.</p>;
        }

        return (
            <div className="doctor-detail-container">
                <>
                    <h2>Thông tin chi tiết bác sĩ</h2>
                    <p>Chức danh: {selectedDoctor.valueVi}</p>
                    <p>Position: {selectedDoctor.valueEn}</p>

                    <h3>Thông tin cơ bản</h3>
                    <div className="doctor-info">
                        {selectedDoctor.doctors && (
                            <>
                                <p>Họ và Tên: {selectedDoctor.doctors.firstName} {selectedDoctor.doctors.lastName}</p>
                                <p>Chức danh: {selectedDoctor.valueVi}</p>
                                <p>Position: {selectedDoctor.valueEn}</p>
                                <div className="clinic-info">
                                    <p>Địa chỉ cơ sở Y tế: {selectedDoctor.doctors.addressClinic}</p>
                                    <p>Tên cơ sở Y tế: {selectedDoctor.doctors.nameClinic}</p>
                                </div>

                                {selectedDoctor.doctors.priceTypeData && (
                                    <div className="price-info">
                                        <p>Loại giá (VND): {selectedDoctor.doctors.priceTypeData.valueVi}</p>
                                    </div>
                                )}

                                {selectedDoctor.doctors.provinceTypeData && (
                                    <div className="province-info">
                                        <p>Tỉnh/Thành phố: {selectedDoctor.doctors.provinceTypeData.valueVi}</p>
                                    </div>
                                )}

                                {selectedDoctor.doctors.specialityData && (
                                    <div className="speciality-info">
                                        <p>Tên chuyên khoa: {selectedDoctor.doctors.specialityData.name}</p>
                                    </div>
                                )}

                                <div className="button-container">
                                    <Button
                                        color="primary"
                                        onClick={() => this.handleViewDetailDoctor(selectedDoctor.doctors.doctorId)}
                                    >
                                        <FormattedMessage id="patient.booking-modal.viewdoctor" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
