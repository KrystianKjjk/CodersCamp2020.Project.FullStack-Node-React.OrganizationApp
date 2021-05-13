import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  cssLabel: {
    color: '#FFF !important',
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#696969',
  },

  outlinedInput: {
    '&$cssFocused $notchedOutline': {
      border: '1px solid #FFF',
    },
  },
}))
