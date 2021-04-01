import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageSections , { ManageSectionsProps } from './ManageSections';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'ManageSections component',
  component: ManageSections,
} as Meta;

const Template: Story<ManageSectionsProps> = (args) => (
  <Provider store={store}>
    <ManageSections {...args} />
  </Provider>
);

export const SampleManageSections = Template.bind({});
SampleManageSections.args = {
  name: 'ManageSections',
};