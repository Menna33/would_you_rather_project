import React from 'react';
import {NavLink} from 'react-router-dom';
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
       <div>
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
              <img  src={user ? user.avatarURL :''} alt={user? user.name :''} className="nav-img"/> 
              <span>{user ? user.name : 'signedOut'}</span>
                <button type="button" onClick={this.handleLogout}>Log Out</button> </li>     
        </ul>
        
  </Navbar>
  ):(<ul className="navbar">
           <NavLink to='/login' exact activeClassName='active'
                    className="nav-link">LogIn</NavLink>
  
</ul>
)}
  </div>)}}
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