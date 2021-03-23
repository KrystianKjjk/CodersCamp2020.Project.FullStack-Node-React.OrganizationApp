import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ReusableTable from './ReusableTable';

const tableName = 'Users';

describe('ReusableTable', () => {
   it('renders without error', () => {
      render(
         <Provider store={store}>
            <ReusableTable name={tableName}/>
         </Provider>
      );
      const table = screen.getByLabelText(`Table - ${tableName}`);
      expect(table).toMatchSnapshot();
   });

   it('test table initialization', () => {
      const state = store.getState();
      expect(state.tables[tableName]).toEqual({
         rows: [],
       });
   })
});