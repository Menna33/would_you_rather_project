import React from 'react';
import { connect } from 'react-redux'

class LeaderBoard extends React.Component {
   

render(){ 
    console.log('this.props  dkdkk : ' ,this.props)
    const {usersIds,users} = this.props 
    const users_scores=usersIds.map( (userId) => userId.score = Object.keys(userId.answers).length + userId.questions.length )
    console.log('users_scores : ',users_scores)
    const sortedUsers = users_scores.sort( (a, b) => b.totalScore - a.totalScore) 
    return (

<div></div>
    )}}





function mapStateToProps({users}) {
        return {
            usersIds: Object.keys(users),
            users
        }
      }

export default connect(mapStateToProps)(LeaderBoard)