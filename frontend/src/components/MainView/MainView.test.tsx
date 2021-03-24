import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import MainView from './MainView';

describe('MainView', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <MainView />
         </Provider>
      );
   });
});