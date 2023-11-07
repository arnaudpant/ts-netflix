import { Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";


const FormConexion = () => {
    const create = false
    const label = create ? 'Inscrivez vous' : 'Connexion'
    const [checked, setChecked] = useState(false)

    return (
        <form className='flex flex-col min-w-[330px] m-1' noValidate autoComplete="off">
            <TextField
                id="filled-basic"
                label="Email ou numéro de téléphone"
                variant="filled"
                color="secondary"
                style={{ opacity: '1' }}
            />
            <TextField
                id="filled-basic"
                type="password"
                label="Mot de passe"
                variant="filled"
            />
            {create ? (
                <>
                    <Button
                        style={{ margin: '20px 0 5px 0' }}
                        variant="contained"
                        color="secondary"
                    >
                        {label}
                    </Button>
                    <small>* Consultez nos CGV</small>
                    <small>This page is protected by Google reCAPTCHA</small>
                </>
            ) : (
                <>
                    <Button
                        style={{ margin: '20px 0 5px 0' }}
                        variant="contained"
                        color="secondary"
                    >
                        {label}
                    </Button>
                    <div>
                        {' '}
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedA"
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                        color="primary"
                                    />
                                }
                                label={
                                    <Typography component={'span'} style={{ fontSize: '0.8rem' }}>
                                        Se souvenir de moi
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </div>
                </>
            )}
        </form>
    );
};

export default FormConexion;