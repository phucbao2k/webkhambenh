import React, { Component } from 'react';

//import VanillaTilt from 'vanilla-tilt';

import './style.scss';

export class Resume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            dataModal: {},
            isShowLoading: false,
            previewImgURL: '',
            avatar: '',
            view: 'pdf'
        }

    }


    async componentDidMount() {

        this.getDataPatient()

    }




    getDataPatient = async () => {
        let status = 'S3'
        let { currentDate } = this.state;

        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllBookingForAdminBooking({
            statusId: status,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({

                dataPatient: res.data,
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        },
            async () => {

                await this.getDataPatient()
            })
    }
    //nút bấm xác nhận mở ra modal gửi thông tin khám bệnh
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            plantName: item.plantName,
            reasons: item.reasons,
            avatar: item.image,
            phoneNumber: item.phoneNumber
        }
        this.setState({
           
            dataModal: data,
            avatar: ''
        })

    }

  
    sendSchedule = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendSchedule({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Success');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something went wrong...');
            console.log('error  is:', res)
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleEditUserFromParent = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
            //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
            //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
        }
        this.setState({

            avatar: '',
            previewImgURL: imageBase64,

        })
    }

    switchView() {
        this.setState({ view: this.state.view === 'pdf' ? 'print' : 'pdf' });
    }

  
    // componentDidMount() {
    //     // VanillaTilt.init(document.querySelector('.page'), {
    //     //   reverse: false,
    //     //   max: 10,
    //     //   perspective: 4000,
    //     //   scale: 1,
    //     //   speed: 50,
    //     //   transition: true,
    //     //   axis: null,
    //     //   reset: true,
    //     //   easing: 'cubic-bezier(.03,.98,.52,.99)',
    //     //   glare: false,
    //     //   'max-glare': 0.2,
    //     //   'glare-prerender': false
    //     // });
    // }

    render() {
        let { language } = this.props;
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        return (
            <React.Fragment>
                <div id="buttons">
                   
                    <button
                        onClick={this.switchView}
                        className={
                            'switch-view ' + (this.state.view === 'pdf' ? 'pdf' : 'print')
                        }
                    >
                        Switch View
                    </button>
                    <button onClick={window.print} className="print-page">
                        Print
                    </button>
                </div>
                <ResumeDisplay
                    dataModal={dataModal}
                    language={this.state.language}
                    view={this.state.view}
                />
            </React.Fragment>
        );
    }
}

const ResumeDisplay = props => {
  
    const {
        layout,
        basicInfo,
       dataModal,
        experience,
        da,
        projects,
        links,
        language
    } = props.dataModal;

    return (
        <div className={'page ' + props.view}>
            <div className="title">
                <h1>HÓA ĐƠN VIỆN PHÍ</h1>
            </div>
            <div className="dataModal">
                {/* Personal Information */}
                <div className="profile">
                    <div
                        className="info name"
                        dangerouslySetInnerHTML={{ __html: basicInfo[language].name }}
                    />
                    <div className="info birthday">{basicInfo[language].birthday}</div>
                    <div className="info email">{basicInfo[language].email}</div>
                    {basicInfo[language].website && (
                        <div className="info website">
                            <a href={'http://' + basicInfo[language].website} target="_BLANK">
                                {basicInfo[language].website}
                            </a>
                        </div>
                    )}
                    <div className="info phone">{basicInfo[language].phone}</div>
                    <div className="info location">{basicInfo[language].location}</div>
                    <div className="info avatar">
                        <div className="photo" />
                    </div>
                </div>

                {/* Experience Tab */}
                <div className="experiences">
                    <div className="tab-title">{layout[language].experience}</div>
                    {experience[language].map((exp, index) => {
                        return (
                            <div key={'exp' + index} className="tab experience-tab">
                                <div className="experience">
                                    <div className="info">
                                        <div className="row">
                                            <div className="position">{exp.position}</div>
                                            <div className="company">{exp.company}</div>
                                        </div>
                                        <div className="row">
                                            <div className="location">{exp.location}</div>
                                            <div className="year">{exp.year}</div>
                                        </div>
                                    </div>
                                    <div
                                        className="summary"
                                        dangerouslySetInnerHTML={{ __html: exp.summary }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Education */}
                {/* <div className="tab project-tab">
                    <div className="tab-title">{layout[language].education}</div>
                    <div className="projects">
                        {education[language].map((education, index) => {
                            return (
                                <div key={'edu' + index} className="project">
                                    <div className="project-name">{education.school}</div>
                                    <div
                                        className="project-description"
                                        dangerouslySetInnerHTML={{ __html: education.description }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div> */}

                {/* Skills */}
                {/* <div className="tab skill-tab">
                    <div className="tab-title">{layout[language].skills}</div>
                    <div className="skills">
                        {Object.keys(skills[language]).map(color =>
                            skills[language][color].map((skill, index) => (
                                <div key={'skill' + index} className={'skill ' + color}>
                                    {skill}
                                </div>
                            ))
                        )}
                    </div>
                </div> */}

                {/* { projects[language] && (
                    <div className="tab project-tab">
                        <div className="tab-title">{layout[language].projects}</div>
                        <div className="projects">
                            {projects[language].map((project, index) => {
                                return (
                                    <div key={'proj' + index} className="project">
                                        <a href={project.website} target="_BLANK">
                                            <div className="project-name">{project.name}</div>
                                            <div className="project-website">{project.website}</div>
                                            {project.image && (
                                                <img
                                                    className="project-image"
                                                    alt={project.name}
                                                    src={project.image}
                                                />
                                            )}
                                            <div className="project-description">
                                                {project.description}
                                            </div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )} */}

                <div className="tab-row">
                    {/* Languages */}
                    {/* <div className="tab language-tab  no-bottom">
                        <div className="tab-title small">{layout[language].languages}</div>
                        <div className="languages">
                            {languages[language].map((lang, index) => {
                                return (
                                    <div key={'lang' + index} className="language">
                                        <div
                                            className="language-range"
                                            style={{
                                                clipPath: 'inset(0% ' + (100 - lang.skill) + '% 0% 0%)'
                                            }}
                                        />
                                        <div className="language-name">
                                            <p className="name">{lang.name}</p>
                                            <p className="orig">{lang.orig}</p>
                                            <p className="level">{lang.level}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}

                    {/* Profiles */}
                    {/* <div className="tab link-tab no-bottom">
                        <div className="tab-title small">{layout[language].profiles}</div>
                        <div className="links">
                            {links[language].map((link, index) => {
                                return (
                                    <div key={'link' + index} className="link">
                                        <a href={link.url} target="_BLANK">
                                            <div className={'link-icon ' + link.logo} />
                                            <div className="link-username">{link.username}</div>
                                            <div className="link-name">{link.name}</div>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
