import React from 'react';
import { connect } from 'react-redux'
import '../styles/new.css'
import icon from '../images/project_icon.jpg'
import {handleAddQuestion} from '../actions/questions.action'
import {Redirect,BrowserRouter as Router} from 'react-router-dom'
import authedUser from './../reducers/authedUser.reducer';
class NewQuestion extends React.Component {  
    state = {      
    	optionOneValue:'',
		optionTwoValue:'',
		redirct: false                  
	};
    handleInputChange=(event)=>{ 
        event.preventDefault();
        if(event.target.name==="optionOne")
         {
             this.setState({OptionOneValue:event.target.value})
             console.log('OptionOneValue: ',this.state.OptionOneValue)
        }
        if(event.target.name==="optionTwo")
         {
             this.setState({OptionTwoValue:event.target.value})
             console.log('OptionTwoValue: ',this.state.OptionTwoValue)
    }
        }
    handleAddNew=(event)=>{
        event.preventDefault();
      this.setState({redirct: true})
      const { optionOneText, optionTwoText} = this.state 
      console.log('this.state : ',this.state)
      const {auther} =this.props
     this.props.dispatch(handleAddQuestion({ optionOneText, optionTwoText, auther }))
    }

render(){
   const {redirct}=this.state
    if(redirct) 
    { 
        return 
        {<Router><Redirect to='/home' /></Router>}
    }
    return (
<div className="new-container">
<img src={icon} />
<form>
<label for="optionOne">Option One:</label>   
<input type="text" id="optionOne" name="optionOne"  onChange={this.handleInputChange}></input>
<label for="optionTwo">Option Two:</label> 
<input type="text" id="optionTwo" name="optionTwo" onChange={this.handleInputChange}></input>
  <input type="submit" value="Submit" onClick={this.handleAddNew}></input>
</form>
</div>
    )}}


function mapStateToProps ({authedUser})
{
    return{authedUser}
}




export default connect(mapStateToProps)(NewQuestion)