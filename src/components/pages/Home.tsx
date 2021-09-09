import React, { Fragment, useState } from 'react';
import RateSection from '../rateSection/RateSection';
import ResultSection from '../resultSection/ResultSection';

const Home = () => {
  const [convertions, setConvertions] = useState({
      conversion_rate: 0,
      conversion_result: 0
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
        <ResultSection loading={loading} conversion_rate={convertions.conversion_rate} conversion_result={convertions.conversion_result} /> 
      </div>
    </Fragment>
  )
  
};

export default Home;
