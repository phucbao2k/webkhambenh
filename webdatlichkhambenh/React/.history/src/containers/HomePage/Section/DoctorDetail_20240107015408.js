// DoctorDetail.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        <h3>Thông tin chuyên khoa</h3>
                        <p>Tên chuyên khoa: {selectedDoctor.specialtyData.name}</p>
                        <h3>Thông tin cơ bản</h3>
                        {selectedDoctor.doctors.map((doctor, index) => (
                            <div key={index}>
                                <p>Địa chỉ cơ sở Y tế: {doctor.addressClinic}</p>
                                <p>Tên cơ sở Y tế: {doctor.nameClinic}</p>
                            </div>
                        ))}
                        <h3>Thông tin giá</h3>
                        {selectedDoctor.doctors.map((doctor, index) => (
                            <p key={index}>Loại giá (VND): {doctor.priceTypeData.valueVi}</p>
                        ))}
                        <h3>Thông tin vị trí</h3>
                        {selectedDoctor.doctors.map((doctor, index) => (
                            <p key={index}>Tỉnh/Thành phố: {doctor.provinceTypeData.valueVi}</p>
                        ))}
                    </>
                )}
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
