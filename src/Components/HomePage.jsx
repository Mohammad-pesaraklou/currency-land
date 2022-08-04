import React, { useEffect } from 'react';

// components
import Banner from './Banner';
import CoinsTable from './CoinsTable';





const HomePage = () => {

    return (
       <>
        <div>
            <Banner />
            <CoinsTable />
        </div>
       </>
    );
};

export default HomePage;