import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { Avatar, makeStyles } from '@material-ui/core'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { green, yellow } from '@material-ui/core/colors'
import { blue, pink } from '@mui/material/colors'

// Money to Dos Reminders Work
const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category === 'work') {
        return '1px solid yellow'
      }

      if (note.category === 'money') {
        return '1px solid green'
      }

      if (note.category === 'reminders') {
        return '1px solid pink'
      }
      
      if (note.category === 'todos') {
        return '1px solid blue'
      }      
    }
  },

  avatar: {
    backgroundColor: (note) => {
      if(note.category === 'work')
      {
        return yellow[700]
      }
      if(note.category === 'money')
      {
        return green[500]
      }
      if(note.category === 'reminders')
      {
        return pink[500]
      }
      if(note.category === 'todos')
      {
        return blue[500]
      }
    }
  }
})

export default function NoteCard({ note, handleDelete, handleUpdate }) {
  const classes = useStyles(note)

  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
          <div>
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
            <IconButton onClick={() => handleUpdate(note.id)}>
              <UpgradeIcon />
            </IconButton>
          </div>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { note.details }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}


