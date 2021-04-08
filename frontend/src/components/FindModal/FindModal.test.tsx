import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import FindModal from './FindModal';

interface ITest {
   id: string;
}

describe('FindModal', () => {
   it('renders without error', () => {
      const onSelection = jest.fn();
      const columns = [{field: 'id', width: 100}];
      const dataPromise = Promise.resolve([{id: '1'}]);
      render(
         <Provider store={store}>
            <FindModal<ITest> onRowSelection={onSelection} columns={columns} dataPromise={dataPromise}/>
         </Provider>
      );
   });
});