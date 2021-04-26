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

describe('TeamProjects', () => {
   it('renders without error', async () => {
      render(
         <Provider store={store}>
            <TeamProjects getFunction={mockGet}/>
         </Provider>
      );

      const table = await screen.findByLabelText(`Table - Manage Team Projects`);
      //@ts-ignore
      expect(table).toBeInTheDocument();
   });
});
