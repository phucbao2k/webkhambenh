import React, { Component} from 'react';
import {connect} from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {
    render(){
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                    <i className="fa-solid fa-bars-staggered"></i>
                    <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}