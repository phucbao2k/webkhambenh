import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './DoctorDetail.scss';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: null, // Thiết lập giá trị mặc định cho doctorId
        };
    }

    componentDidUpdate() {
        console.log('Props in DoctorDetail:', this.props);

        const selectedDoctor = this.props?.location?.state?.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);

        // Kiểm tra xem doctorId đã được thiết lập chưa
      
    }


    handleViewDetailDoctor = () => {
       
    };
    render() {
        const selectedDoctor =
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);

        if (!selectedDoctor) {
            return <p>Không có thông tin bác sĩ được chọn.</p>;
        }

        console.log('Doctors in selectedDoctor:', selectedDoctor.doctors);

        return (
            <div className="doctor-detail-container">
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>

                        <h3>Thông tin cơ bản</h3>
                        {selectedDoctor.doctors.map((doctor, index) => (
                            <div key={index} className="doctor-info">
                                {doctor && (
                                    <>
                                        <p>Họ và Tên: {doctor.firstName} {doctor.lastName}</p>
                                    </>
                                )}
                                <p>Chức danh: {selectedDoctor.valueVi}</p>
                                <p>Position: {selectedDoctor.valueEn}</p>
                                <p>id: {doctor.doctors.doctorId}</p>
                                <div className="clinic-info">
                                    <p>Địa chỉ cơ sở Y tế: {doctor.doctors.addressClinic}</p>
                                    <p>Tên cơ sở Y tế: {doctor.doctors.nameClinic}</p>
                                </div>

                                {/* Kiểm tra xem priceTypeData có tồn tại không */}
                                {doctor.priceTypeData && (
                                    <div className="price-info">
                                        <p>Loại giá (VND): {doctor.priceTypeData.valueVi}</p>
                                    </div>
                                )}

                                {/* Kiểm tra xem provinceTypeData có tồn tại không */}
                                {doctor.provinceTypeData && (
                                    <div className="province-info">
                                        <p>Tỉnh/Thành phố: {doctor.provinceTypeData.valueVi}</p>
                                    </div>
                                )}

                                {/* Kiểm tra xem User có tồn tại không trước khi truy cập */}

                                {/* Kiểm tra xem specialityData có tồn tại không */}
                                {doctor.specialityData && (
                                    <div className="speciality-info">
                                        <p>Tên chuyên khoa: {doctor.specialityData.name}</p>
                                    </div>
                                )}

                                {/* Nút "View Doctor" cho mỗi bác sĩ */}
                                <div className="button-container">
                                    <Link to={`/detail-doctor/${doctor.doctors.doctorId}`}>
                                        <Button color="primary">
                                            <FormattedMessage id="patient.booking-modal.viewdoctor" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
