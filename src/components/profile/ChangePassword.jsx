import { Button, Grid, TextField } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react'
import { domain, header } from '../../env'

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const changePasswordnow = async () => {
        if (password === conPassword) {
            await Axios({
                url: `${domain}/api/changepassword/`,
                method: 'POST',
                headers: header,
                data: {
                    'password': password
                }
            }).then(response => {
                console.log(response.data);
                if (response.data['error'] === false) {
                    alert("Password is Updated !")
                    setPassword('')
                    setConPassword('')
                } else {
                    alert("Something is Wrong, Try Again!");
                }
            })
        } else {
            alert("Password Not Match !")
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={12} lg={12} sm={12} xs={12} >
                <TextField type="password" style={{ width: '100%' }} onChange={(e) => setPassword(e.target.value)} value={password} label="New Password" variant="outlined" />
            </Grid>
            <Grid item md={12} lg={12} sm={12} xs={12} >
                <TextField type="password" style={{ width: '100%' }} onChange={(e) => setConPassword(e.target.value)} value={conPassword} label="Confirm Password" variant="outlined" />
            </Grid>
            <Grid style={{ textAlign: 'center' }} item md={6} lg={12} sm={12} xs={12} >
                <Button onClick={changePasswordnow} size='large' variant='contained' >Update</Button>
            </Grid>
        </Grid>
    )
}

export default ChangePassword
