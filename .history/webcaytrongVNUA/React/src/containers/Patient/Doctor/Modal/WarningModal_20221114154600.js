import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal } from 'reactstrap';

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class WarningModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
show: false,
setShow: false
        }

    }
  handleClose = ()=> {
this.setState({
    set
})
  }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        return (
            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);




