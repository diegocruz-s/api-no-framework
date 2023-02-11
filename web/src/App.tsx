import styles from './App.module.css'
import { useContext, useState } from 'react'
import { Auth } from './pages/Auth/Auth'
import { AuthContext } from './context/user'
import { TileContext } from './context/tile'
import { Home } from './pages/Home/Home'

function App() {
  const [formLogin, setFormLogin] = useState<boolean>(true)
  const { abc, user, auth } = useContext(AuthContext)!

  console.log('auth:', auth)
  return (
    <div className={styles.App}>

      {auth ? (
        <>
          <Home />
          
        </>
      ) : (
        <div className={styles.contentForm}>

          <div className={styles.optionsForm}>
            <button 
              onClick={() => setFormLogin(true)}
              style={formLogin ? { color: '#fff', borderBottomColor: '#fff' } : {}}
            > 
              Login
            </button>

            <button 
              onClick={() => setFormLogin(false)}
              style={!formLogin ? { color: '#fff', borderBottomColor: '#fff' } : {}}
            >
              Register
            </button>
          </div>
          
          <Auth formLogin={formLogin} />
        </div>
      )}

    </div>
  )
}

export default App
