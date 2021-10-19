import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RateSecction from '../components/rateSection/RateSection';
import mockAxios from 'jest-mock-axios';
import * as ExchangeServices from '../services/Exchange';

describe('RateSection', () => {
  test('Test Form Fill Rate Section', async () => {
    // const spy = jest.spyOn(ExchangeServices, 'getExchangeRate').mockResolvedValueOnce({
    //   exchangeRate: 1.5,
    //   quoteAmount:150,
    // });
    mockAxios.get.mockResolvedValueOnce({
      data: {
        exchangeRate: 1.5,
        quoteAmount:150,
        base_code: 'USD',
        target_code: 'EUR',
      },
    });
    const mockResultExchange = jest.fn((x) =>{});
    const mockhandleLoading = jest.fn((x) => {});
    const rendered = render(
      <RateSecction resultsExchange={mockResultExchange} handleLoading={mockhandleLoading} />
    );
    const SelectBase = screen.getByPlaceholderText('Select your Base currency');
    userEvent.type(SelectBase, 'USD');
    const SelectBaseB = rendered.container.querySelector('button');
    SelectBaseB !== null ? userEvent.click(SelectBaseB) : null;
    expect(SelectBase).toHaveValue('USD');
    const SelectQuote = screen.getByPlaceholderText('Select your Quote currency');
    userEvent.type(SelectQuote, 'EUR');
    const SelectQuoteB = rendered.container.querySelector('button');
    SelectQuoteB !== null ? userEvent.click(SelectQuoteB) : null;
    expect(SelectQuote).toHaveValue('EUR');
    const amountInput = screen.getByTestId('amount-input');
    userEvent.type(amountInput, '100');
   
    // expect(spy).toHaveBeenCalledTimes(1);
    // spy.mockRestore();
  });
});
