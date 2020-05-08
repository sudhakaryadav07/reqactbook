import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const materialStyles = theme => ({
    // inputRoot: {
    //     color: "white",
    //     "& .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "white"
    //     },
    //     "&:hover .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "white"
    //     },
    //     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "white"
    //     }
    // }
});

class JobSelector extends Component {

    handleChange = (event, newValue) => {
        this.props.handleSetJob(newValue);
    }

    render() {
        let { jobs } = this.props;
        return (
            <div>
                {jobs.length > 0 ?
                    <Autocomplete
                        id="combo-box-demo"
                        options={jobs}
                        getOptionLabel={(option) => option.job}
                        onChange={(event, newValue) => this.handleChange(event, newValue)}
                        style={{ width: 'auto'}}
                        renderInput={(params) =>
                            <TextField {...params} label="Job" variant="outlined" onChange={(params) => this.handleChange(params)} />}
                    />
                    : <p>Loading</p>
                }
            </div>
        );
    }
}

export default (withStyles(materialStyles)(JobSelector));