import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageReferenceProject , { ManageReferenceProjectProps } from './ManageReferenceProject';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'ManageReferenceProject component',
  component: ManageReferenceProject,
} as Meta;

const Template: Story<ManageReferenceProjectProps> = (args) => (
  <Provider store={store}>
    <ManageReferenceProject {...args} />
  </Provider>
);

export const SampleManageReferenceProject = Template.bind({});
SampleManageReferenceProject.args = {
};
