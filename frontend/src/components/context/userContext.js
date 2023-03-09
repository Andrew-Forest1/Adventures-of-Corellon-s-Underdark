import { useState, useEffect, createContext } from "react";

const UserContext = createContext()
const CharacterContext = createContext()
const EnemyContext = createContext()
const DungeonContext = createContext()
const DungeonEnemyContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const CharacterProvider = ({children}) => {
    const [character, setCharacter] = useState(null);
    
    return (
        <CharacterContext.Provider value={{character, setCharacter}}>
            {children}
        </CharacterContext.Provider>
    )
}

const EnemyProvider = ({children}) => {
    const [enemy, setEnemy] = useState(null);
    
    return (
        <EnemyContext.Provider value={{enemy, setEnemy}}>
            {children}
        </EnemyContext.Provider>
    )
}

const DungeonProvider = ({children}) => {
    const [dungeon, setDungeon] = useState(null);
    
    return (
        <DungeonContext.Provider value={{dungeon, setDungeon}}>
            {children}
        </DungeonContext.Provider>
    )
}

const DungeonEnemyProvider = ({children}) => {
    const [dungeonEnemy, setDungeonEnemy] = useState(null);
    
    return (
        <DungeonEnemyContext.Provider value={{dungeonEnemy, setDungeonEnemy}}>
            {children}
        </DungeonEnemyContext.Provider>
    )
}

export { UserContext, UserProvider,  CharacterContext, CharacterProvider, EnemyContext, EnemyProvider, DungeonContext, DungeonProvider, DungeonEnemyContext, DungeonEnemyProvider}