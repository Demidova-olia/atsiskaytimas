import './App.css'
import { Link } from 'react-router'

function App() {

  return (
    <>
    <div className="app-container">
    <h1>You want? Oreder!</h1>
    <div className="app-links">
      <Link to="/orders">Orders</Link>
      <Link to="/designers">Designers</Link>
      <Link to="/collections">Collections</Link>
    </div>
  </div>
  </>
  )
}

export default App
