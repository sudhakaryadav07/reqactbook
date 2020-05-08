import React, { Component } from 'react';
import { Avatar, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar } from '@material-ui/core';
import { Delete, Image, ChevronLeft, ChevronRight } from '@material-ui/icons';

class SkillSlider extends Component {

    handleOnChange = (e, value, item) => {
        this.props.handleSelectSkill(value, item)
    }

    render() {
        let { allCourses, recommendedCourses } = this.props.job;
        return (
            <div style={{ display: 'flex', height: '35vh', marginBottom: 15 }}>
                <List style={{ width: '80%', height: '100%', overflow: 'auto', marginRight: 20, maxWidth: 360 }}>
                    {allCourses.sort((a, b) => { return b.rating - a.rating }).slice(0, 8).map((item, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Image />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item.rating} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => this.props.handleDeleteFromAllCourse(item)}>
                                        <ChevronRight />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
                <List style={{ width: '80%', height: '100%', overflow: 'auto', maxWidth: 360 }}>
                    {recommendedCourses.sort().map((item, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Image />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item.rating} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => this.props.handleDeleteFromRecomendedCourse(item)}>
                                        <ChevronLeft />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </div >
        );
    }
}

export default SkillSlider;