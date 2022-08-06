import './App.css';
import { Route , Router, Routes, Switch } from 'react-router-dom';
import { Box} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

//components
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import CoinPage from './Components/CoinPage';


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  breakpoints: {
      values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1500,
      xl: 1836,
    },
  }
  
});

const Div = styled.div`
background-color: #14161a;
color: white;
min-height: 100vh;
`


function App() {
  return (
    <Div>
      <ThemeProvider theme={darkTheme}>
    <Header />
      <Switch>
          <Route path='/coin/:id' component={CoinPage}/>
          <Route path='/' component={HomePage}/>
      </Switch>
    </ThemeProvider>
    </Div>
  );
}

export default App;
