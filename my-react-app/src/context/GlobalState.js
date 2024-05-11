import { createContext, useState } from "react";

export const GlobalContext = createContext();;

export const GlobalProvider = (props) => {

	const [selected, setSelected] = useState(" ");
	const [result, setResult] = useState(" ");

	return (
		<GlobalContext.Provider 
			value={{
				 selected: selected,
				 setSelected: setSelected,
				 result:result,
				 setResult:setResult
				 }}>
			{props.children}


		</GlobalContext.Provider>
	);
 }