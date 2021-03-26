import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TeamProject , { TeamProjectProps } from './TeamProject';

export default {
  title: 'TeamProject component',
  component: TeamProject,
} as Meta;

const Template: Story<TeamProjectProps> = (args) => <TeamProject {...args} />;

export const TeamProjectStory = Template.bind({});
TeamProjectStory.args = {
  // _id: "123123",
  // teamId: "123123",
  // parentProjectIds: "!23123",
  // projectName: "FitNotFat",
  // projectUrl: "fitnotfat.com",
  // description: "Aplikacja dostarcza użytkownikowi informacje ile kalorii dziennie powinien spożywać, aby osiągnąć określony cel: utrzymać obecną wagę, schudnąć lub zwiększyć masę ciała."
};