import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import {getAllCodeService, getAllDetailHandbookById} from '../../../services/userService';
import _ from 'lodash';
import {LANGUAGES} from '../../../utils';
class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            dataDetailHandbook: {}

        }

    }


    async componentDidMount() {
       

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
handleOnChangeSelect = async (event)=> {
    if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id = this.props.match.params.id;

        let res = await getAllDetailHandbookById({
            id: id
        });
        if(res && res.errCode === 0){
            let data = res.data;
            let arrDoctorId = [];
            if(data && !_.isEmpty(res.data)){
                let arr = data.doctorSpecialty;
                if(arr && arr.length > 0){
                    arr.map(item =>{
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            this.setState({
                dataDetailHandbook: res.data,
                arrDoctorId: arrDoctorId
            })
        }
    }
}

    render() {
        let { arrDoctorId, dataDetailHandbook, listProvince } = this.state;
        console.log('chuyen nganh check state', this.state)
        let {language} = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                        &&<div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML}}>
                            </div>
                            }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event)=> this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 && 
                            listProvince.map((item, index)=>{
                                return(
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length>0 &&
                    arrDoctorId.map((item, index)=> {
                        return(
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                        doctorId={item}
                                        isShowDescriptionDoctor={true}
                                        isShowLinkDetail={true}
                                        isShowPrice={false}
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                        doctorIdFromParent={item}
                                        />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <DoctorExtraInfor
                                        doctorIdFromParent={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);




