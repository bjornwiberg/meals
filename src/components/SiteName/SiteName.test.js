import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SiteName from '.';

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', async () => {
    render(
      <MemoryRouter>
        <SiteName text="Text" />
      </MemoryRouter>
    );
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
