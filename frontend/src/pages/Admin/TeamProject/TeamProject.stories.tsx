import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import TeamProject, { TeamProjectProps } from './TeamProject'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'

// export default {
//   title: 'TeamProject component',
//   component: TeamProject,
// } as Meta;

// const Template: Story<TeamProjectProps> = (args) => {
//   <Provider store ={store}>
//     <TeamProject {...args} />;
//   </Provider>
// }

// export const TeamProjectStory = Template.bind({});
// TeamProjectStory.args = {
//   _id: "60426bdd9eb5d008d4a956cc",
//   changeViewFn: () => {return null}
// };
