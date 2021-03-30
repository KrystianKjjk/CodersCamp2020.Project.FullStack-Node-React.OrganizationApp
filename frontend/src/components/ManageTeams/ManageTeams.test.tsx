import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageTeams from './ManageTeams';

describe('ManageTeams', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ManageTeams name='ManageTeams'/>
         </Provider>
      );
   });
});