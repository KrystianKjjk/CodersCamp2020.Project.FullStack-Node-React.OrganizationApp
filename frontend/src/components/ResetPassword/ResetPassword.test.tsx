import React from 'react';
import ResetPassword from './ResetPassword';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

describe('ResetPassword', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <ResetPassword />)
         </Provider>
      );
      const labelInput = await screen.getByTestId('rp-email');
      expect(labelInput).toBeInTheDocument();
      expect(labelInput).toHaveTextContent('Email Address');

      const button = await screen.getByTestId('rp-button');
      expect(labelInput).toBeInTheDocument();
});
});