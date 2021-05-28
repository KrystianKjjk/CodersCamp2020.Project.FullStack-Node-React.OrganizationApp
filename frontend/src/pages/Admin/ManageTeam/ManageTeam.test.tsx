import React from 'react'
import { render, screen, wait } from '@testing-library/react'
import { store } from '../../../app/store'
import ManageTeam from './ManageTeam'
import TeamService from '../../../api/Team.service'
import UserService from '../../../api/User.service'
import { usersDatabase } from '../ManageUsers'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom'

const teamsDatabase = [
  {
    id: '0',
    mentor: {
      id: '100',
      name: 'Naame',
      surname: 'Suurname',
    },
    users: [
      {
        id: '11',
        name: 'UserName',
        surname: 'UserSurname',
        status: 'Active',
        averageGrade: 11,
      },
    ],
    projects: [
      {
        id: '111',
        name: 'Chess',
        overallGrade: 11,
        sectionName: 'Typescript',
        url: 'TSurl',
        description: 'chess project description',
      },
    ],
    teamAvgGrade: 11,
    maxPoints: 111,
  },
]

const mentorsDatabase = [
  {
    id: '88',
    name: 'Naame',
    surname: 'Suurname',
  },
]

// jest.mock('../../../api/Team.service.ts', () => jest.fn())
// jest.mock('../../../api/User.service.ts', () => jest.fn())

describe('ManageTeam', () => {
  jest.setTimeout(20000)
  it('renders without error', async () => {
    // const getTeamMock = jest.fn((id: string) =>
    //   Promise.resolve(teamsDatabase[+id]),
    // )
    // const setMentorMock = jest.fn(async (teamId: string, mentorId: string) => {
    //   teamsDatabase[+teamId].mentor = mentorsDatabase[+mentorId]
    // })
    // const addUserToTeamMock = jest.fn(
    //   async (teamId: string, userId: string) => {
    //     teamsDatabase[+teamId].users.push(usersDatabase[+userId])
    //   },
    // )
    // const deleteUserFromTeamMock = jest.fn(
    //   async (teamId: string, userId: string) => {
    //     teamsDatabase[+teamId].users = teamsDatabase[+teamId].users.filter(
    //       (user) => user.id !== `${userId}`,
    //     )
    //   },
    // )
    // const TeamServiceMock = {
    //   getTeam: getTeamMock,
    //   setMentor: setMentorMock,
    //   addUserToTeam: addUserToTeamMock,
    //   deleteUserFromTeam: deleteUserFromTeamMock,
    // }

    // const getUsersOfTypeMock = jest.fn(async (type: string) =>
    //   usersDatabase.filter((user) => user.type === type),
    // )
    // const getParticipantsNotInTeamMock = jest.fn(async () => [usersDatabase[0]])
    // const UserServiceMock = {
    //   getUsersOfType: getUsersOfTypeMock,
    //   getParticipantsNotInTeam: getParticipantsNotInTeamMock,
    // }
    // // @ts-ignore
    // TeamService.mockImplementation(() => TeamServiceMock)
    // // @ts-ignore
    // UserService.mockImplementation(() => UserServiceMock)

    // const teamId = '0'
    // render(
    //   <Provider store={store}>
    //     <Router>
    //       <Switch>
    //         <Route path="/teams/:teamId">
    //           <ManageTeam />
    //         </Route>
    //         <Route path="/">
    //           <Redirect to={'/teams/' + teamId} />
    //         </Route>
    //       </Switch>
    //     </Router>
    //   </Provider>,
    // )
    // const tableComp = await screen.findByLabelText('Table - Team')
    // expect(getTeamMock).toBeCalledTimes(1)
    // expect(setMentorMock).toBeCalledTimes(0)
    // expect(addUserToTeamMock).toBeCalledTimes(0)
    // expect(deleteUserFromTeamMock).toBeCalledTimes(0)
    // expect(getUsersOfTypeMock).toBeCalledTimes(0)
    // expect(getParticipantsNotInTeamMock).toBeCalledTimes(0)

    // const table = store.getState().tables['Team']
    // expect(table.rows).toHaveLength(teamsDatabase[0].users.length)

    // const changeMentorBtn = screen.getByText('Change')
    // changeMentorBtn.click()
    // expect(getUsersOfTypeMock).toBeCalledTimes(1)
    // await screen.findByLabelText('Table - Find mentor')
    // const mentorCell = screen.getByText(mentorsDatabase[0].name)
    // mentorCell.click()
    // expect(setMentorMock).toBeCalledTimes(1)

    // const addUserBtn = screen.getByText('Add')
    // addUserBtn.click()
    // expect(getParticipantsNotInTeamMock).toBeCalledTimes(1)
    // await screen.findByLabelText('Table - Find participant')
    // const userCell = screen.getByText(usersDatabase[0].name)
    // userCell.click()
    // expect(addUserToTeamMock).toBeCalledTimes(1)

    // const userCheckbox = tableComp.querySelector('.MuiDataGrid-cellCheckbox')
    // if (userCheckbox) userEvent.click(userCheckbox)
    // const deleteUserBtn = screen.getByText('DELETE')
    // deleteUserBtn.click()
    // wait(() => expect(deleteUserFromTeamMock).toBeCalledTimes(1))
  })
})
