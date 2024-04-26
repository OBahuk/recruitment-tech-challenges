import React, { useContext, useEffect } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import Controls from '../components/controls/Controls';
import { useForm, Form } from './useForm';
import * as employeeService from '../services/employeeService';
import { MyContext } from '../App/App';

const useStyles = makeStyles((theme) => {
    return {
        container: {
            margin: theme.spacing(5),
            padding: theme.spacing(3),
            marginTop: '225px',
            backgroundColor: theme.palette.background.default,
        },
        newButton: {
            width: '80%',
            margin: '8px'
        },
}});

const initialFValues = {
    departmentId: '',
};

export default function DepartmentFilter() {
    const classes = useStyles();
    const { setFilters } = useContext(MyContext);

    const {
        values,
        errors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues);

    useEffect(() => {
        setFilters(filters => {
            return {
                ...filters,
                ...values
            }
        })
    }, [values])

    return (
        <Paper className={classes.container}>
            <Typography variant="h5" gutterBottom>
                Filter by:
            </Typography>
            <Form>
                <Controls.Select
                    name='departmentId'
                    label='Department'
                    value={values.departmentId}
                    onChange={handleInputChange}
                    options={employeeService.getDepartmentCollection()}
                    error={errors.departmentId}
                />
                <Controls.Button
                    text='Clear'
                    variant='outlined'
                    className={classes.newButton}
                    onClick={resetForm}
                />
            </Form>

        </Paper>
    );
}
