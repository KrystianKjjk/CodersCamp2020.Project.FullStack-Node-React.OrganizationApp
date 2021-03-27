import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ReusableTable from './ReusableTable';
import userEvent from '@testing-library/user-event';


const tableName = 'Users';
const users = [{id: 1, name: 'user1'}, {id: 2, name: 'user2'}];
const columns = [{field: 'id', width: 100}, {field: 'name', width: 100}];

describe('ReusableTable', () => {
   
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
      expect(getData).toBeCalledTimes(1);
      expect(state.tables[tableName].rows).toEqual(users);
   });

   it('after click on row, calls onRowClick', async () => {
      const getData = jest.fn(() => Promise.resolve(users));
      const onRowClick = jest.fn();
      render(
         <Provider store={store}>
            <ReusableTable name={tableName} getData={getData} 
                           columns={columns} onRowClick={onRowClick}/>
         </Provider>
      );
      const table = await screen.findByLabelText(`Table - ${tableName}`);
      expect(table).toBeInTheDocument();
      const clickedName: string = 'user1';
      const cell = screen.getByText(clickedName);
      userEvent.click(cell);
      expect(onRowClick).toBeCalledTimes(1);
   });
});