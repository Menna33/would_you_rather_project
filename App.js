import React from 'react';
import Nav from './Nav';
import DashBoard from './DashBoard';
import NewQuestion from './NewQuestion';
import QuestionInfo from './QuestionInfo';
import Login from './Login';
import PageNotFound from './PageNotFound';
import LeaderBoard from './LeaderBoard';
import {connect} from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { handleInitialData } from '../actions/shared.action'


class APP extends React.Component {
    componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}
render(){
  const {loadingFlag,loggedOut}=this.props
  console.log('this.props: ',this.props)
    return (
      <div>
      <div>
      {!loadingFlag &&(<div>
        <Nav/>
{loggedOut?(<Login/>):
(<div>

<Switch>
<Route exact path="/"><DashBoard /></Route>
<Route exact path="/leaderboard"><LeaderBoard /></Route>
<Route exact path="/add"> <NewQuestion /></Route>
<Route  exact path='/question/:questionID'> <QuestionInfo /></Route>
<Route  exact path="/not-found" > <PageNotFound /></Route>
 </Switch>

 </div>)
}
 </div>) }
 </div>
 </div>)}}
function mapStateToProps({authedUser})
{
  return {
    loadingFlag:authedUser===null,
    loggedOut:authedUser==="LoggedOut"
  }
    
}   
export default connect(mapStateToProps)(APP)