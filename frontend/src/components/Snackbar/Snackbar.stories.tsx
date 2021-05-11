import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Snackbar from './Snackbar'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import UButton from '../UButton'
import useSnackbar from '../../hooks/useSnackbar'

export default {
  title: 'Snackbar component',
  component: Snackbar,
} as Meta

const Template: Story = () => {
  return (
    <Provider store={store}>
      <ShowSnackbar />
    </Provider>
  )
}

const ShowSnackbar = () => {
  const { showSuccess, showError, showInfo, showWarning } = useSnackbar()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <UButton
          text={'show success'}
          onClick={() => showSuccess('example success message')}
        />
        <UButton
          text={'show error'}
          onClick={() => showError('example error message')}
        />
        <UButton
          text={'show info'}
          onClick={() => showInfo('example info message')}
        />
        <UButton
          text={'show warning'}
          onClick={() => showWarning('example warning message')}
        />
      </div>
      <Snackbar />
    </>
  )
}
export const SampleSnackbar = Template.bind({})
SampleSnackbar.args = {}
