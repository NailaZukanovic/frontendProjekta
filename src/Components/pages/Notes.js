import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

// import {Spinner, Box} from 'grommet';
import { WindMillLoading } from 'react-loadingg';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

import Slide from '@mui/material/Slide';

// import { Draggable } from 'react-drag-reorder';
import {
  Container,
  makeStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import NoteCard from './component_note/NoteCard.js';
import Update from './Update';

const axios = require('axios');

const useStyles = makeStyles({
    page: 
    {
      background: '#f9f9f9',
      width: '100%',
      padding:20 
    },
    
    field: {
      marginTop: 20,
      marginBotton: 20,
      display: 'block'
    }

    
});
  


export default function Notes({currentUser}) {


    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idUpdate, setIdUpdate] = useState(0);

     //     set search query to empty string
     const [q, setQ] = useState("");
     //     set search parameters
     //     we only what to search countries by capital and name
     //     this list can be longer if you want
     //     you can search countries even by their population
     // just add it to this array
     const [searchParam] = useState(["category"]);

     const handleOpen = () => setOpen(true);
     const handleClose = () => {
      setOpen(false);
     }

     const search = (items) => {
      return items.filter((item) => {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
              );
          });
      });
    }

    const cancelSearch = () => {
      setQ("");
    };
  
    useEffect(() => {
      axios.get('http://localhost:4000/notes', {
        headers: {
            'Authorization': 'Bearer ' + currentUser.token.access_token
        }
    })
        // .then(res => res.json())
        .then(data => 
          { setNotes(prevNotes => {
            return [...prevNotes,...data.data.notes]
          });
              console.log(data); 
              if(notes.length)
                setLoading(false);
          }
        )
    }, [])
  
    const notify = () => toast.success("🦄 Uspesno!", {
      theme: "colored"
    })

    const handleDelete = async (_id) => {

      notify();
      console.log(_id);

      await fetch('http://localhost:4000/notes/' + _id, {
        method: 'DELETE',
          headers: {
              'Authorization': 'Bearer ' + currentUser.token.access_token
          }
      }).then(res => console.log(res)).catch(err => console.log(err));

      console.log(notes);

      const newNotes = notes.filter(note => note._id != _id)
      setNotes(newNotes)
    }

    const handleUpdate = (note) => 
    {
      handleOpen();
      setIdUpdate(note._id);
      notify();
      
    }

//xs={12}  lg={4}
    return(
      
      <Container className={classes.page}>
          <ToastContainer />

            <TextField
              variant="standard"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search category…          "
              sx={{
                width: {
                  xs: 1,
                  sm: 'auto',
                  lg: 'auto'
                },
                m: (theme) => theme.spacing(1, 0.5, 1.5),
                '& .MuiSvgIcon-root': {
                  mr: 0.5,
                },
                '& .MuiInput-underline:before': {
                  borderBottom: 1,
                  borderColor: 'divider',
                },
              }}
            ></TextField>

        
        <Grid container spacing={3}>
          {search(notes).map(note => (
            <Grid key={note._id} item xs={12} md={6} lg={4}>
              <NoteCard note={note} handleDelete={() => handleDelete(note._id)} 
                handleUpdate={() => handleUpdate(note)}
              />
            </Grid>
          ))}
          <Grid cointainer>{loading &&  < WindMillLoading/>}</Grid>
        </Grid>



          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
              <Update id={idUpdate} handleClose={handleClose} currentUser={currentUser}/>
          </Modal>  

      </Container>
    )
}