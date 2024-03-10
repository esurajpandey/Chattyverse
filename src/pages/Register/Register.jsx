import React from 'react';
import { useAppContext } from '../../context/AppContext';
import style from './Register.module.scss';
import { Link } from 'react-router-dom';
import { Button, Input, Typography } from '@material-tailwind/react';
import LoginStyle from '../Login/Login.module.scss';

function Login() {
	const { darkMode } = useAppContext();

	return (
		<div
			className={[
				darkMode ? 'DarkWrapper' : 'LightWrapper',
				style.RegisterWrapper,
			].join(' ')}>
        <div className={style.RegisterFormContainer}>
           <div className={[style.RegisterForm,darkMode ? `WhiteBorder DarkBg` : 'LightBg'].join(' ')}> 
              <Typography variant="h6">Register Please</Typography>
              <div className={style.FormWrapper}>
                  <Input
                    variant="standard"
                    label="Email"
                    name='email'
                    placeholder="Enter your email "
                    labelProps={{ className: 'text-lg' }}
                    type='email'
                  />
                  <Input
                    variant="standard"
                    label="Name"
                    name='name'
                    type='text'
                    placeholder="Enter your name "
                    labelProps={{ className: 'text-lg' }}
                  />
                  <Input
                    variant="standard"
                    label="Phone Number"
                    type='tel'
                    name='phone'
                    placeholder="Enter your phone "
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    labelProps={{ className: 'text-lg' }}
                  />
                  <Input
                    variant="standard"
                    label="Password"
                    type='password'
                    name='password'
                    placeholder="Enter your password "
                    labelProps={{ className: 'text-lg' }}
                  />
                  <Button variant="gradient">Login</Button>
                  <div className={["flex items-center justify-center text-lg"].join(" ")}>
                    <Link to="/app/login">Go to login page</Link>
                  </div>
              </div>
           </div>
        </div>
		</div>
	);
}

export default Login;
