import { useState, useEffect, createContext } from "react";

const DragContext = createContext()

const DragProvider = ({children}) => {
    const [drag, setDrag] = useState(null);
    
    return (
        <DragContext.Provider value={{drag, setDrag}}>
            {children}
        </DragContext.Provider>
    )
}
export { DragContext, DragProvider}