import { render, screen } from '@testing-library/react';
import App from '../../src/app/App'

test('get component', async () => {
  // render(<App />);
  console.log(screen.getByText('App loading...'));
});

