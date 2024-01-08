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

                              
                               
                                    <p>Loại giá (VND): {doctor.priceTypeData.valueVi}</p>
                               

                              
                              
                                    <p>Tỉnh/Thành phố: {doctor.provinceTypeData.valueVi}</p>
                             

                               
                              
                                        <p>Họ và Tên: {doctor.User.firstName} {doctor.User.lastName}</p>
                                

                                {doctor.specialityData.name && (
                                    <p>Tên chuyên khoa: {doctor.specialityData.name}</p>
                                )}
                            </div>
                        ))}

                        {/* Thêm các thông tin khác */}
                    </>
                )}
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
