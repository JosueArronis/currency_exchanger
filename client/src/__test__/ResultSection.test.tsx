import { render, screen } from '@testing-library/react';
import ResultSection from '../components/resultSection/ResultSection';

describe('ResultSection', () => {
  test('Test home init', () => {
    render(
      <ResultSection
        loading={false}
        conversion_rate={1.5}
        conversion_result={150}
      />
    );
    const resultText = screen.getByText('Result Section');
    const inputRate = screen.getByTestId('conversion-rate-input');
    const inputResult = screen.getByTestId('conversion-result-input');
    expect(resultText).toBeInTheDocument();
    expect(inputRate).toHaveValue(1.5);
    expect(inputResult).toHaveValue(150);

  });
});
