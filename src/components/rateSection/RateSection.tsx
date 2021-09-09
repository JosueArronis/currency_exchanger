import React, {useEffect, useState, useContext} from 'react'
import SelectSearch, {fuzzySearch} from 'react-select-search';
import AlertContext from '../../context/alert/alertContext';
import {getCodes} from '../../services/Codes';
import {getExchangeRate} from '../../services/Exchange';

interface IRateSectionProps {
    resultsExchange: Function;
    handleLoading: Function;
}

const RateSection = (props: IRateSectionProps) => {

const  {resultsExchange, handleLoading} = props;   
const alertContext = useContext(AlertContext);
const [codes, setCodes] = useState([]);
const [selectedCode, setSelectedCode] = useState({
    base: '',
    quote: '',
    amount: 0
});

useEffect(() => {
   const load_codes = async () => {
       try {
           const data = await getCodes();
           setCodes(data);
       } catch (error) {
        alertContext.setAlert('Error loading codes', 'danger', 3000);
       }
   }
    load_codes();
}, [alertContext])

const handleChangeBase = (selectedOption) => {
    setSelectedCode({...selectedCode, base: selectedOption});
}
const handleChangeQuote = (selectedOption) => {
   setSelectedCode({...selectedCode, quote: selectedOption});
}
const handleChangeAmount = (e) => {
   setSelectedCode({...selectedCode, [e.target.name]: isNaN(parseFloat(e.target.value))? 0 : parseFloat(e.target.value)});
}

const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoading(true);
    const result  =  await getExchangeRate(selectedCode.base,selectedCode.quote, selectedCode.amount);
    resultsExchange(result);
    handleLoading(false);
}

/* Simple example */
    return (
        <div className='form-container'>
            <h3> Rate Section </h3>
            <form onSubmit={handleSubmit} className='form'>
                <SelectSearch options={codes}
                    search
                    filterOptions={fuzzySearch}
                    emptyMessage="Not found"
                    placeholder="Select your Base currency"
                    onChange={handleChangeBase}
                    disabled={codes.length === 0? true : false} 
                />
                <SelectSearch options={codes}
                    search
                    filterOptions={fuzzySearch}
                    emptyMessage="Not found"
                    placeholder="Select your Quote currency"
                    onChange={handleChangeQuote}
                    disabled={selectedCode.base.length === 0? true : false} 
                />
                <input className={selectedCode.base.length === 0 || selectedCode.quote.length === 0 ? 'input_disable' : ''} 
                 type='number' step=".01" name='amount' placeholder="Base Amount"  min="0" onChange={handleChangeAmount}
                 disabled={selectedCode.base.length === 0 || selectedCode.quote.length === 0 ? true : false}/>
                <input 
                className={`btn btn-primary btn-sm ${selectedCode.base.length === 0 || selectedCode.quote.length === 0 || selectedCode.amount <= 0 ? 'btn-disable' : ''}`}
                disabled={selectedCode.base.length === 0 || selectedCode.quote.length === 0 || selectedCode.amount <= 0 ? true : false}
                type='submit' 
                value='Calculate' />
            </form>
        </div>
    )
}

export default RateSection
