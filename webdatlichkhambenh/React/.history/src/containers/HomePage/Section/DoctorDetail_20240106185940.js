import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: null,
        };
    }

    componentDidMount() {
        this.fetchDoctorDetails();  // Gọi phương thức fetchDoctorDetails khi component được tạo ra.
    }

    async componentDidUpdate(prevProps) {
        const { match } = this.props;

        // Kiểm tra xem match có tồn tại và có thay đổi hay không
        if (match && match.params.id !== prevProps.match?.params.id) {
            console.log('New doctor ID:', match.params.id);
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
    handleViewDoctorDetail = async (doctorId) => {
        const { history } = this.props;

        if (history) {
            try {
                // Gọi API hoặc thực hiện các xử lý cần thiết để lấy thông tin chi tiết của bác sĩ dựa trên doctorId
                const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', {
                    doctorId: doctorId,
                });

                // Kiểm tra xem kết quả có dữ liệu hay không
                if (response && response.data) {
                    // Sử dụng history.push để điều hướng đến trang mới với đường dẫn tương ứng và truyền thông tin chi tiết của bác sĩ
                    history.push('/detail-doctor', { doctorDetails: response.data });
                } else {
                    console.log('No details found for doctorId:', doctorId);
                }
            } catch (error) {
                console.error('Error fetching doctor details:', error);
            }
        }
    }
    render() {
    const { doctorDetails } = this.state;

    return (
        <div>
            {doctorDetails && (
                <>
                    <h2>Thông tin chi tiết bác sĩ</h2>
                    <p>Chức danh: {doctorDetails.valueVi}</p>
                    <p>Position: {doctorDetails.valueEn}</p>
                    <p>ID: {doctorDetails.doctorIds.join(', ')}</p>
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
    return {

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
