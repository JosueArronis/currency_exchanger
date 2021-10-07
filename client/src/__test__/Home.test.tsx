import { render, screen } from '@testing-library/react';
import Home from '../components/pages/Home';

describe('Home', () => {
  test('Test home init', () => {
    render(<Home />);
    const rateText = screen.getByText('Rate Section');
    const resultText = screen.getByText('Result Section');
    expect(rateText).toBeInTheDocument();
    expect(resultText).toBeInTheDocument();
   
  });
});
