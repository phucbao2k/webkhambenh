// DoctorDetail.js
import React from 'react';

const DoctorDetail = ({ selectedDoctor }) => {
    if (!selectedDoctor) {
        return null;
    }

    return (
        <div>
            <h2>Thông tin bác sĩ</h2>
            <p>Position ID: {selectedDoctor.positionId}</p>
            <p>Doctor IDs: {selectedDoctor.doctorIds.join(', ')}</p>
            {/* Thêm các thông tin khác của bác sĩ nếu cần */}
        </div>
    );
};

export default DoctorDetail;
