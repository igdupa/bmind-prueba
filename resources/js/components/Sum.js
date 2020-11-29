import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function Sum(props) {

    const [summands, setSummands] = useState({
        summandOne: '',
        summandTwo: ''
    });

    const [errors, serErrors] = useState({
        summandOne: false,
        summandTwo: false
    });

    const handleSummandsChange = (event) => {
        setSummands({
            ...summands,
            [event.target.name]: event.target.value
        });
        if (isDecimal(event.target.value)) {
            serErrors({
                ...errors,
                [event.target.name]: false
            });
        } else {
            serErrors({
                ...errors,
                [event.target.name]: true
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errorsHelper = {};
        var error = false;
        for (const property in summands) {
            isDecimal(summands[property]) ? errorsHelper[property] = false : (errorsHelper[property] = true, error = true);
        }
        serErrors(errorsHelper);
        if (!error) {
            props.action(toNumber(summands));
            setSummands({ summandOne: '', summandTwo: '' });
        }
    }

    const toNumber = (objet) => {
        var objectHelper = {};
        for (const property in objet) {
            var strNumber = objet[property];
            var resNumber = strNumber.replace(",", ".");
            objectHelper[property] = Number(resNumber);
        }
        return objectHelper;
    }

    const isDecimal = (decimal) => (
        (decimal != null && decimal.match(/^-?[0-9]\d*([,.]\d+)?$/)) ? true : false
    );

    return (
        <form onSubmit={handleSubmit} id="myform">
                <Grid container spacing={4} direction="column" justify="flex-start" alignItems="center">
                    <Grid item>
                        <TextField
                            id="summandOne"
                            name="summandOne"
                            label="Numero"
                            type="text"
                            variant="outlined"
                            step={0.01}
                            onChange={handleSummandsChange}
                            error={errors.summandOne}
                            helperText={errors.summandOne ? "Introduce un numero." : ""}
                            value={summands.summandOne}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="summandTwo"
                            name="summandTwo"
                            label="Numero"
                            type="text"
                            variant="outlined"
                            step={0.01}
                            onChange={handleSummandsChange}
                            error={errors.summandTwo}
                            helperText={errors.summandTwo ? "Introduce un numero." : ""}
                            value={summands.summandTwo}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" fullWidth={true} startIcon={<AddIcon />} type="submit">Sumar</Button>
                    </Grid>
                </Grid>
        </form>
    );
}

export default Sum;