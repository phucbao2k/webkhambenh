import React, { Component } from 'react';
import axios from 'axios';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: null,
        };
    }

    componentDidMount() {
        this.fetchDoctorDetails();  // Gọi phương thức fetchDoctorDetails khi component được tạo ra.
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;

        // Kiểm tra xem match có tồn tại và có thay đổi hay không
        if (match && match.params.id !== prevProps.match?.params.id) {
            this.fetchDoctorDetails();  // Gọi lại phương thức fetchDoctorDetails khi match.params.id thay đổi.
        }
    }

    async fetchDoctorDetails() {
        const { match } = this.props;

        try {
            const response = await axios.post('http://localhost:7070/api/get-doctor-details', {
                doctorId: match.params.id,
            });

            this.setState({ doctorDetails: response.data });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    }

    render() {
        const { doctorDetails } = this.state;

        if (!doctorDetails) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h2>Thông tin chi tiết bác sĩ</h2>
                <p>Position ID: {doctorDetails.positionId}</p>
                <p>Doctor IDs: {doctorDetails.doctorIds.join(', ')}</p>
                {/* Thêm các thông tin khác của bác sĩ nếu cần */}
            </div>
        );
    }
}

export default DetailDoctor;
