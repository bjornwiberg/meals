import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Search from '.';

describe('Search', () => {
  test('renders properly', async () => {
    const onChange = jest.fn();
    render(<Search onChange={onChange} currentValue={''} />);
    const search = screen.getByTestId('search');

    fireEvent.change(search, { target: { value: 'Search' } });
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });
});
