import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import SectionView from './SectionView';
import { MemoryRouter } from 'react-router-dom';

describe('SectionView', () => {
   it('renders without error', () => {
      render(
         <MemoryRouter>
            <Provider store={store}>
               <SectionView />
            </Provider>
         </MemoryRouter>
      );
   });

   it('renders without error', () => {
      const { baseElement } = render(
         <MemoryRouter>
            <Provider store={store}>
               <SectionView />
            </Provider>
         </MemoryRouter>
      );
      // SAVE
      const inputsBefore = baseElement.querySelectorAll('input');
      expect(inputsBefore).toHaveLength(4);
      // 4 - Section Name, Course Name, Start Date, End Date
      const textareaBefore = baseElement.querySelectorAll('textarea');
      expect(textareaBefore).toHaveLength(2);
      // 2 - Section Description (hidden and normal)
      const buttons = baseElement.querySelectorAll('button');
      expect(buttons).toHaveLength(1);
      expect(buttons[0]).toHaveTextContent('SAVE');
      
   });



});