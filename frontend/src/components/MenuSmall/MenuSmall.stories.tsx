import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuSmall , { MenuSmallProps } from './MenuSmall';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

export default {
  title: 'MenuSmall component',
  component: MenuSmall,
} as Meta;

const Template: Story<MenuSmallProps> = (args) => (
  <Provider store={store}>
    <MenuSmall {...args} />
  </Provider>
);

export const SampleMenuSmall = Template.bind({});
SampleMenuSmall.args = {
  name: 'MenuSmall',
};