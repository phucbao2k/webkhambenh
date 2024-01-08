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

        if (!selectedDoctor) {
            return <p>Không có thông tin bác sĩ được chọn.</p>;
        }

        console.log('Doctors in selectedDoctor:', selectedDoctor.doctors);
        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>

                        <h3>Thông tin cơ bản</h3>
                        {selectedDoctor.doctors.map((doctor, index) => (
                            <div key={index}>
                                <p>Địa chỉ cơ sở Y tế: {doctor.addressClinic}</p>
                                <p>Tên cơ sở Y tế: {doctor.nameClinic}</p>

                                {doctor.priceTypeData && (
                                    <p>Loại giá (VND): {doctor.priceTypeData.valueVi}</p>
                                )}

                                {doctor.provinceTypeData && (
                                    <p>Tỉnh/Thành phố: {doctor.provinceTypeData.valueVi}</p>
                                )}

                                <p>First Name: {doctor.firstName}</p>
                                <p>Last Name: {doctor.lastName}</p>

                                {doctor.specialityData && (
                                    <p>Tên chuyên khoa: {doctor.specialityData.name}</p>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
