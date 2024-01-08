import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './DoctorDetail.scss';
const DoctorDetail = ({ location }) => {
    const selectedDoctors = location?.state?.selectedDoctor;

    // Kiểm tra xem selectedDoctors có phải là một mảng hay không
    const doctorsArray = Array.isArray(selectedDoctors) ? selectedDoctors : [selectedDoctors];

    return (
        <div className="doctor-detail-container">
            {doctorsArray.map((doctor, index) => (
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
};


export default withRouter(DoctorDetail);
