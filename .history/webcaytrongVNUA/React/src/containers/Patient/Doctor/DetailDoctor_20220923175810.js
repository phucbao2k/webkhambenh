import React, { Component } from 'react';
import {connect} from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import {getDetailInforDoctor} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0){
                detailDoctor = res.data;
            }
        }
    }
    componentDidUpdate(prevProps,prevState, snapshot){

    }
    render(){
        console.log('baophuc2k check: ', this.state)
        let {language}= this.props;
        let {detailDoctor}= this.state;
        let nameVi = '', nameEn = '';
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
        return(
            <>
            <HomeHeader
            isShowBanner={false}/>
            <div className="doctor-detail-container">
                <div className="intro-doctor"></div>
            </div>
            </>
        )
    }

}