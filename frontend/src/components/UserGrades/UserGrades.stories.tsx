import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import UserGrades , { UserGradesProps } from './UserGrades';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'UserGrades component',
  component: UserGrades,
} as Meta;

const Template: Story<UserGradesProps> = (args) => (
  <Provider store={store}>
    <UserGrades {...args} />
  </Provider>
);

export const SampleUserGrades = Template.bind({});
SampleUserGrades.args = {
};
