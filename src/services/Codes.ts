import axios from 'axios';

const url = 'https://v6.exchangerate-api.com/v6/6af991231397116b706e7f9c/codes';

export const getCodes = async () => {
    const resp =  await axios.get(url);
   
   const valid_codes = resp.data.supported_codes.map(elemt => {
       return  {
           name:elemt[0],
           value: elemt[0]
       }
    });
    return  valid_codes
}