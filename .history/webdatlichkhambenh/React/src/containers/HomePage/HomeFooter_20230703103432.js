import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from '../../assets/logovsh.png';

class HomeFooter extends Component {

    render() {

        return (
            <div>
                <div className="section-share home-footer h-auto bg-white w-full">
                    <div className='d-flex justify-content-between main__footer max-1300 mx-auto'>
                        <div className='text-left ft_1'>
                            <div className='logo'>
                                <img className="header-logo" src={logo} onClick={() => this.returnToHome()}></img>
                            </div>
                            <div className='py-2'>
                                <b><FormattedMessage id="home-footer.iab" /></b>
                            </div>
                            <div className='pb-2'>
                                <FormattedMessage id="home-footer.address" />
                            </div>
                            <div className='pb-2'>
                                <FormattedMessage id="home-footer.bussiness" />
                            </div>
                        </div>
                        {/* <div className='text-left ft_2'>
                            <p className='text-primary'>Liên hệ hợp tác</p>
                            <p className='text-primary'>Gói chuyển đổi số doanh nghiệp</p>
                            <p className='text-primary'>Tuyển dụng</p>
                            <p className='text-primary'>Câu hỏi thường gặp</p>
                            <p className='text-primary'>Điều khoản sử dụng</p>
                            <p className='text-primary'>Chính sách Bảo mật</p>
                            <p className='text-primary'>Quy chế hoạt động</p>
                        </div> */}
                        <div className='ft_3'>
                            <div className='text-left'>
                                <p className='mb-1'><b><FormattedMessage id="home-footer.co-operation" /></b></p>
                                <p><FormattedMessage id="home-footer.work-together" /></p>
                            </div>
                            <div className='text-left'>
                                <p className='mb-1'><b><FormattedMessage id="home-footer.catch-trend" /></b></p>
                                <p><FormattedMessage id="home-footer.treatment-trend" /></p>
                            </div>
                            <div className='text-left'>
                                <p className='mb-1'><b><FormattedMessage id="home-footer.customer" /></b></p>
                                <p><FormattedMessage id="home-footer.priority" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='max-1300 mx-auto text-center my-4'>
                    <p className='mb-0 copy'>&copy; 2022 Team Tạ Bảo Phúc-<FormattedMessage id="home-footer.more-info" />
                        <a href="https://www.youtube.com/c/H%E1%BB%8FiD%C3%A2nIT">&#8594;Click here &#8592;
                        </a>
                    </p>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);