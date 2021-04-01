import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import CourseCreate from '../CourseCreate';

describe('CourseCreator', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <CourseCreate/>
         </Provider>
      );
   });
});