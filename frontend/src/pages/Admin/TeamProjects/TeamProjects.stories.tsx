import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import TeamProjects, { TeamProjectsProps } from './TeamProjects'
import { store } from '../../../app/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import darkTheme from '../../../theme/customMaterialTheme'

export default {
  title: 'TeamProjects component',
  component: TeamProjects,
} as Meta

const teamProjects = [
  {
    id: 'myTestID',
    Name: 'Star Wars - child project by one of teams',
    Mentor: 'Test Mentor',
    ReferenceProject: 'Star Wars Standard Project',
    Section: 'Javascript',
  },
  {
    id: 'myTestID2',
    Name: 'FitNotFat',
    Mentor: 'Test Mentor',
    ReferenceProject: 'Chess',
    Section: 'Typescript',
  },
]

function mockGet(): Promise<any[]> {
  return Promise.resolve(teamProjects)
}

const Template: Story<TeamProjectsProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <TeamProjects {...args} />
    </ThemeProvider>
  </Provider>
)

export const SampleTeamProjects = Template.bind({})
SampleTeamProjects.args = {
  getFunction: mockGet,
}
