import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jobs, courses } from '../Data';
import { JobSelector, SkillSlider, Course } from './components/index';
import { withStyles } from '@material-ui/core';
import { Stepper, Step, StepLabel, StepContent, Button, Typography, Paper } from '@material-ui/core';

const materialStyles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: 0
    },
    resetContainer: {
        marginBottom: 0
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            skills: [],
            job: null,
            activeStep: 0,
            steps: [
                'Select Job',
                'Rate Skills',
                'Show Courses',
            ]
        }
    }

    UNSAFE_componentWillMount() {
        this.initState();
    }

    initState = () => {
        this.setState({ jobs: jobs });
    }

    handleSetJob = (selectedJob) => {
        let skill = selectedJob.skill.map(item => {
            return { name: item, value: 1 }
        })
        this.setState({ job: { ...selectedJob, skill, recommendedCourses: [], allCourses: [] } });
    }

    handleSelectSkill = (value, data) => {
        let { job } = this.state;
        let skill = job.skill.map((item) => {
            if (item.name === data) {
                return { ...item, value }
            }
            return item;
        });
        this.setState({ job: { ...job, skill } });
    }

    handleRemoveSkill = (deletedskill) => {
        let { job } = this.state;
        let skill = job.skill.filter((item) => item.name !== deletedskill.name)
        this.setState({ job: { ...job, skill } });
    }

    handleDeleteFromAllCourse = (data) => {
        let { job } = this.state;
        let allCourses = job.allCourses.filter((item) => item.name !== data.name);
        this.setState({ job: { ...job, allCourses, recommendedCourses: [...job.recommendedCourses, data] } });
    }

    handleDeleteFromRecomendedCourse = (data) => {
        let { job } = this.state;
        let recommendedCourses = job.recommendedCourses.filter((item) => item.name !== data.name);
        this.setState({ job: { ...job, recommendedCourses, allCourses: [...job.allCourses, data] } });
    }

    handleNext = async () => {
        let { activeStep, job } = this.state;

        let allCourses = [];

        if (activeStep === 1) {
            for (let course of courses) {
                for (let skill of job.skill) {
                    if (course.skills[0] === skill.name) {
                        allCourses.push(course);
                    }
                }
            }
        }

        this.setState({ job: { ...job, allCourses }, activeStep: activeStep + 1 });
    };

    handleBack = () => {
        let { activeStep } = this.state;
        this.setState({ activeStep: activeStep - 1 });
    };

    handleReset = () => {
        this.setState({ activeStep: 0 });
    };

    getStepContent = (step) => {
        let { jobs, job } = this.state;
        switch (step) {
            case 0:
                return <JobSelector
                    jobs={jobs}
                    handleSetJob={this.handleSetJob}
                />;
            case 1:
                return <SkillSlider
                    job={job}
                    handleSelectSkill={this.handleSelectSkill}
                    handleRemoveSkill={this.handleRemoveSkill}
                />;
            case 2:
                return <Course
                    job={job}
                    handleDeleteFromAllCourse={this.handleDeleteFromAllCourse}
                    handleDeleteFromRecomendedCourse={this.handleDeleteFromRecomendedCourse} />;
            default:
                return 'No Further step';
        }
    }



    render() {
        let { activeStep, steps } = this.state;
        let { classes } = this.props;
        return (
            <div >
                <Stepper activeStep={activeStep} orientation="vertical" style={{ padding: '2% 25% 2% 25%' }}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <div>{this.getStepContent(index)}</div>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>Back </Button>
                                        <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button} >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <span >All steps Finished</span>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ CourseReducer }) => {
    const cStore = CourseReducer;
    return { cStore };
}

export default connect(mapStateToProps, {})(withStyles(materialStyles)(App));
