import React, { useState,useEffect}from 'react'
import "./app.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Todos from '../todo_modal/TodoModal';
import Home from '../home/Home';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../loader/Loader';
import Profile from '../profile/Profile';
function App() {
   const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  

    const logout = async () => {
      try {
      setLoading(true)
      const logout = await fetch("https://todask.herokuapp.com/logout", {
        credentials: 'include'
      })
      let result = await logout.json()
      console.log(result);
        if (result["status"] === "logged out") {
          setUser({})
          setLoading(false)
        }
        
        // setLoggedOut(true)
    }
    catch (e) {
          console.log(e);

        }
  
    }
  
  
  async function signInWithGoogle() {
     setLoading(true)
    const url = "https://todask.herokuapp.com/login/google"
            const win =    window.open(url, "_blank", 'width=500,height=600,status=0,toolbar=0')

  
    
          var timer = setInterval(function() {   
            if (win.closed) {
       fetchUser()
      clearInterval(timer);
      setLoading(false)
    }  
}, 1000); 
      

    }


  
  const fetchUser = async () => {
    try {
      const user = await fetch("https://todask.herokuapp.com/user", {
  credentials: 'include'
})
      let result = await user.json()
      setUser(result)
    }
    catch (e) {
      console.log(e);
    }
  }


  useEffect(async () => {
    await fetchUser()
    setLoading(false)
    
  }, [])


  return (
   <Router>
      <div>
      
        {
          !loading ?
            (
              <div>
                <Header {...user} logout={logout} signInWithGoogle={ signInWithGoogle }/>
                <Home googleId={user.googleId} />
              <Footer/>
                
                </div>
            )
             : (
              <div>
                <Header {...user}/>
              <Loader />
              <Footer/>
              </div>)
        }

        

        <Switch>
        
          <Route path="/profile">
            <Profile/>
          </Route>
        </Switch>
      </div>
        <Footer/>
    </Router>
  )
}

export default App
