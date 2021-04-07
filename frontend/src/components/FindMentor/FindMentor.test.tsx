import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import FindMentor from './FindMentor';

describe('FindMentor', () => {
   it('renders without error', () => {
      const onMentorSelection = jest.fn();
      render(
         <Provider store={store}>
            <FindMentor onMentorSelection={onMentorSelection}/>
         </Provider>
      );
   });
});