import React from 'react';
import { useAppContext } from '../../context/AppContext';
import style from './Login.module.scss';
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
function Login() {
	const { darkMode } = useAppContext();

	return (
		<div
			className={[
				darkMode ? 'DarkWrapper' : 'LightWrapper',
				style.LoginWrapper,
			].join(' ')}>
			<div className={style.ContainerColumn}>

				<div

					className={[style.LoginForm, darkMode ? `${style.WhiteBorder} DarkBg` : 'LightBg'].join(
						' ',
					)}>
					<Typography variant="h6">Login Please</Typography>

					<div className={style.FormWrapper}>
						<Input
							variant="standard"
							label="Email"
							placeholder="Enter your email "
							labelProps={{ className: 'text-lg' }}
						/>
						<Input
							variant="standard"
							label="Password"
							placeholder="Enter your password "
							labelProps={{ className: 'text-lg' }}
						/>
						<div className={["flex items-center justify-center md:flex-row sm:flex-col"].join(" ")}>
							<Link>Forgot Password?</Link>
						</div>
						<Button variant="gradient">Login</Button>
						<div className={["flex items-center justify-center text-lg", style.registerLink].join(" ")}>
							<Link to="/app/register">Click here to register</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={style.ContainerColumn}>
				<div className='flex items-center justify-center w-full flex-col gap-[0.5em] text-white'>
					<Typography variant='h4'>WELCOME!</Typography>
					<span>Enter your details and start chatting</span>
					<Link to="/app/register" className='text-lg'>Click to Register</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
