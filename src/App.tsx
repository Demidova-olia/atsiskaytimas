import './App.css'
import { Link } from 'react-router'

function App() {

  return (
    <>
    <div className="app-container">
    <h1>You want? Order!</h1>
    <div className="app-links">
      <div>
        <Link to="/orders">
          <img src="../public/orders (2).jpg" alt="" />
          <h3>Orders</h3> 
        </Link>
      </div>
      <div>
        <Link to="/designers">
          <img src="../public/designers.jpg" alt="" />
          <h3>Designers</h3> 
        </Link>
      
      </div>
      <div>
        <Link to="/collections">
          <img src="../public/collections.jpg" alt=''/>
          <h3>Collections</h3>
        </Link>
      </div>
    </div>
  </div>
  </>
  )
}

export default App
