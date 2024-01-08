import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: [],
        };
    }

    componentDidMount() {
        this.fetchDoctorDetails();  // Gọi phương thức fetchDoctorDetails khi component được tạo ra.
    }

    async componentDidUpdate(prevProps) {
        const { match } = this.props;

        // Kiểm tra xem match có tồn tại và có thay đổi hay không
        if (match && match.params.id !== prevProps.match?.params.id) {
            console.log('New doctor Position:', match.params.id);
            this.fetchDoctorDetails();  // Gọi lại phương thức fetchDoctorDetails khi match.params.id thay đổi.
        }
    }

    async fetchDoctorDetails() {
        const { match } = this.props;

        try {
            // Sử dụng API cũ /api/get-doctors-by-position
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', {
                searchTerm: match.params.id,
            });

            this.setState({ doctorDetails: response.data });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    }

    render() {
        const { doctorDetails } = this.state;

        return (
            <div>
                {doctorDetails && doctorDetails.length > 0 && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        {doctorDetails.map((doctor) => (
                            <div key={doctor.id}>
                                <p>Chức danh: {doctor.valueVi}</p>
                                <p>Position: {doctor.valueEn}</p>
                                {/* Thêm các thông tin khác của bác sĩ nếu cần */}
                            </div>
                        ))}
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
