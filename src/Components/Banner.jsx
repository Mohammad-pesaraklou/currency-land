import React from 'react';
import styled from '@emotion/styled';
import './Banner.css';
import BannerI from '../Assets/banner21.jpg'
import { Container, Typography } from '@mui/material';

const StyledContainer = styled(Container)`
/* height: 400px; */
display: flex;
flex-direction: column;
padding-top: 50px;
justify-content: space-around;
`
const Img = styled.img`
width: 100%;
height: 400px;
`


const Banner = () => {


    return (
        <div className='banner'>
        <div className='bannerContainer'>
            <div className='tagline'>
                <Typography variant='h2' sx={{fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Montserrat'}}>
                    Crypto Land
                </Typography>
                <Typography variant="subtitle2" sx={{color: 'darkgray', textTransform: 'capitalize',fontFamily: 'Montserrat'}}>
                    Get all the info regarding your favorite crypto currency
                </Typography>
            </div>
        </div>
        </div>
    );
};

export default Banner;