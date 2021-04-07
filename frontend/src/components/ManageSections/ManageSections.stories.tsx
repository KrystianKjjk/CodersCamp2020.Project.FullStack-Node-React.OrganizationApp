import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ManageSections , { ManageSectionsProps } from './ManageSections';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import getSections from '../../api/getSections';
import theme from '../../theme/customMaterialTheme';
import { ThemeProvider } from '@material-ui/styles';


export default {
  title: 'ManageSections component',
  component: ManageSections,
} as Meta;

const Template: Story<ManageSectionsProps> = (args) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ManageSections {...args} />  
    </ThemeProvider>
  </Provider>
);

const sectionsDatabase = [
  {id: 1, name: 'Naame', startDate: '15-05-2005', endDate: '15-05-2005', courseName: 'CodersCamp 1. edition',},
  {id: 2, name: 'Naame', startDate: '15-05-2005', endDate: '15-05-2005', courseName: 'CodersCamp 1. edition',},
  {id: 3, name: 'Naame', startDate: '15-05-2005', endDate: '15-05-2005', courseName: 'CodersCamp 1. edition',},
  {id: 4, name: 'Naame', startDate: '15-05-2005', endDate: '15-05-2005', courseName: 'CodersCamp 1. edition',},
  {id: 5, name: 'Naame', startDate: '15-05-2005', endDate: '15-05-2005', courseName: 'CodersCamp 1. edition',},
]
const getFakeSections = () => {
  return Promise.resolve(sectionsDatabase);
}

export const SampleFakeManageSections = Template.bind({});
SampleFakeManageSections.args = {
  onClickAdd: () => console.log('Clicked Add'),
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRjNjQyZTUzNDdhZDE5ZDRmOWE0MzciLCJ0eXBlIjozLCJpYXQiOjE2MTY4NzIzNTcsImV4cCI6MTYxNjk1ODc1N30.RX1EzN6tHmdMFhDWtm6TmQPFzML6min3e_11RH3B6GA';

export const SampleManageSections = Template.bind({});
SampleManageSections.args = {
  onClickAdd: () => console.log('Clicked Add'),
};
