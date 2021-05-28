import React from 'react';
import { connect } from 'react-redux'
import '../styles/new.css'
import icon from '../images/project_icon.jpg'
import {handleAddQuestion} from '../actions/questions.action'
import {Redirect} from 'react-router-dom'
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
             this.setState({optionOneValue:event.target.value},()=>{console.log('OptionOneValue: ',this.state.OptionOneValue);
             })
                
             //bi set el state wrong bi7otha fadia
             
        }
        if(event.target.name==="optionTwo")
         {
             this.setState({optionTwoValue:event.target.value},()=>{console.log('OptionTwoValue: ',this.state.OptionTwoValue)})
           
    }
        }
    handleAddNew=(event)=>{
        event.preventDefault();
      const { optionOneValue, optionTwoValue} = this.state 
      console.log('optionOneValue',optionOneValue)
      const {authedUser} =this.props
     this.props.dispatch(handleAddQuestion({ optionOneText:optionOneValue, optionTwoText:optionTwoValue,author: authedUser })) 
     this.setState({redirct: true})
    }

render(){
   const {redirct}=this.state
   console.log('authedUser1 ',this.props.authedUser)
    if(redirct) 
    { 
        return  <Redirect to='/home' />
    }
    return (
<div className="new-container">
<img src={icon} alt={"Would you rather"}/>
<form>
<label >Option One:</label>   
<input type="text" id="optionOne" name="optionOne"  onChange={this.handleInputChange}></input>
<label >Option Two:</label> 
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