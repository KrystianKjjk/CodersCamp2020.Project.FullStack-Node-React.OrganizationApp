import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CourseList from './CourseList';

describe('CourseList', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            {/* <CourseList name='CourseList'/> */}
         </Provider>
      );
   });
});