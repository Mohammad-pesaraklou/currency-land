import React from 'react';
import { AppBar , Toolbar , Container ,Select , MenuItem, Box, Typography} from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import styled from '@emotion/styled';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CryptoContexts } from '../Context/CryptoContext';


const NewType = styled(Typography)`
flex: 1;
color: gold;
font-family: 'Montserrat';
cursor: 'pointer';
text-decoration: none;
`

const NewLink = styled(Link)`
flex: 1;
text-decoration: none;
`

const Header = () => {

    const navigate = useNavigate()
    const {setCurrency} = CryptoContexts();

    return (
      <>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <CurrencyBitcoinIcon sx={{color: 'gold', fontSize: '35px'}}/>
            <NewLink to='/'>
            <NewType variant='h6'>
               Currency Land
            </NewType>
            </NewLink>
            <Select variant='outlined' defaultValue={'USD'} sx={{width: 100,height: 40,marginRight: 5}}
            onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </AppBar>
      </>
    );
};

export default Header;