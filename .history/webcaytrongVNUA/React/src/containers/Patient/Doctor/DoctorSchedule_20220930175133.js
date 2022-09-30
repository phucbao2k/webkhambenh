import React, {Component} from 'react';
import {connect} from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
class DoctorSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            allDays: [],
        }
    }
    async componentDidMount(){
        let {language} = this.props;
        this.setArrDays(language);
    }
    setArrDays = (language) => {
        let allDays =[]
        for (let i =0; i<7; i++){
            let object = {};
            if(language === LANGUAGES.VI){
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }else{
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            object.value
        }
    }
}
