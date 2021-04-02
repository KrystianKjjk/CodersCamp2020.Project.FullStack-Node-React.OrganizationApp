import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TeamProjects from './TeamProjects';
import * as get from '../../api/getTeamProjects'

const teamProjects = {   
 }

const getTeamProjects = jest.fn().mockReturnValue(teamProjects);

describe('TeamProjects', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <TeamProjects course="" getFunction={getTeamProjects}/>
         </Provider>
      );
      const header = await screen.findByLabelText(`TeamProjectsHeader`);
      expect(header).toBeInTheDocument();
      
      const table = await screen.findByLabelText(`Table - Manage Team Projects`);
      expect(table).toBeInTheDocument();
   });

   it('loads data', async () => {
      render(
         <Provider store={store}>
             <TeamProjects course="" getFunction={getTeamProjects}/>
         </Provider>
      );
      const table = await screen.findByLabelText(`Table - Manage Team Projects`);
      expect(table).toBeInTheDocument();
      expect(getTeamProjects).toBeCalledTimes(1);
   });

   // it('after click on row, calls onRowClick', async () => {
   //    const getData = jest.fn(() => Promise.resolve(users));
   //    const onRowClick = jest.fn();
   //    render(
   //       <Provider store={store}>
   //          <ReusableTable name={tableName} getData={getData} 
   //                         columns={columns} onRowClick={onRowClick}/>
   //       </Provider>
   //    );
   //    const table = await screen.findByLabelText(`Table - ${tableName}`);
   //    expect(table).toBeInTheDocument();
   //    const clickedName: string = 'user1';
   //    const cell = screen.getByText(clickedName);
   //    userEvent.click(cell);
   //    expect(onRowClick).toBeCalledTimes(1);
   // });
   
});
