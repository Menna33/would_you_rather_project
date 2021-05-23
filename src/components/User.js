import React from 'react';
import {connect} from 'react-redux';
import '../styles/user.css'

class User extends React.Component {
   
render(){
  //const {userImg,userName,answeredSum,askedSum,score}=this.props
  const {user}=this.props
    return (
 
<div className="user-box">
<img className="user-img" src={user ?user.avatarURL :''} alt={user ?user.avatarURL :''}/> 
<div className="user-info" > <b> {user.name} <br> Number of Questions Answered: ${Object.keys(user.answers).length}
<br> Number of Questions Added : ${user.questions.length} <br> </div>

</div>
  )}}



export default User