import axios from 'axios';

const url = 'http://localhost:5000/api/v1/quote';

export const getExchangeRate = async (from: string, to: string, amount: number) => {
    const session_exchange = sessionStorage.getItem(`${from}_${to}`);
    if (session_exchange !== null) { 
        return {
            exchangeRate: parseFloat(JSON.parse(session_exchange).exchangeRate.toFixed(3)),
            quoteAmount:  parseInt((JSON.parse(session_exchange).exchangeRate * amount * 100).toFixed(3)),
        }
    } else  {
        const response = await axios.get(`${url}`, {
          params: {
            baseCurrency: from,
            quoteCurrency: to,
            baseAmount: amount
          },
        });
        const {exchangeRate, quoteAmount, base_code, target_code} = response.data;
        sessionStorage.setItem(
          `${from}_${to}`,
          JSON.stringify({
            base_code,
            target_code,
            exchangeRate,
          })
        );
        return {
            exchangeRate,
            quoteAmount
        }
    }
}