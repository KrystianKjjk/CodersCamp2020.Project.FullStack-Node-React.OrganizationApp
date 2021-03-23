import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {ShowInputText, InputProps} from './exampleInput';


export default {
  title: 'My examples2/Input',
  component: ShowInputText,
} as Meta;

const Template: Story<InputProps> = (args) => <ShowInputText {...args} />;

export const FirstInput = Template.bind({});
FirstInput.args = {
  label: 'Write something: ',
};