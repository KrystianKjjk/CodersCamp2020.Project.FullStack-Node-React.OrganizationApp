import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TeamProject from './TeamProject';

describe('TeamProject', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <TeamProject _id="6042af0f06ad6350dcdaee27" changeViewFn={()=>{return null}}/>
         </Provider>
      );
   });   

   it('clicking on delete turns delete mode', () => {
      render(
         <Provider store={store}>
            <TeamProject _id="6042af0f06ad6350dcdaee27" changeViewFn={()=>{return null}}/>
         </Provider>
      );
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton);
      const deleteModal = screen.getByText('Do you really want to delete this project?')
      expect(deleteModal).toBeTruthy();
   });

   it('clicking on back triggers a callback function', () => {
      const mockCallback = jest.fn();

      render(
         <Provider store={store}>
            <TeamProject _id="6042af0f06ad6350dcdaee27" changeViewFn={mockCallback}/>
         </Provider>
      );

      const backButton = screen.getByText('Back')
      fireEvent.click(backButton);
      expect(mockCallback).toBeCalledTimes(1);

      
   });

   it('clicking on edit turns the edit mode', () => {
      render(
         <Provider store={store}>
            <TeamProject _id="6042af0f06ad6350dcdaee27" changeViewFn={()=>{return null}}/>
         </Provider>
      );

      const editButton = screen.getByText('Edit');
      fireEvent.click(editButton);
      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeTruthy();
   });
});