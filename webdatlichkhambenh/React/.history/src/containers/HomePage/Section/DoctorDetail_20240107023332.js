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
                       
                        {selectedDoctor.specialityData && (
                            <p>Tên chuyên khoa: {selectedDoctor.specialityData.name}</p>
                        )}
                        <h3>Danh sách bác sĩ</h3>
                        {selectedDoctor.doctors.map((doctor, index) => {
                            const {
                                addressClinic,
                                nameClinic,
                                priceTypeData,
                                provinceTypeData,
                                User,
                                Specialty,
                            } = doctor;

                            const { firstName, lastName } = User;
                            const { name: specialtyName } = Specialty;

                            return (
                                <div key={index}>
                                    <h4>Bác Sĩ #{index + 1}</h4>
                                    <p>Họ và tên: {firstName} {lastName}</p>
                                    <p>Chuyên khoa: {specialtyName}</p>
                                    <p>Địa chỉ cơ sở Y tế: {addressClinic}</p>
                                    <p>Tên cơ sở Y tế: {nameClinic}</p>

                                    {priceTypeData && (
                                        <div>
                                            <h5>Thông tin giá</h5>
                                            <p>Loại giá (VND): {priceTypeData.valueVi}</p>
                                        </div>
                                    )}

                                    {provinceTypeData && (
                                        <div>
                                            <h5>Thông tin vị trí</h5>
                                            <p>Tỉnh/Thành phố: {provinceTypeData.valueVi}</p>
                                        </div>
                                    )}

                                    {/* Thêm các thông tin khác tùy thuộc vào cấu trúc thực tế của đối tượng `doctor` */}
                                   
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        );
    }
}

export default withRouter(DoctorDetail);
