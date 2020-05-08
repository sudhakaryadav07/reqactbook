import React, { Component } from 'react';
import { Button, Slider } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
    root: {
      color: '#3880ff',
      height: 2,
      padding: '15px 0',
    },
    thumb: {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      marginTop: -14,
      marginLeft: -14,
      '&:focus, &:hover, &$active': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 11px)',
      top: -22,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    mark: {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      marginTop: -3,
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  })(Slider);

  
class SkillSlider extends Component {

    handleOnChange = (e, value, item) => {
        this.props.handleSelectSkill(value, item)
    }

    render() {
        let { skill } = this.props.job;
        return (
            <div>
                {skill.map((item, i) => {
                    return (
                        <div key={i} style={{ display: 'flex',paddingTop:15, paddingBottom: 15, width: 'auto' }}>
                            <span style={{ margin: 0, marginRight: 20 }}>{item.name}</span>
                            <IOSSlider
                                key={i}
                                defaultValue={1}
                                onChange={(e, value) => this.handleOnChange(e, value, item.name)}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                min={1}
                                max={10}
                                valueLabelDisplay="on"
                            />
                            <Delete onClick={() => this.props.handleRemoveSkill(item)} style={{ color: 'red',cursor:'pointer', marginLeft: 15 }}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default SkillSlider;