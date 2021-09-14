import axios from 'axios';
import config from 'config';

const url = `${config.get('exchange_api_base_url')}${config.get('api_exchange_key')}/pair`;

export const getExchangeRate = async (from: string, to: string, amount: number) => {
  const response = await axios.get(`${url}/${from}/${to}/${amount}`);
  const { conversion_rate, conversion_result, base_code, target_code } = response.data;
  return {
    conversion_rate,
    conversion_result,
    base_code,
    target_code,
  };
};
