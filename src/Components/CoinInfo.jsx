import React,{ useEffect , useState } from 'react';
import axios from 'axios';
import { ThemeProvider} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { chartDays } from '../Services/data';
import SelectButton from './SelectButton';
// Theme
import {darkTheme} from '../App'
// api
import { HistoricalChart } from '../Services/api';
//context
import { CryptoContexts } from '../Context/CryptoContext';
import { CircularProgress } from '@mui/material';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


const CoinInfo = ({coin}) => {

    const[chartData , setChartData] = useState([]);
    const[days , setDays] = useState(1);
    const [flag , setFlag] = useState(false)
    const { currency } = CryptoContexts();

    const fetchChartData = async () => {
        const  { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setChartData(data.prices)
    }
    

    useEffect(() => {
        fetchChartData();
    },[currency, days])

    const useStyles = makeStyles((theme) => ({
        container: {
            width: '75%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: '100%',
                marginTop: 0,
                padding: 20,
                paddingTop: 0
            }
        }
    }))

    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
          <div className={classes.container}>
           
              <>
                <Line
                  data={{
                    labels:chartData.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),
    
                    datasets: [
                      {
                        data:chartData.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in ${currency}`,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {chartDays.map((day) => (
                    <SelectButton
                      key={day.value}
                      onClick={() => {setDays(day.value);
                        setFlag(false);
                      }}
                      selected={day.value === days}
                    >
                      {day.label}
                    </SelectButton>
                  ))}
                </div>
              </>
              
          </div>
        </ThemeProvider>
      );
    };
    

export default CoinInfo;