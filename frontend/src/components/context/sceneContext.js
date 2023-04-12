import { useState, useEffect, createContext } from "react";

const SceneContext = createContext()

const SceneProvider = ({children}) => {
    const [scene, setScene] = useState(null);
    
    return (
        <SceneContext.Provider value={{scene, setScene}}>
            {children}
        </SceneContext.Provider>
    )
}
export { SceneContext, SceneProvider}