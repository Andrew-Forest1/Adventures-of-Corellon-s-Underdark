import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login-Logout/Login'
import SignUp from './components/Login-Logout/Signup'
import MUISignup from './components/Login-Logout/MUISignup'
import { UserContext, CharacterContext } from './components/context/userContext'
import Characters from './components/Character/Characters';
import EditCharacter from './components/Character/EditCharacter'
import Battle from './components/BattlePage/Battle'
import Menu from './components/Menu'
import EditEnemy from './components/Enemy/EditEnemy';
import Enemies from './components/Enemy/Enemies'
import Dungeons from './components/Dungeon/Dungeons';
import Dungeon from './components/Dungeon/Dungeon';
import ModalMenu from "./components/ModalMenu";
import DnD from './components/DnD'
import EditDungeon from './components/Dungeon/EditDungeon';
import CreateDungeon from './components/Dungeon/CreateDungeon';
import CreateAbility from './components/CreateAbility';
import Shop from './components/Shop/Shop'
import Inventory from './components/Inventory/Inventory';
import SceneEditor from './components/Project 4 Components/components/UserScenes/SceneEditorPage/SceneEditor'
import UserScenes from './components/Project 4 Components/components/UserScenes/SceneBrowser/UserScenes'

function App() {
  const {user, setUser} = useContext(UserContext);
  const {character, setCharacter} = useContext(CharacterContext);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if(res.ok){
        res.json()
        .then((user) => {
          setUser(user)
        })
      }
    })
    }, []);

    useEffect(() => {
      fetch("/selected_character")
      .then((res) => {
        if(res.ok){
          res.json()
          .then((character) => {
            if(character === {}){
              setCharacter(null)
            }else{
              setCharacter(character)
            }
          })
        }
      })
      }, []);

  return (
    <div className="App">
      {user ? 
      <>
        <Menu setMenu={setMenu}/>
        <div className={menu ? "modalBackground" : ""}>
          {menu ? <ModalMenu setMenu={setMenu} setCharacter={setCharacter} setUser={setUser}/> : null}
          <Routes>
            {!character ? <Route path="/characters" element={<Characters/>}/> : 
              <>
                <Route path="/characters" element={<Characters/>}/>
                <Route path="/characters/*" element={<EditCharacter/>}/>
                <Route path="/battle" element={<Battle/>}/>
                <Route path="/enemies" element={<Enemies/>}/>
                <Route path="/enemies/*" element={<EditEnemy/>}/>
                <Route path="/dungeons" element={<Dungeons/>}/>
                <Route path="/dungeons/*" element={<Dungeon/>}/>
                <Route path='/editdungeon/*' element={<EditDungeon/>}/>
                <Route path='/createdungeon' element={<CreateDungeon/>}/>
                <Route path='/createability' element={<CreateAbility/>}/>
                <Route path='/dnd' element={<DnD/>}/>
                <Route path='/shop' element={<Shop/>}/>
                <Route path='/inventory' element={<Inventory/>}/>
                <Route path='/scenes' element={<UserScenes/>}/>
                <Route path='/scenes/*' element={<SceneEditor/>}/>
              </>
            }
          </Routes>
        </div> </> : 
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<MUISignup/>}/>
          <Route path="*" element={<Login/>}/>
        </Routes>
      }
    </div>
  );
}

export default App;
