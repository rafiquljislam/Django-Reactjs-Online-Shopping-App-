import { Grid } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Headline from '../product/Headline'
import { domain } from '../../env'
import SingleCategory from './SingleCategory'



const AllCategory = () => {
    const [categorydata, setCategorydata] = useState(null);
    useEffect(() => {
        const getallcategory = async () => {
            Axios({
                url: `${domain}/api/categorys/`,
                method: 'GET'
            }).then(response => {
                setCategorydata(response.data)
            }).catch(error => {
                console.log(error);
            })
        }
        getallcategory()
    }, [])

    return (
        <Grid spacing={3} container>
            <Headline title="All" subtitle='Categorys' />
            {
                categorydata?.map((item, i) => (
                    <Grid xs={6} sm={3} md={2} lg={2} key={i} item>
                        <SingleCategory item={item} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default AllCategory
