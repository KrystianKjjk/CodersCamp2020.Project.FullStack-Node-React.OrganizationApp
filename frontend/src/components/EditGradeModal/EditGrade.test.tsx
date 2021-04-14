import React from 'react';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import EditGrade from '.';
import { SheetService } from '../../api';

jest.mock('../../api/Sheet.service.ts', () => jest.fn());

describe('EditGrade', () => {
   it('should disable submit when grade name is empty', () => {
      const props = {
         quality: 'Extra',
         open: true,
         onClickSave: jest.fn(),
         handleOpen: jest.fn(),
         handleClose: jest.fn(),
      }
      render(
         <Provider store={store}>
            <EditGrade {...props}/>
         </Provider>
      );
      
      userEvent.click(screen.getByText("SAVE"));
      
      expect(patchMentorGradeMock).not.toHaveBeenCalled();
   });

});