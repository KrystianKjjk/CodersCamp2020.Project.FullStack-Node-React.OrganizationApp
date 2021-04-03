import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TeamProjects from './TeamProjects';
import { getTeamProjects } from '../../api/getTeamProjects'

const teamProjects = [{   
   id: '6042af0f06ad6350dcdaee27',
   projectName: 'Star Wars - child project by one of teams',
   projectUrl: 'url test',
   description: 'dummy desc'
 }]

const mockGet = jest.fn(() => Promise.resolve(teamProjects));

const TestEdit = (selectedProjectId: Object) => {
   return (
      <div aria-label="test">Here you should be editing project with ID {selectedProjectId}</div>
   )
}

describe('TeamProjects', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <TeamProjects course="" getFunction={getTeamProjects} editComponent={TestEdit} />
         </Provider>
      );
      const header = await screen.findByLabelText(`TeamProjectsHeader`);
      expect(header).toBeInTheDocument();

      const table = await screen.findByLabelText(`Table - Manage Team Projects`);
      expect(table).toBeInTheDocument();
   });

   //I had issues with mocking the get request, so the rest of the tests are not prepared atm
});
