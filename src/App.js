import React, {useState, useEffect} from 'react';

import {
  BrowserRouter,
  Route,
  useNavigate,
  Navigate,
  Routes
} from 'react-router-dom';

import {
  createTheme,
  makeStyles,
  ThemeProvider} from '@material-ui/core';
import { purple } from '@mui/material/colors';
import NewsContainer from './Components/NewsContainer';
import Auth from './Components/auth/Auth';
import Calendar from './Components/Calendar';
import Layout from './Components/Layout';
import Create from './Components/pages/Create';
import Notes from './Components/pages/Notes';
import Game from './Components/Game';
import AuthContext, { AuthContextProvider } from './Components/user/AuthContext';
import PageNotFound from './Components/PageNotFound';
import { useContext } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import StarWars from './Components/StarWars/StarWars';
import Base from './Components/pizzaHunt/Base';
import Toppings from './Components/pizzaHunt/Toppings';
import Order from './Components/pizzaHunt/Order';
import Home from './Components/pizzaHunt/Home';
import BookList from './Components/bookiList/BookList';
import NewBookForm from './Components/bookiList/NewBookForm';
import BookContextProvider from './Components/bookiList/context/BookContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple,
    pink: '#FFC0CB'
  },

  typography: {
    fontFamily: 'Quicksand',

    fontWightLight: 400,

    fontWightRegular: 500,

    fontWightMedium: 600,

    fontWightBold: 700
  },
});


const useStyles = makeStyles({
  page: 
  {
    background: '#f9f9f9',
    width: '100%' 
  },
  
  field: {
    marginTop: 20,
    marginBotton: 20,
    display: 'block'
  }
});



const App = () => {
  const [pizza, setPizza] = useState({ base: "", toppings: [] });
  const [showModal, setShowModal] = useState(false);

  const addBase = (base) => {
    setPizza({ ...pizza, base })
  }
  
  const addTopping = (topping) => {
    let newToppings;
    if(!pizza.toppings.includes(topping)){
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter(item => item !== topping);
    }
    setPizza({ ...pizza, toppings: newToppings });
  }

  const classes = useStyles();

  
  const currentUser = netlifyIdentity.currentUser();

  netlifyIdentity.init();


  console.log(currentUser, 'current User');

    return (
    <AuthContextProvider>
     <ThemeProvider theme={theme} >
        <BrowserRouter>
        <Layout currentUser={currentUser}>
          <Routes>
                    <Route path="/Create" element={currentUser ? <Create currentUser={currentUser}/> :  <Navigate to='/' /> }/>
                    <Route path="/Notes" element={currentUser ? <Notes currentUser={currentUser}/> : <Navigate to="/" /> }/>
                    <Route path="/Calendar" element={currentUser ? <Calendar currentUser={currentUser}/> : <Navigate to="/" />}/>
                    <Route path="/news" element={<NewsContainer />}/>
                    <Route path="/" exact element={<Game/>}/>
                    <Route path="/starwars" element={<StarWars />} />
                    <Route path="/base" element={
                      <Base addBase={addBase} pizza={pizza} showModal={showModal} /> } />
                    <Route path="/toppings" element={
                     <Toppings addTopping={addTopping} pizza={pizza} showModal={showModal} /> } />
                    <Route path="/order" element={
                      <Order pizza={pizza} setShowModal={setShowModal} showModal={showModal} />} />
                    <Route path="/Home" element={
                      <Home  showModal={showModal}/> } />
                    <Route path="/books" element={<BookContextProvider><div style={{ background: '#4c2a4c',
  margin: '20px auto',
  width: '90%',
  maxWidth: '700px',
  color: '#eee'}}><BookList /><NewBookForm /></div></BookContextProvider>} />
                    <Route path="*" element={<PageNotFound/>} />
                     
          </Routes>
        </Layout>
        </BrowserRouter>
      
      </ThemeProvider>   
    </AuthContextProvider>
  )
}

export default App;