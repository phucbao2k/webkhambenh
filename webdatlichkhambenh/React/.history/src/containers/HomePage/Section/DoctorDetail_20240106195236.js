import React, { Component } from 'react';

class DetailDoctor extends Component {
    render() {
        const { location } = this.props;


        const { selectedDoctor } = location.state;

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        <p>Danh sách bác sĩ:</p>
                        <ul>
                            {selectedDoctor.doctors.map((doctor) => (
                                <li key={doctor.id}>
                                    {doctor.valueVi} - {doctor.valueEn}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }
}

export default DetailDoctor;
