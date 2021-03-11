import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react'
import { useStateValue } from '../../state/stateProvider';
import { domain, header } from '../../env'

const UpdateProfile = () => {
    const [{ profile }, dispatch] = useStateValue();
    const [unsername, setUnsername] = useState(profile?.username);
    const [mobile, setmobile] = useState(profile?.mobile);
    const [name, setname] = useState(profile?.name);
    const [address, setAddress] = useState(profile?.Address);
    const updateProfile = async () => {
        await Axios({
            url: `${domain}/api/updatecustomer/`,
            method: 'POST',
            headers: header,
            data: {
                'name': name,
                'mobile': mobile,
                'Address': address,
                'username': unsername,
            }
        }).then(response => {
            if (response.data['error'] === false) {
                // console.log(response.data);
                dispatch({
                    type: 'PRO',
                    value: response.data
                })
                alert("Your Profile is Updated !");
            } else {
                // console.log(response.data);
                alert("Somthing is Wrong! Try Agane.");
            }
        }).catch(_ => {
            alert("Somthing is Wrong! Try Agane.");
        })
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={6} lg={6} sm={6} xs={12} >
                <TextField style={{ width: '100%' }} onChange={(e) => setUnsername(e.target.value)} value={unsername} label="Username" variant="outlined" />
            </Grid>
            <Grid item md={6} lg={6} sm={6} xs={12} >
                <TextField style={{ width: '100%' }} onChange={(e) => setmobile(e.target.value)} value={mobile} label="Mobile" variant="outlined" />
            </Grid>
            <Grid item md={6} lg={6} sm={6} xs={12} >
                <TextField style={{ width: '100%' }} onChange={(e) => setname(e.target.value)} value={name} label="Name" variant="outlined" />
            </Grid>
            <Grid item md={6} lg={6} sm={6} xs={12} >
                <TextField style={{ width: '100%' }} onChange={(e) => setAddress(e.target.value)} value={address} label="Address" variant="outlined" />
            </Grid>
            <Grid style={{ textAlign: 'center' }} item md={6} lg={12} sm={12} xs={12} >
                <Button onClick={updateProfile} size='large' variant='contained' >Update</Button>
            </Grid>

        </Grid>
    )
}

export default UpdateProfile
