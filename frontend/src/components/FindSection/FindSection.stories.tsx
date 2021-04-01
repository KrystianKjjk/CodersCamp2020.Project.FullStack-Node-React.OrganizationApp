import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FindSection , { FindSectionProps } from './FindSection';

export default {
  title: 'FindSection component',
  component: FindSection,
} as Meta;

const Template: Story<FindSectionProps> = (args) => <FindSection {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  onSectionSelection: (sectionID: any) => {console.log(sectionID)}
};
