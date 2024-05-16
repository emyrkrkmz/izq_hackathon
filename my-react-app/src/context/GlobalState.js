import { createContext, useState } from "react";

export const GlobalContext = createContext();;

export const GlobalProvider = (props) => {

	const [selected, setSelected] = useState(" ");
	const [result, setResult] = useState(null);
	const [data_isready, data_isready_set] = useState(0);

	return (
		<GlobalContext.Provider 
			value={{
				 selected: selected,
				 setSelected: setSelected,
				 result:result,
				 setResult:setResult,
				 data_isready:data_isready,
				 data_isready_set:data_isready_set
				 }}>
			{props.children}


		</GlobalContext.Provider>
	);
 }