import { Button, TextField } from '@mui/material'
import { FormInformationType } from '../../UnAuthApp';

const FormInscription = ({ username, setUsername }: FormInformationType) => {
    return (
        <form noValidate autoComplete="off" className='flex flex-row gap-3'>
            <TextField id="outlined-basic" label="Adresse e-mail" variant="outlined" color='error' value={username} onChange={e => setUsername(e.target.value)} />
            <Button variant="contained" color="error" size='large' onClick={() => { }}>Commencez</Button>
        </form>
    );
};

export default FormInscription;