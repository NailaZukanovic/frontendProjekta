// import React, { useEffect, useState } from 'react';
// import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend';
// import 'kalend/dist/styles/index.css';
// import { OnEventClickData } from 'kalend';
// import toast, { Toaster } from 'react-hot-toast';

// const onNewEventClick = (data) => {
//   console.log(data)
// };

// const onShowMoreMonthClick = (data) => {
//   console.log(data)
// };

// const events = [
//     {'01-11-2021' : 
//         {
//         id: 1,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//       },
//     {'21-11-2021': 
//         {
//         id: 2,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//       }
//   ]

// const CalendarComponent = () => {
//   const notify = (podatak) => toast(podatak, {
//     icon: '✈️',
//   });
//   const [demoEvents, setDemoEvents] = useState(events);


//   const onEventClick = (OnEventClickData) => {
//     notify(OnEventClickData)
//   };

//   // const onEventDragFinish = (
//   //   CalendarEvent,
//   //   events
//   // ) => {
//   // };

//   return (
//       <Kalend
//         // onNewEventClick={onNewEventClick}
//         initialView={CalendarView.WEEK}
//         // disabledViews={[]}
//         // onEventClick={onEventClick}
//         events={demoEvents}
//         initialDate={new Date().toISOString()}
//         hourHeight={60}
//         // showMoreMonth={onShowMoreMonthClick}
//         timezone={'Europe/Berlin'}
//         // onEventDragFinish={onEventDragFinish}
//       />
//   );
// };

// export default CalendarComponent;


import React, { useEffect, useState } from 'react';
import { Scheduler } from "@aldabil/react-scheduler";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { act } from '@testing-library/react';
import { NewReleasesTwoTone } from '@material-ui/icons';
import {parseISO} from 'date-fns';

export default function CalendarComponent({currentUser}) {

  const navigate = useNavigate();
  const notify = () => toast("Don't you worry, don't you worry, child \n See heaven's got a plan for you", {
    icon: '✈️',
  });

  const [events,setEvents] = useState([]);

  useEffect(() => {
    notify();
    axios.get('http://localhost:4000/event',  {
      headers: {
          'Authorization': 'Bearer ' + currentUser.token.access_token
      }
  })
      // .then(res => res.json())
      .then(data => {
        data.data.events.forEach(eve => {
          eve.start = parseISO(eve.start); 
          eve.end = parseISO(eve.end);        
        });
        setEvents(prevEvents => {
          return [...prevEvents,...data.data.events];
        });
      });
    
  }, []);

  console.log(events);

  const onConfirm = async (event,action) => {
    // console.log(action);
    if (action === "edit")
    {
      axios.patch(`http://localhost:4000/event/${event._id}`, event,  {
        headers: {
            'Authorization': 'Bearer ' + currentUser.token.access_token
        }
    });
      console.log(event);
    }
    else
    {
      var rex = axios.post('http://localhost:4000/event/', event,  {
        headers: {
            'Authorization': 'Bearer ' + currentUser.token.access_token
        }
    });

    }
    return new Promise((res,rej) => {res(event)})
  };

  const getId = (id) => {
    console.log(id);
  }

  return ( <>
    <Toaster
    position="top-center"
    reverseOrder={false}
  />
    <Scheduler
      onConfirm={onConfirm}
      view="week"
      events={events}
      selectedDate={new Date()}
      />
    </>
  );
}

// import React from 'react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Eventcalendar, getJson, toast } from '@mobiscroll/react';

// function CalendarComponent() {

//     const [myEvents, setEvents] = React.useState([]);

//     React.useEffect(() => {
//         getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
//             setEvents(events);
//         }, 'jsonp');
//     }, []);
    
//     const onEventClick = React.useCallback((event) => {
//         toast({
//             message: event.event.title
//         });
//     }, []);
    
//     const view = React.useMemo(() => {
//         return {
//             schedule: { type: 'week' }
//         };
//     }, []);

//     return (
//         <Eventcalendar
//             theme="ios" 
//             themeVariant="light"
//             clickToCreate={true}
//             dragToCreate={true}
//             dragToMove={true}
//             dragToResize={true}
//             data={myEvents}
//             view={view}
//             onEventClick={onEventClick}
//        />
//     ); 
// }

// export default CalendarComponent;

// import React, { useEffect, useState } from 'react';
// import { DateTime } from 'luxon';
// import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
// import 'kalend/dist/styles/index.css';
// // import faker from 'faker';
// import { v4 } from 'uuid';

// const colors = [
//   'indigo',
//   'blue',
//   'orange',
//   'red',
//   'pink',
//   'crimson',
//   'dodgerblue',
//   'brown',
//   'purple',
//   'tomato',
//   'MediumPurple',
//   'salmon',
// ];

// const generateDemoEvents = (
//   date= DateTime.now(),
//   count = 190
// ) => {
//   const events = [];

//   const monthStart = date
//     .set({ day: 1 })
//     .minus({ days: 14 })
//     .toFormat('yyyy-MM-dd');
//   const monthEnd = date
//     .set({ day: 28 })
//     .plus({ days: 14 })
//     .toFormat('yyyy-MM-dd');

//   for (let i = 1; i < count; i += 1) {
//     const dateStart = faker.date.between(monthStart, monthEnd);

//     const hour = Math.floor(Math.random() * 23) + 1;
//     const minute = Math.floor(Math.random() * 40) + 1;
//     const minuteDuration = Math.floor(Math.random() * 120) + 30;

//     const startDate = DateTime.fromJSDate(dateStart).set({
//       hour: hour,
//       minute: minute,
//     });
//     const endDate = startDate.plus({ minute: minuteDuration });

//     const event = {
//       id: v4(),
//       startAt: startDate.toUTC().toString(),
//       endAt: endDate.toUTC().toString(),
//       summary: faker.commerce.department(),
//       color: colors[Math.floor(Math.random() * colors.length - 1) + 1],
//       allDay: endDate.day !== startDate.day,
//     };

//     events.push(event);
//   }

//   return events;
// };

// const CalendarComponent = () => {
//   const [demoEvents, setDemoEvents] = useState([
//     {'01-11-2021' : 
//         {
//         id: 1,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//       },
//     {'21-11-2021': 
//         {
//         id: 2,
//         startAt: '2021-11-21T18:00:00.000Z',
//         endAt: '2021-11-21T19:00:00.000Z',
//         summary: 'test',
//         color: 'blue',
//         }
//       }
//   ]
// );

//   // Create and load demo events
//   useEffect(() => {
//     // setDemoEvents(generateDemoEvents(DateTime.now(), 80));
//     console.log('nesto');
//   }, []);

//   const onNewEventClick = (data) => {
//     const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
//       hour: data.hour,
//       day: data.day,
//       event: 'click event ',
//     })}`;
//     console.log(msg);
//   };

//   // Callback for event click
//   const onEventClick = (data) => {
//     const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
//       data
//     )}`;
//     console.log(msg);
//   };

//   // Callback after dragging is finished
//   const onEventDragFinish = (
//     prev,
//     current,
//     data
//   ) => {
//     setDemoEvents(data);
//   };

//   return (
//     <Kalend
//       onNewEventClick={onNewEventClick}
//       initialView={CalendarView.MONTH}
//       disabledViews={[]}
//       onEventClick={onEventClick}
//       events={demoEvents}
//       initialDate={new Date().toISOString()}
//       hourHeight={60}
//       timezone={'Europe/Berlin'}
//       onEventDragFinish={onEventDragFinish}
//       disableMobileDropdown={true}
//     />
//   );
// };

// export default CalendarComponent;