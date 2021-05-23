import React from 'react';
import '../styles/form.css'
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser.action';
import {getUsers} from '../actions/users.action'
import {connect} from 'react-redux';
import Nav from './Nav';

class Login extends React.Component {
    state = {
        selectedUser: ''
    };
    componentDidMount() {
        console.log('this.props: ',this.props)
		this.props.dispatch(clearAuthedUser())
        this.props.dispatch(getUsers())
	}
    handleChange = function(e) {
        e.preventDefault()
		const selectedUser = e.target.value;
        this.setState({
            selectedUser
          });
	
        this.props.dispatch(setAuthedUser(selectedUser)) 
        /////////////////el mafrod b3d keda awdeeh lel home page //////////////////////
	}

render(){
    const {usersIds,users} = this.props
    return (
        <div>
            <Nav />
        <div className='mm'>
    <h2>Login</h2>
        <p>Please select the user.</p>
    </div>
    <div>
    <select className="form-control" id="userId"
                   onChange={(e) => this.handleChange(e)}>
                       
                     {console.log('usersIds : ',usersIds)}
                <option></option>
                {
                   usersIds.map((userId) => {
                        return <option key={userId} value={userId}>{users[userId].name}</option>
                    })
                }
            </select>
    </div>
    </div>

    )}}
    function mapStateToProps({users}) {
        return {
            usersIds: Object.keys(users),
            users
        }
      }

    export default connect(mapStateToProps)(Login)
 