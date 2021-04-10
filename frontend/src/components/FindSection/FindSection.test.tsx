import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import FindSection from './FindSection';

describe('FindSection', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <FindSection />
         </Provider>
      );
   });
});