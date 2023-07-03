import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../store/actions";
class TableManageHandbook extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            handbooksRedux: [],
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    componentDidMount() {
        this.props.fetchHandbookRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listhandbooks !== this.props.listhandbooks) {
            this.setState({
                handbooksRedux: this.props.listhandbooks,
            })
        }
    }

    handleDeleteHandbook = (handbook) => {
        this.props.deleteHandbookRedux(handbook.id);
    }

    handleEditHandbook = (handbook) => {
        this.props.handleEditHandbookFromParentKey(handbook)
    }

    render() {


        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối
        let arrHandbooks = this.state.handbooksRedux;

        return (
            <React.Fragment>
                <div className="users-container">




                    <div className="users-table mt-3 mx-1">
                        <table id="TableManageUser">
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id="menu.admin.common-diseases" /></th>
                                    
                                    <th><FormattedMessage id="menu.admin.detail" /></th>
                                    <th>Actions</th>
                                </tr>
                                {arrHandbooks && arrHandbooks.length > 0 && arrHandbooks.map((item, index) => {
                                    // để duyệt 1 vòng lặp, ta có thể dùng function map(), bắt buộc phải return ra 1 thứ gì đó
                                    // thì function map() mới hoạt động được
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                           
                                            <td>{item.descriptionMarkdown}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleEditHandbook(item)}><i className="fa-solid fa-pencil"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteHandbook(item)}><i className="fa-solid fa-trash"></i></button>
                                                {/* item là 1 object lưu trữ tất cả thông tin của người dùng */}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listhandbooks: state.admin.handbooks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHandbookRedux: () => dispatch(actions.fetchAllHandbookStart()),
        deleteHandbookRedux: (id) => dispatch(actions.deleteHandbook(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandbook);
