import React, { Fragment, useState } from 'react';
import RateSection from '../rateSection/RateSection';
import ResultSection from '../resultSection/ResultSection';

const Home = () => {
  const [convertions, setConvertions] = useState({
      exchangeRate: 0,
      quoteAmount: 0
  });
  const [loading, setLoading] = useState(false);

  const resultsExchange = (result) => {
    setConvertions(result);
  }
  const handleLoading = (loading) => {
    setLoading(loading);
  }
  return (
    <Fragment>
      <div className='card grid-2'>   
        <RateSection  resultsExchange={resultsExchange}  handleLoading={handleLoading}/>
        <ResultSection loading={loading} conversion_rate={convertions.exchangeRate} conversion_result={convertions.quoteAmount} /> 
      </div>
    </Fragment>
  )
  
};

export default Home;
