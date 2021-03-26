import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <SearchInput name='SearchInput'/>
         </Provider>
      );
   });
});