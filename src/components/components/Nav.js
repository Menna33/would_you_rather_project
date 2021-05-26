import React from 'react';
import {NavLink, BrowserRouter as Router,Link} from 'react-router-dom';
import { Navbar} from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser.action';
import { connect } from 'react-redux'
import '../styles/navbar.css'

class Nav extends React.Component {
   handleLogout=()=>
       {
        this.props.dispatch(setAuthedUser("LoggedOut"))
       }
render(){
       const { user, authedUser } = this.props
       console.log('authedUser : ',authedUser)
       
    return (
       <Router>
       {authedUser ? (
           
<Navbar bg="primary" variant="dark">
<ul className="navbar">
             <NavLink to='/home'  activeClassName='active'
                    className="nav-link">DashBoard</NavLink>
             <NavLink to='/add'  activeClassName='active'
                    className="nav-link">New Question</NavLink>
              <NavLink to='/leaderboard'  activeClassName='active'
                     className="nav-link">Leaderboard</NavLink>
              <li className="user-nav">   
              <img src={user ?`/${user.avatarURL}` :''} className="nav-img"/>  {/* el sora msh matloba mmkn ashelha lo masht8ltsh*/ }
              <span>{user ? user.name : 'signedOut'}</span>
                <button type="button" onClick={this.handleLogout}>Log Out</button> </li>     
        </ul>
        
  </Navbar>
  ):(<ul className="navbar">
           <NavLink to='/login' exact activeClassName='active'
                    className="nav-link">LogIn</NavLink>
  
</ul>
)}
  </Router>)}}
function mapStateToProps(state) 
{
  const { users, authedUser } = state
  const user = users[authedUser]
  return {
    user,
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)