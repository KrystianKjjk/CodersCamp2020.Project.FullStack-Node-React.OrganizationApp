import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ReusableTable from './ReusableTable';

const tableName = 'Users';
const users = [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}];
const columns = [{field: 'id', width: 100}, {field: 'name', width: 100}];

describe('ReusableTable', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <ReusableTable name={tableName}/>
         </Provider>
      );
      const table = await screen.findByLabelText(`Table - ${tableName}`);
      expect(table).toBeInTheDocument();
   });

   it('loads data', async () => {
      const getData = jest.fn(() => Promise.resolve(users));
      render(
         <Provider store={store}>
            <ReusableTable name={tableName} getData={getData} columns={columns}/>
         </Provider>
      );

      const table = await screen.findByLabelText(`Table - ${tableName}`);
      const state = store.getState();
      expect(table).toBeInTheDocument();
      expect(table).toMatchSnapshot();

      expect(getData).toBeCalledTimes(1);
      expect(state.tables[tableName].rows).toEqual(users);
   });
});