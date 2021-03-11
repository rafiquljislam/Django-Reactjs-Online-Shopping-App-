import { Box, Card, CardActionArea, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const SingleBrand = ({ item }) => {
    const history = useHistory();
    const brandProducts = () => {
        history.push(`/brand-${item?.title}-${item?.id}`)
    }
    return (
        <CardActionArea onClick={brandProducts}>
            <Card style={{
                width: '100%',
                height: '100px',
                backgroundColor: '#6275A3',
                backgroundImage: `url(${item?.logo})`,
                backgroundSize: '100% 100%',
                padding: '5px',
                color: 'white',
                position: 'relative'
            }}>
                <Box variant='div'>
                    <Box variant='div' className='bbbbbbbbb' style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        backgroundColor: '#00000082',
                        alignItems: 'center',
                        textAlign: 'center',
                        display: 'grid',
                    }}>
                        <Typography variant='h4'>
                            {item?.title}
                        </Typography>
                    </Box>

                </Box>
            </Card>
        </CardActionArea>
    )
}

export default SingleBrand
