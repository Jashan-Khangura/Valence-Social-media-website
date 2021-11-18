import React, {useState} from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { HandleAuth } from '../../store/actions/action';
import './logout.css';

export default function LogOut() {
const [error, setError] = useState("")
const { logout } = useAuth()
const history = useHistory()
const dispatch = useDispatch()

async function handleLogout() {
  setError('')

  try {
      await logout()
      localStorage.clear()
      dispatch(HandleAuth(''))
      history.push('/')
  }

  catch {
      setError('Failed to log out')
  }
}

return (
    <div>
        {error && <Alert variant="danger">{error}</Alert>}
        <p
       id="logoutStyle" 
    onClick={handleLogout} 
    >Log Out</p>
    </div>
)

}