import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom'
// Context
import {CryptoContexts} from '../Context/CryptoContext';
// Api
import {TrendingCoins} from '../Services/api'
// styles
import './Banner.css';


const Carousel = () => {
    
    const [trending , setTrending] = useState([])
    const {currency, symbol} = CryptoContexts();

    const fetchTrending = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }



    useEffect(() => {
        fetchTrending()
    }, [currency])

    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
      
    const items = trending.map(coin => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return(
            <Link className='carouselItem' to={`/coin/${coin.id}`}>
                <img
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                />
                  <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500,marginTop: '8px' }}>
          {symbol} {coin?.current_price.toLocaleString()}
        </span>
            </Link>
        )
    })  

    return (
        <div className='carousel'>
            <AliceCarousel 
             mouseTracking
             infinite
             autoPlayInterval={1000}
             animationDuration={1500}
             disableDotsControls
             disableButtonsControls
             responsive={responsive}
             items={items}
             autoPlay
            />
        </div>
    );
};

export default Carousel;