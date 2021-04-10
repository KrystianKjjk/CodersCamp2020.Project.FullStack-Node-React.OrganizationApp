import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TeamProjects from './TeamProjects';

const teamProjects = [{
   id: 'myTestID',
   Name: 'Star Wars - child project by one of teams',
   Mentor: 'Test Mentor',
   ReferenceProject: 'Star Wars Standard Project',
   Section: 'Javascript'
 }]

const mockGet = () => {
   return Promise.resolve(teamProjects);
}

const TestEdit = (selectedProjectId: Object) => {
   return (
      <div aria-label="test">Here you should be editing project with ID {selectedProjectId}</div>
   )
}

describe('TeamProjects', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <TeamProjects course="123" getFunction={mockGet} editComponent={TestEdit} />
         </Provider>
      );
      const header = await screen.findByLabelText(`TeamProjectsHeader`);
      expect(header).toBeInTheDocument();

      const table = await screen.findByLabelText(`Table - Manage Team Projects`);
      expect(table).toBeInTheDocument();
   });
});
