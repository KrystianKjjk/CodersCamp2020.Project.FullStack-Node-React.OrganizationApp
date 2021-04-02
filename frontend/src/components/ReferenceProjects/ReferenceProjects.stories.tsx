import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ReferenceProjects , { ReferenceProjectsProps } from './ReferenceProjects';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'ReferenceProjects component',
  component: ReferenceProjects,
} as Meta;

const Template: Story<ReferenceProjectsProps> = (args) => (
  <Provider store={store}>
    <ReferenceProjects {...args} />
  </Provider>
);

export const SampleReferenceProjects = Template.bind({});
SampleReferenceProjects.args = {
  name: 'ReferenceProjects',
};