import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './DoctorDetail.scss';
class DoctorDetail extends Component {
    componentDidUpdate() {
        console.log('Props in DoctorDetail:', this.props);

        const selectedDoctor = this.props?.location?.state?.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);
    }

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
      {selectedDoctors &&
        selectedDoctors.map((doctor, index) => (
          <div key={index} className="doctor">
            <h2>Thông tin chi tiết bác sĩ</h2>
            <p>Chức danh: {doctor.valueVi}</p>
            <p>Position: {doctor.valueEn}</p>

            <h3>Thông tin cơ bản</h3>
            <p>Họ và Tên: {doctor.doctors.User.firstName} {doctor.doctors.User.lastName}</p>
            <p>Địa chỉ cơ sở Y tế: {doctor.doctors.addressClinic}</p>
            <p>Tên cơ sở Y tế: {doctor.doctors.nameClinic}</p>

            {doctor.priceTypeData && (
              <p>Loại giá (VND): {doctor.priceTypeData.valueVi}</p>
            )}

            {doctor.provinceTypeData && (
              <p>Tỉnh/Thành phố: {doctor.provinceTypeData.valueVi}</p>
            )}

            {doctor.specialityData && (
              <p>Tên chuyên khoa: {doctor.specialityData.name}</p>
            )}
          </div>
        ))}
    </div>
        );
    }
}

export default withRouter(DoctorDetail);
