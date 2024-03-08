import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AppProvider>
					<App />
				</AppProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
