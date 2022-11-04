import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import { getAllDetailHandbookById} from '../../../services/userService';
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
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailHandbookById({
                id: id
            });
            if (res && res.errCode === 0) {
                let data = res.data;

                if (data && !_.isEmpty(res.data)) {
                    this.setState({
                        dataDetailHandbook: res.data,

                    })
                }

            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let {  dataDetailHandbook } = this.state;
        console.log('handbook check state', this.state)
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




