// DoctorDetail.js
import React from 'react';

const DoctorDetail = ({ selectedDoctor }) => {
    if (!selectedDoctor) {
        return null;
    }

    return (
        <div>
            <h2>Thông tin bác sĩ</h2>
            <p>Chức danh: {selectedDoctor.valueVi}</p>
            <p>Position (En): {selectedDoctor.valueEn}</p>
            {/* Thêm các thông tin khác của bác sĩ nếu cần */}
        </div>
    );
};

export default DoctorDetail;
