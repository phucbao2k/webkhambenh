import React, { Component } from 'react';

class DoctorDetail extends Component {
    render() {
        const { selectedDoctor } = this.props;

        if (!selectedDoctor) {
            // Trả về hoặc hiển thị thông báo lỗi tùy thuộc vào logic của bạn
            return <p>Không có dữ liệu chi tiết bác sĩ được truyền vào.</p>;
        }

        return (
            <div>
                <h2>Thông tin chi tiết bác sĩ</h2>
                <p>Chức danh: {selectedDoctor.valueVi}</p>
                <p>Position: {selectedDoctor.valueEn}</p>
                {/* Các thông tin khác của bác sĩ nếu cần */}
            </div>
        );
    }
}

export default DoctorDetail;
