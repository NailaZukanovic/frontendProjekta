// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import  { Button, Paper, Grid, Typography, Container, Avatar } from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import useStyles from './styles';
// import {fetchUsers, login, signUp} from '../../api/Auth';
// import Input from './Input';

// const initalState = {firstName: '', lastName: '', sex: '', email: '', password: '', confirmPassword: ''};

// const Auth = ({setUser}) =>
// {
//   // const navigate = useNavigate();
//     const classes = useStyles(); //
//     const [userData, setUserData] = useState(initalState); //

//     const [showPassword, setShowPassword] = useState(false); //
//     const [isSignup, setIsSignUp] = useState(false); //

//     const handleChange = (e) => 
//     {
//         setUserData({ ...userData, [e.target.name]: e.target.value });
//     };
//     const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
//     const handleSubmit = (e) => 
//     {
//         e.preventDefault();
//         // navigate('/calendar');

//         setUser(true);
//     };

//     const switchMode = () => {
//       setIsSignUp((prevIsSignUp) => !prevIsSignUp);
//       setShowPassword(false);
//       setUserData(initalState);
//     }

//     return (
//         <Container component="main" maxWidth="xs" className={classes.page}>
//           <Paper className={classes.paper} elevation={3}>
//             <Avatar className={classes.avatar}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
//             <form className={classes.form} onSubmit={handleSubmit}>
//               <Grid container spacing={2}>
//                 { isSignup && (
//                 <>
//                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
//                   <Input name="lastName" label="Last Name" handleChange={handleChange} half />
//                   <Input name="sex" label="Sex" handleChange={handleChange} autoFocus half/>
//                 </>
//                 )}
//                 <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
//                 <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
//                 { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
//               </Grid>
//               <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
// >
//                 { isSignup ? 'Sign Up' : 'Sign In' }
//               </Button>
//               <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Button onClick={switchMode}>
//                 { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default Auth;


// // import React from 'react';
// // import { useForm } from 'react-hook-form';

// // export default function App() {
// //   const { register, handleSubmit, formState: { errors } } = useForm();
// //   const onSubmit = data => console.log(data);
// //   console.log(errors);
  
// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <input type="text" placeholder="First name" {...register("First name", {required: true, max: 20, min: 1, maxLength: 21, pattern: /[a-zA-Z]/i})} />
// //       <input type="text" placeholder="Last name" {...register("Last name", {required: true, max: 1, min: 20, maxLength: 20, pattern: /[a-zA-Z]/i})} />
// //       <input type="text" placeholder="Email" {...register("Email", {required: true, max: 30, min: 1, maxLength: 28, pattern: /^\S+@\S+$/i})} />
// //       <input type="password" placeholder="Password" {...register("Password", {required: true, max: 20, min: 1, maxLength: 28, pattern: /^[A-Za-z]\w{7,14}$/i})} />

// //       <input type="submit" />
// //     </form>
// //   );
// // }