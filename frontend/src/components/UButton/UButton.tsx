import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { UButtonTheme } from '../../theme/customMaterialTheme'
import Button from '@material-ui/core/Button'

export interface UButtonProps {
  text: string
  color?: 'primary' | 'secondary'
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const UButton: React.FC<UButtonProps> = ({
  text,
  color = 'primary',
  onClick,
}) => {
  return (
    <ThemeProvider theme={UButtonTheme}>
      <div style={{ margin: '.5rem' }}>
        <Button variant="contained" color={color} onClick={onClick}>
          <span>{text}</span>
        </Button>
      </div>
    </ThemeProvider>
  )
}

export default UButton
