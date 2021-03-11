import { Box, Card, CardActionArea, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ChangePassword from '../components/profile/ChangePassword';
import UpdateProfile from '../components/profile/UpdateProfile';
import { useStateValue } from '../state/stateProvider';

const CustomerProfile = () => {
    const [{ profile }, { }] = useStateValue();
    console.log('profile', profile);
    const [changepass, setChangepass] = useState(false);
    return (
        <Container style={{ marginTop: '80px' }}>
            <Grid container>
                <Grid xs={12} item sm={3} md={3} lg={3} >
                    <Card style={{ padding: '20px' }}>
                        <CardActionArea onClick={() => setChangepass(false)} >
                            <Box style={{ textAlign: 'center', padding: "10px", fontSize: '20px' }}>Update Profile</Box>
                        </CardActionArea>
                        <CardActionArea onClick={() => setChangepass(true)} >
                            <Box style={{ textAlign: 'center', padding: "10px", fontSize: '20px' }}>Change Passoword</Box>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid style={{ padding: "0 20px" }} xs={12} item sm={9} md={9} lg={9} >
                    <Typography variant='h4' style={{ textAlign: 'center' }}>Hello,{profile?.username}</Typography>
                    {
                        changepass ?
                            <ChangePassword /> :
                            <UpdateProfile />
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default CustomerProfile
