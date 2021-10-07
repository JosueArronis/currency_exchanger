import React, { useState } from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import { getExchangeRate } from '../../services/Exchange';
interface IRateSectionProps {
  resultsExchange: Function;
  handleLoading: Function;
}

const RateSection = (props: IRateSectionProps) => {
  const { resultsExchange, handleLoading } = props;
  const [codes] = useState([
    {
      name: 'USD',
      value: 'USD',
    },
    {
      name: 'EUR',
      value: 'EUR',
    },
    {
      name: 'GBP',
      value: 'GBP',
    },
    {
      name: 'ILS',
      value: 'ILS',
    },
  ]);
  const [selectedCode, setSelectedCode] = useState({
    base: '',
    quote: '',
    amount: 0,
  });

  const handleChangeBase = (selectedOption) => {
    setSelectedCode({ ...selectedCode, base: selectedOption });
  };
  const handleChangeQuote = (selectedOption) => {
    setSelectedCode({ ...selectedCode, quote: selectedOption });
  };
  const handleChangeAmount = (e) => {
    setSelectedCode({
      ...selectedCode,
      [e.target.name]: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading(true);
    const result = await getExchangeRate(
      selectedCode.base,
      selectedCode.quote,
      selectedCode.amount
    );
    resultsExchange(result);
    handleLoading(false);
  };

  /* Simple example */
  return (
    <div className='form-container'>
      <h3> Rate Section </h3>
      <form onSubmit={handleSubmit} data-testid='from-rate' className='form'>
        <SelectSearch
          data-testid='baseC-input'
          options={codes}
          search
          filterOptions={fuzzySearch}
          emptyMessage='Not found'
          placeholder='Select your Base currency'
          onChange={handleChangeBase}
          disabled={codes.length === 0 ? true : false}
        />
        <SelectSearch
          options={codes}
          search
          filterOptions={fuzzySearch}
          emptyMessage='Not found'
          placeholder='Select your Quote currency'
          onChange={handleChangeQuote}
          disabled={selectedCode.base.length === 0 ? true : false}
        />
        <input
          data-testid='amount-input'
          className={
            selectedCode.base.length === 0 || selectedCode.quote.length === 0 ? 'input_disable' : ''
          }
          type='number'
          step='.01'
          name='amount'
          placeholder='Base Amount'
          min='0'
          onChange={handleChangeAmount}
          disabled={
            selectedCode.base.length === 0 || selectedCode.quote.length === 0 ? true : false
          }
        />
        <input
          data-testid='button-input'
          className={`btn btn-primary btn-sm ${
            selectedCode.base.length === 0 ||
            selectedCode.quote.length === 0 ||
            selectedCode.amount <= 0
              ? 'btn-disable'
              : ''
          }`}
          disabled={
            selectedCode.base.length === 0 ||
            selectedCode.quote.length === 0 ||
            selectedCode.amount <= 0
              ? true
              : false
          }
          type='submit'
          value='Calculate'
        />
      </form>
    </div>
  );
};

export default RateSection;
