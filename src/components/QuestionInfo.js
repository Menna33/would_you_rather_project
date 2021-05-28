import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter } from 'react-router-dom'
import '../styles/question.css'
import { handleAnswerQuestion } from "../actions/questions.action";
//import answerIcon from '../images/answer-icon.png'

class QuestionInfo extends Component {
    state={
        selectedOption:'' 
    }
    handleAddAnswer=(e)=>
    {
        e.preventDefault();
        console.log('this.props.authedUser :',this.props.authedUser)
        console.log('this.props.questionId :',this.props.questionId)
        console.log('this.props.selectedOption :',this.props.selectedOption)
       this.props.dispatch(handleAnswerQuestion({authedUser:this.props.authedUser, qid:this.props.questionId, answer:this.state.selectedOption}))
       this.setState({
        redirct: true
      }); 
    }
    
    handleOptionChange=(event) =>{
        this.setState({
          selectedOption: event.target.value
        });
      }
  render() {
    if(this.props.notExists)
    {
      return <Redirect to="/not-found" />;
    }
    const { question, author, authedUser, authedUserAnswer,optionOneVotes,optionTwoVotes,votesSum,optionOnePerecntage, optionTwoPerecntage } = this.props
    console.log('author',author)
    console.log('question',question)
    console.log('authedUserAnswer:::::::::::::',authedUserAnswer)
    const answered=question.optionOne.votes.includes(authedUser)||question.optionTwo.votes.includes(authedUser)
    const optionOneText=question.optionOne.text
    console.log('question.optionOne.text: ',question.optionOne.text)
    console.log('optionOneText: ',optionOneText)
    const optionTwoText=question.optionTwo.text
    console.log('question.optionTwo.text: ',question.optionTwo.text)
    console.log('optionTwoText: ',optionTwoText)
    
    return (
      <div className="question-info-container">
        <div className="auther-info">
        <h2>{author.name} asks: </h2>
        <img src={author.avatarURL} alt="avatar" className="auther-img" />
        </div>
        <div className="question-body">
        <h2>Would You Rather...?</h2>
         {//check if it is answered or unanswered
         //if answered ->view votes and thier percantage
         answered ?(
             <div className="container">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            
            <div className="answers-box">
                
             <h3>--{question.optionOne.text}?</h3>
             <div className="w3-container w3-blue w3-center" style={{width: optionOnePerecntage + "%"}}>{optionOnePerecntage}%</div>
             {authedUserAnswer==="optionOne"&&(
                    <h5 style={{color:"blue"}}>This is your answer</h5>

                )
                }
             <p>{optionOneVotes} out of {votesSum}</p>
             </div>
             <div className="answers-box">
               
             <h3>--{question.optionTwo.text}?</h3>
             
             <div className="w3-container w3-blue w3-center"  style={{width: optionTwoPerecntage + "%"}}>{optionTwoPerecntage}%</div>
             {authedUserAnswer==="optionTwo"&&(
                   <h5 style={{color:"blue"}}>This is your answer</h5>

                )
                }
             <p>{optionTwoVotes} out of {votesSum}</p>
             </div>
             </div>
         ):
        (//if unanswered ->view otions and button for vote and handling voting
        <div>
        <form onSubmit={this.handleAddAnswer}>
        <div className="radio">
          <label>
            <input type="radio" value="optionOne" checked={this.state.selectedOption === "optionOne"} onChange={this.handleOptionChange}/>
            {optionOneText}
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio"  value="optionTwo" checked={this.state.selectedOption === "optionTwo"} onChange={this.handleOptionChange}/>
            {optionTwoText}
          </label>
        </div>
        <button className="btn btn-default" type="submit">Submit</button>
      </form>
            </div>)}
          
          </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users,authedUser }, { match}) {
  const id = match.params.questionID;
  const question = questions[id]
  const notExists = true
  if (question === undefined) {
    return {
        notExists,
    };}
  
  const questionId = id
  const authorId = questions[id].author
  const author=users[authorId]
  console.log('author: ',author)

  //authedUser's answer
  const authedUserAnswer=users[authedUser].answers[questionId];

  //perecntage of votes
  let optionOneVotes=question.optionOne.votes.length;
  let optionTwoVotes=question.optionTwo.votes.length;
  let votesSum=optionOneVotes+optionTwoVotes;

  let optionOnePerecntage=((optionOneVotes/votesSum)* 100).toFixed(1)
  let optionTwoPerecntage=((optionTwoVotes/votesSum)* 100).toFixed(1)
 
  return {
    users,
    question,
    author,
    questionId,
    authedUser,
    authedUserAnswer,
    optionOneVotes,
    optionTwoVotes,
    votesSum,
    optionOnePerecntage,
    optionTwoPerecntage
  }
}

export default withRouter(connect(mapStateToProps)(QuestionInfo))