import { fireEvent, render, waitFor } from '@testing-library/react';

import Search from '.';

describe('Search', () => {
  test('renders properly', async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Search onChange={onChange} currentValue={''} />);
    const search = getByTestId('search');

    fireEvent.change(search, { target: { value: 'Search' } });
    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });
});
