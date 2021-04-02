import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ManageTeam from './ManageTeam';
import { sortData, filterData } from '../ReusableTable/ReusableTableSlice';

const teamsDatabase = [{
   id: '0',
   mentor: {
     name: 'Naame',
     surname: 'Suurname',
   },
   users: [{
     id: '11',
     name: 'UserName',
     surname: 'UserSurname',
     status: 'Active',
     averageGrade: 11,
   }],
   projects: [],
   teamAvgGrade: 11,
   maxPoints: 111,
 }];
 const getFakeTeam = (id: string) => {
   return Promise.resolve(teamsDatabase[Number(id)]);
 }

describe('ManageTeam', () => {
   it('renders without error', async () => {
      const getTeam = jest.fn( getFakeTeam );
      const onClickAdd = jest.fn();
      render(
         <Provider store={store}>
            <ManageTeam teamId='0' onClickAdd={onClickAdd} getTeamInfo={getTeam}/>
         </Provider>
      );
      const tableComp = await screen.findByLabelText('Table - Team');
      expect(getTeam).toBeCalledTimes(1);
      const addBtn = screen.getByLabelText('Add user');
      userEvent.click(addBtn);
      expect(onClickAdd).toBeCalledTimes(1);
      
      const table = store.getState().tables['Team'];
      expect(table.rows).toHaveLength(teamsDatabase[0].users.length);
   });

});