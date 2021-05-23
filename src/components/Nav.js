import React from 'react';
import {NavLink, BrowserRouter as Router,Link} from 'react-router-dom';
import { Navbar} from 'react-bootstrap'
import { connect } from 'react-redux'
import {clearAuthedUser } from '../actions/authedUser.action';
import '../styles/navbar.css'

class Nav extends React.Component {
   handleLogout=function()
       {
        this.props.dispatch(clearAuthedUser())
       }
render(){
       const { user, authedUser } = this.props
       console.log('authedUser : ',authedUser)
       
    return (
       <Router>
       {authedUser ? (
           
<Navbar bg="primary" variant="dark">
<ul className="navbar">
             <NavLink to='/home' exact activeClassName='active'
                    className="nav-link">DashBoard</NavLink>
             <NavLink to='/add' exact activeClassName='active'
                    className="nav-link">New Question</NavLink>
              <NavLink to='/leaderboard' exact activeClassName='active'
                     className="nav-link">Leaderboard</NavLink>
              <li className="user-nav">
              <img src={user ?user.avatarURL :''} className="nav-img"/>  {/* el sora msh matloba mmkn ashelha lo masht8ltsh*/ }
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