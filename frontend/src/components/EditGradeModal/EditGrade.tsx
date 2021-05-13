import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Backdrop, Button, Fade, Modal, ThemeProvider } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import 'date-fns'

import styles from './EditGrade.module.css'
import { mainTheme } from '../../theme/customMaterialTheme'
import { Grades } from '../../models'

export interface EditGradeProps {
  quality: string
  initPoints?: number
  initComment?: string
  initDescription?: string
  open: boolean
  handleClose: () => void
  handleOpen: () => void
  onClickSave: (grades: Grades) => void
}

const EditGrade: React.FC<EditGradeProps> = (props) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '70vw',
        },
      },
      nameInput: {
        '&.MuiTextField-root': {
          width: '100px',
          paddingBottom: '2%',
          textAlign: 'center',
        },
      },
      container: {
        textAlign: 'center',
        fontFamily: 'Montserrat',
        backgroundColor: '#1C1C1C',
        border: '1px solid #666666',
      },
      inputs: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: '1px solid #666666',
        paddingTop: '2%',
        paddingRight: '5rem',
        paddingLeft: '5rem',
      },
      header: {
        width: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: '#1a90ff',
        margin: '2% 0',
        width: '120px',
        '&:hover': {
          backgroundColor: '#2272bd',
        },
      },
      buttonAlignment: {
        display: 'flex',
        justifyContent: 'center',
      },
    }),
  )

  const classes = useStyles()

  const [quality, changeQualty] = useState('')
  const [points, changePoints] = useState(props.initPoints ?? 0)
  const [description, changeDescription] = useState(props.initDescription ?? '')
  const [comment, changeComment] = useState(props.initComment ?? '')

  const handlePointsChange = (e: any) => {
    changePoints(+e.target.value)
  }

  const handleCommentChange = (e: any) => {
    changeComment(e.target.value)
  }

  const handleDescriptionChange = (e: any) => {
    changeDescription(e.target.value)
  }

  const handleSaveButtonClick = async () => {
    const grade = {
      [!!quality ? quality : props.quality]: {
        points,
        description,
        comment,
      },
    }

    props.onClickSave(grade)
    props.handleClose()
  }

  useEffect(() => {
    props.handleOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.header}>
              <h3>Edit grade:</h3>
              <TextField
                label={props.quality}
                className={classes.nameInput}
                onChange={(e) => changeQualty(e.target.value)}
                variant="outlined"
                placeholder="Quality"
              ></TextField>
            </div>
            <div className={classes.inputs}>
              <TextField
                label="Points"
                value={points}
                className={classes.nameInput}
                onChange={handlePointsChange}
                variant="outlined"
              ></TextField>
              <TextField
                label="Grade description"
                variant="outlined"
                value={description}
                multiline
                onChange={handleDescriptionChange}
              ></TextField>
              <TextField
                label="Grade comment"
                variant="outlined"
                value={comment}
                multiline
                onChange={handleCommentChange}
              ></TextField>
            </div>
            <div>
              <ThemeProvider theme={mainTheme}>
                <div className={classes.buttonAlignment}>
                  <Button
                    className={classes.button}
                    onClick={handleSaveButtonClick}
                    variant="text"
                    disabled={!points}
                  >
                    SAVE
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default EditGrade
