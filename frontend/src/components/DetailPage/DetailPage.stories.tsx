import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import DetailPage, { DetailPageProps } from './DetailPage'
import { store } from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: 'DetailPage component',
  component: DetailPage,
} as Meta

const Template: Story<DetailPageProps> = (args) => (
  <Provider store={store}>
    <DetailPage {...args} />
  </Provider>
)

export const SampleDetailPage = Template.bind({})
SampleDetailPage.args = {
  pageName: 'Egzample page',
  elementName: 'page element',
}
