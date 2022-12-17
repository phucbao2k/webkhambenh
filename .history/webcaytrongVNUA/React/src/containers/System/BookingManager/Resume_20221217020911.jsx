import React, { Component } from 'react';

//import VanillaTilt from 'vanilla-tilt';

import './style.scss';

export class Resume extends Component {
    constructor() {
        super();

        this.state = {
            language: 'en',
            view: 'pdf'
        };

     

        this.switchView = this.switchView.bind(this);
      
    }

    switchView() {
        this.setState({ view: this.state.view === 'pdf' ? 'print' : 'pdf' });
    }

  
    componentDidMount() {
        // VanillaTilt.init(document.querySelector('.page'), {
        //   reverse: false,
        //   max: 10,
        //   perspective: 4000,
        //   scale: 1,
        //   speed: 50,
        //   transition: true,
        //   axis: null,
        //   reset: true,
        //   easing: 'cubic-bezier(.03,.98,.52,.99)',
        //   glare: false,
        //   'max-glare': 0.2,
        //   'glare-prerender': false
        // });
    }

    render() {
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
                    content={content}
                    language={this.state.language}
                    view={this.state.view}
                />
            </React.Fragment>
        );
    }
}

const ResumeDisplay = props => {
    const { language } = props;
    const {
        layout,
        basicInfo,
        skills,
        experience,
        education,
        projects,
        links,
        languages
    } = props.content;

    return (
        <div className={'page ' + props.view}>
            <div className="title">
                <h1>{layout[language].title}</h1>
            </div>
            <div className="content">
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
                <div className="tab project-tab">
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
                </div>

                {/* Skills */}
                <div className="tab skill-tab">
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
                </div>

                {/* Projects */ projects[language] && (
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
                )}

                <div className="tab-row">
                    {/* Languages */}
                    <div className="tab language-tab  no-bottom">
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
                    </div>

                    {/* Profiles */}
                    <div className="tab link-tab no-bottom">
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
                    </div>
                </div>
            </div>
        </div>
    );
};
