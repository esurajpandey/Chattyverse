import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function useAppContext() {
	return useContext(AppContext);
}

const AppProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDarkMode = () => {
		setDarkMode(prev => !prev);
	};
	const setLoading = () => {
		setIsLoading(prev => !prev);
	};

	return (
		<AppContext.Provider
			value={{
				darkMode,
				handleDarkMode,
				isLoading,
				setLoading,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
