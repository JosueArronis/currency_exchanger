import React from 'react'
import Spinner from '../layout/Spinner';
const ResultSection = (props) => {
    const {conversion_rate, conversion_result, loading} = props;
    return (
        <div className='form-container'>
           <h3> Result Section </h3>
           {loading ? <Spinner/> : 
            <>
                 {conversion_rate > 0 && conversion_result >0 ? 
                    <>
                        <div className='form-group'>
                            <label htmlFor='conversion_rate'>Conversion Rate</label>
                            <input className="input_disable" type='number' name='conversion_rate' value={conversion_rate} disabled/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='conversion_result'>Conversion Result in cents</label>
                            <input className="input_disable" type='number' name='conversion_result' value={conversion_result} disabled/>
                        </div>
                    </>
                  : null}
            </>
           }
        </div>
    )
}

export default ResultSection

