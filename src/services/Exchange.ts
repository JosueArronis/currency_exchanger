import axios from 'axios';

const url = 'https://v6.exchangerate-api.com/v6/6af991231397116b706e7f9c/pair';

export const getExchangeRate = async (from: string, to: string, amount: number) => {
    const session_exchange = sessionStorage.getItem(`${from}_${to}`);
    if (session_exchange !== null) { 
        return {
            conversion_rate: JSON.parse(session_exchange).conversion_rate,
            conversion_result: JSON.parse(session_exchange).conversion_rate * amount
        }
    } else  {
        const response = await axios.get(`${url}/${from}/${to}/${amount}`);
        const {conversion_rate, conversion_result, base_code, target_code} = response.data;
        sessionStorage.setItem(`${from}_${to}`, JSON.stringify({
            base_code,
            target_code,
            conversion_rate
        }));
        return {
            conversion_rate,
            conversion_result
        }
    }
}