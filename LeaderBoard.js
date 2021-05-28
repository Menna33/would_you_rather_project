import React from 'react';
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends React.Component {
   

render(){ 
    console.log('this.props  dkdkk : ' ,this.props)
    const {users_scores,users} = this.props 
    console.log('users_scores : ',users_scores)
    const sortedUsers = users_scores.sort( (a, b) => b.score - a.score)
    console.log('sortedUsers : ',sortedUsers) 
    return (
<div>
{sortedUsers.map(user => <User key={user.userId} user={user} users={users}/>)}
</div>
    )}}





function mapStateToProps({users}) {
        return {
            users_scores:Object.keys(users).map( (userId) => 
            ({
                userId,
                score:Object.keys(users[userId].answers).length + users[userId].questions.length
            })  ),
            users
        }
      }

export default connect(mapStateToProps)(LeaderBoard)