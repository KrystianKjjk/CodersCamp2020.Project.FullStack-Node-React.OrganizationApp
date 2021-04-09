import React from 'react';
import { render, screen } from '@testing-library/react';
import { store } from '../../app/store';
import ManageTeam from './ManageTeam';
import TeamService from '../../api/Team.service';
import UserService from '../../api/User.service';
import { usersDatabase } from '../ManageUsers';
import { Provider } from 'react-redux';

const teamsDatabase = [{
   id: '0',
   mentor: {
      id: '100',
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
   projects: [{
      id: '111',
      name: 'Chess',
      overallGrade: 11, 
      sectionName: 'Typescript', 
      url: 'TSurl', 
      description: 'chess project description',
   }],
   teamAvgGrade: 11,
   maxPoints: 111,
}];

const mentorsDatabase = [
   {
      id: '88',
      name: 'Naame',
      surname: 'Suurname',
   },
];

jest.mock('../../api/Team.service.ts', () => jest.fn());
jest.mock('../../api/User.service.ts', () => jest.fn());

describe('ManageTeam', () => {
   it('renders without error', async () => {
      const getTeamMock = jest.fn( (id: string) => Promise.resolve(teamsDatabase[+id]) );
      const setMentorMock = async (teamId: string, mentorId: string) => {
         teamsDatabase[+teamId].mentor = mentorsDatabase[+mentorId];
      };
      const addUserToTeamMock = async (teamId: string, userId: string) => {
         teamsDatabase[+teamId].users.push(usersDatabase[+userId]);
      };
      const deleteUserFromTeamMock = async (teamId: string, userId: string) => {
         teamsDatabase[+teamId].users = teamsDatabase[+teamId].users.filter(user => user.id !== `${userId}`);
      };
      const TeamServiceMock = {
         getTeam: getTeamMock,
         setMentor: setMentorMock,
         addUserToTeamMock: addUserToTeamMock,
         deleteUserFromTeam: deleteUserFromTeamMock,
      };

      const getUsersOfTypeMock = async (type: string) => usersDatabase.filter(user => user.type === type);
      const getParticipantsNotInTeamMock = async () => [usersDatabase[0]];
      const UserServiceMock = {
         getUsersOfType: getUsersOfTypeMock,
         getParticipantsNotInTeam: getParticipantsNotInTeamMock,
      };
      // @ts-ignore
      TeamService.mockImplementation(() => TeamServiceMock);
      // @ts-ignore
      UserService.mockImplementation(() => UserServiceMock);

      render(
         <Provider store={store} >
            <ManageTeam teamId='0' />
         </Provider>
      );
      const tableComp = await screen.findByLabelText('Table - Team');
      expect(getTeamMock).toBeCalledTimes(1);
      
      const table = store.getState().tables['Team'];
      expect(table.rows).toHaveLength(teamsDatabase[0].users.length);
   });

});