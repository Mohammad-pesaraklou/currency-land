import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//context
import { CryptoContexts } from '../Context/CryptoContext';
//api
import { CoinList } from '../Services/api';
//material-ui
import { Container, fontSize } from '@mui/system';
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from '../App';

//styles
import './Banner.css'



const CoinsTable = () => {

    const [coins , setCoins] = useState([]);
    const [loading , setLoading] = useState(false);
    const [search , setSearch] = useState("")
    const [page , setPage] = useState(1)
    const { currency, symbol } = CryptoContexts();
    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
        
    }

    useEffect(() => {
        fetchCoins()
    }, [currency])

    const searchedCoins = () => {
      return coins.filter(item => (
            item.name.toLowerCase().includes(search) || 
            item.symbol.toLowerCase().includes(search) 
        ))
    }


    return (
        <ThemeProvider theme={darkTheme}>
        <Container sx={{textAlign: 'center',minHeight: '100vh'}}>
            <Typography
            variant="h4"
            sx={{margin: "19px", fontFamily: 'Montserrat'}}
            >
                CryptoCurrency Prices By Market Cap                
            </Typography>
            <TextField 
            fullWidth
            variant='outlined'
            label="Search For Crypto Currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
           sx={{ marginBottom: "30px", marginTop: "15px"}}
           />
           <TableContainer>
                {
                    loading ? <LinearProgress sx={{backgroundColor: "gold"}} /> : (
                        <Table>
                            <TableHead sx={{backgroundColor: "#EEBC1D"}}>
                                <TableRow>
                                    {
                                        ["Coin" , "Price" , "24h Change" , "Market Cap"].map(item => (
                                            <TableCell
                                            sx={{color: "black", fontWeight: 700, fontFamily: 'Montserrat'}}
                                            key={item}
                                            align={item === "Coin" ? "" : "right"}
                                            >
                                                {item}
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    searchedCoins().slice((page - 1) * 10, (page - 1) * 10 + 10 ).map(inf => {
                                        let profit = inf.price_change_percentage_24h > 0;

                return(
                    <TableRow
                    className='row'
                    key={inf.id}
                    onClick={() => navigate(`/coin/${inf.id}`)}
                    >
                    <TableCell component="th"
                    scope='row'
                    sx={{
                        display: 'flex',
                        gap: 15
                    }}
                    >
                    <div style={{display: "flex", flexDirection: "column"}}>
                    <img 
                    src={inf.image}
                    alt={inf.name}
                    height= "50"
                    style={{marginBottom: "10px",cursor: "pointer"
                }}
                    />
                        <span style={{
                            textTransform: "capitalize",
                            fontSize: 22
                        }}>
                            {inf.symbol}
                        </span>
                        <span style={{color: "darkgrey"}}>
                        {inf.name}
                        </span>
                    </div>
                    </TableCell>
                    <TableCell align='right'>
                    {symbol} {inf?.current_price.toLocaleString()}
                    </TableCell>
                    <TableCell
                    align='right'
                    sx={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                    }}
                    >
                          {inf?.price_change_percentage_24h?.toFixed(2)}%
                    </TableCell>
                    <TableCell align='right'>
                    {symbol}  {inf?.market_cap.toString().slice(0, -6)}
                    M
                    </TableCell>
                    </TableRow>
                )
            })
        }
    </TableBody>
                        </Table>
                    )
                }
           </TableContainer>
           <Pagination 
           sx={{
            padding: 10,
            width: "100%",
            display: 'flex',
            justifyContent: "center",
            color: "gold"
           }}
           count={(searchedCoins().length/10).toFixed(0)}
           onChange={(_,value) => {
            setPage(value)
            window.scroll(0,450)
           }}
           />
        </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;