import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import ManageSections from './ManageSections';
import { MemoryRouter } from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('ManageSections', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ManageSections />
         </Provider>
      );
   });

   it('clicking on button add direct to new section form', () => {
      render(
         <MemoryRouter>
            <Provider store={store}>
               <ManageSections />
            </Provider>
         </MemoryRouter>
      );

      const button = screen.getByText("ADD")
      fireEvent.click(button);
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
      expect(mockHistoryPush).toHaveBeenCalledWith('/sections/create')
   });
});