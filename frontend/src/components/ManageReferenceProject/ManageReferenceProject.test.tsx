import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageReferenceProject from './ManageReferenceProject';

describe('ManageReferenceProject', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ManageReferenceProject name='ManageReferenceProject'/>
         </Provider>
      );
   });
});