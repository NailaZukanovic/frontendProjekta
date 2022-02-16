import React, { useState } from 'react';
import NavBar from './NavBar';
import People from './People';
import Planets from './Planets'
import './StarWars.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import {ReactQueryDevtools} from 'react-query-devtools';

const StarWars = () => {
    const [page, setPage] = useState('planets');

    // const queryClient = new QueryClient();

    return (
    // <QueryClientProvider client={queryClient}>
       <div className="App">
      <h1>Star Wars Info</h1>
        <NavBar setPage={setPage} />
        <div className="content">
          { page === 'planets' ? <Planets /> : <People /> }
        </div>
      </div>
      /* <ReactQueryDevtools initialIsOpen={false} /> */
    // </QueryClientProvider>


    )


}


export default StarWars;