import './App.css';
import { Route , Routes } from 'react-router-dom';
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
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/coin/:id' element={<CoinPage />}/>
        </Routes>
    </ThemeProvider>
    </Div>
  );
}

export default App;
