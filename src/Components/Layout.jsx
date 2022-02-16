import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useNavigate, useLocation} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, Bookmark, Bookmarks, SubjectOutlined } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar'
import EventNoteIcon from '@mui/icons-material/EventNote';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useContext } from 'react'
import AuthContext from './user/AuthContext'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
  }
})

export default function Layout({ children, currentUser}) {
  const {user, login, logout, token} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [identity, setIdentity] = useState(null);

  const menuItems = [
      { 
        text: 'My Notes', 
        icon: <SubjectOutlined color="secondary" />, 
        path: '/notes' 
      },
      { 
        text: 'Create Note', 
        icon: <AddCircleOutlineOutlined color="secondary" />, 
        path: '/create' 
      },
      { 
        text: 'Calendar', 
        icon: <EventNoteIcon color="secondary" />, 
        path: '/calendar' 
      },
      {
        text: 'News',
        icon: <NewspaperIcon color="secondary" />,
        path:'/news'
      },
      {
        text: 'Game',
        icon: <TravelExploreIcon color="secondary" />,
        path:'/'
      },
      {
        text: 'Star Wars',
        icon: <NightsStayIcon color="secondary" />,
        path:'/starwars'
      },
      {
        text: 'Pizza Hunt',
        icon: <LocalPizzaIcon color="secondary" />,
        path:'/home'
      },
      {
        text: 'Book List',
        icon: <Bookmarks color="secondary" />,
        path:'/books'
      }
    ];


  return (
    <div className={classes.root}>
      {/* app bar */}

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Nayer
          </Typography>
        </div>

        {/* links/list section */}

        <List className="okvir">
          {menuItems.map((item) => (
            <ListItem
              key={item.text} 
              button
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
           
          ))}
         { currentUser ? <ListItem
            key={'Logout'}
            button
            onClick={() => logout()}
            className={classes.active}>
            <ListItemText primary={'LogOut'} />
          </ListItem>
          :
          <ListItem
            key={'Login/SignUp'}
            button
            onClick={() => login()}
            className={classes.active}>
            <ListItemText primary={'Login/SignUp'} />
          </ListItem> }
        </List>
      </Drawer>
      {/* main content */}
      <div className={classes.page}>
        { children }
      </div>
    </div>
  )
}
