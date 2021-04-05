import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import EditableField from './EditableField';

describe('EditableField', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <EditableField name='EditableField'/>
         </Provider>
      );
   });
});