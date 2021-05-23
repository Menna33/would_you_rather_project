import React from 'react';
import Nav from './Nav';
import DashBoard from './DashBoard';
import NewQuestion from './NewQuestion';
import Login from './Login';
//import Logout from './Logout';
//import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import LeaderBoard from './LeaderBoard';
import {connect} from 'react-redux';
import { Link,Route,Switch,BrowserRouter as Router } from 'react-router-dom';
import { handleInitialData } from '../actions/shared.action'


class APP extends React.Component {
    componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}
render(){
  console.log('this.props: ',this.props)
   const {authedUser}=this.props
    return (
 <div>
<Nav/>
{authedUser===null?<Login/>:
<div>
<Router>
<Switch>
<Route path="/home" render={() =>( <DashBoard/>)} />
<Route path="/leaderboard" render={() =>( <LeaderBoard/>)} />
<Route path="/add" render={() =>( <NewQuestion/>)} />
<Route component={PageNotFound} />
 </Switch>
 </Router>
 </div>
}
 </div>
  )}}
function mapStateToProps(state)
{
  const {authedUser} = state
  console.log('state ',state)
  return {
    authedUser
  }
    
}   
export default connect(mapStateToProps)(APP)