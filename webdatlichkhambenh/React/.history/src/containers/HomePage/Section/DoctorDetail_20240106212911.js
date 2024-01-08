import React, { Component } from 'react';

class DoctorDetail extends Component {
    render() {
        const selectedDoctor = this.props.location?.state?.selectedDoctor;

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        {/* Thêm các thông tin khác của bác sĩ nếu cần */}
                    </>
                )}
            </div>
        );
    }
}

export default DoctorDetail;
