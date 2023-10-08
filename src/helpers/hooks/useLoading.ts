// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface LoadingContextInterface {
// 	isLoading: boolean;
// 	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const LoadingContext = createContext<boolean>(false);

// export const useLoading = (): LoadingContextInterface => {
// 	const context = useContext(LoadingContext);

// 	if (!context) {
// 		throw new Error('useLoading must be used within a LoadingProvider');
// 	}

// 	return context;
// };

// interface LoadingProviderProps {
// 	children?: ReactNode;
// }

// export const LoadingProvider: React.FC<LoadingProviderProps> = ({
// 	children,
// }) => {
// 	const [isLoading, setIsLoading] = useState(false);

// 	return (
// 		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
// 			{children}
// 		</LoadingContext.Provider>
// 	);
// };
