import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
   it('renders without error', async () => {
      const onSubmit = jest.fn<string, any>();
      render(
         <Provider store={store}>
            <SearchInput onSubmit={onSubmit} placeholder='Search'/>
         </Provider>
      );
      const input = await screen.findByRole('textbox');
      const arrow = screen.getByLabelText('arrow button');
      const sampleStr: string = 'Query';

      // Type something and click arrow
      userEvent.type(input, sampleStr);
      userEvent.click(arrow);
      userEvent.click(arrow);
      expect(onSubmit).toBeCalledTimes(2);
      expect(onSubmit).toBeCalledWith(sampleStr);
      // Type something and press enter
      userEvent.type(input, sampleStr);
      userEvent.type(input, '\n');
      userEvent.type(input, '\n\n\n\n');
      userEvent.type(input, '\n');
      expect(onSubmit).toBeCalledTimes(3);
      expect(onSubmit).toBeCalledWith(sampleStr + sampleStr);
   });
});