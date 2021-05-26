import React from 'react';
import {connect} from 'react-redux';
import '../styles/user.css'

class User extends React.Component {
   
render(){
  //const {userImg,userName,answeredSum,askedSum,score}=this.props
  const {user,users}=this.props
  console.log('user : ',user)
  console.log('users[user.userId] : ',users[user.userId])
    return (
 
<div className="user-box">
  <h1> {users[user.userId].name} </h1>
<img className="user-img"  src={users[user.userId] ?users[user.userId].avatarURL :''} alt={users[user.userId] ?users[user.userId].avatarURL :''}/> 
<div className="user-info" > 
<p> Score: {user.score} </p>
<p> Number of Questions Answered: {Object.keys(users[user.userId].answers).length} </p>
<p> Number of Questions Added : {users[user.userId].questions.length} </p> </div>

</div>
  )}}



export default User