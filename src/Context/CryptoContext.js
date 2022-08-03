import React, { createContext, useEffect, useState } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [currency , setCurrency] = useState('USD')
    const [symbol , setSymbol] = useState('$')


    return (
        <Crypto.Provider>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;