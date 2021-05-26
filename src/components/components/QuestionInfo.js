import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link,Redirect,withRouter } from 'react-router-dom'
import '../styles/question.css'
import answeredIcon from '../images/answer-icon.png'
import { handleAnswerQuestion } from "../actions/questions.action";

class QuestionInfo extends Component {
    state={
        selectedOption:'',
        redirct: false  
    }
    handleAddAnswer=(event,authedUser, qid)=>
    {
        event.preventDefault();
       this.props.dispatch(handleAnswerQuestion(authedUser, qid, this.state.selectedOption)) 
    }
    
    handleOptionChange=(event) =>{
        this.setState({
          selectedOption: event.target.value
        });
      }
  render() {
    const { notExists,users,question, author, questionId,authedUser, authedUserAnswer,optionOneVotes,optionTwoVotes,votesSum,optionOnePerecntage, optionTwoPerecntage } = this.props
    console.log('author',author)
    const answered=question.optionOne.votes.includes(authedUser)||question.optionTwo.votes.includes(authedUser)
    const optionOneText=question.optionOne.text
    const optionTwoText=question.optionTwo.text
    if (notExists) {
        return <Redirect to="/not-found" />;
      }
    return (
      <div className="question-container">
        <div className="auther-info">
        <h2>{author.name} asks: </h2>
        <img src={author.avatarURL} alt="avatar" className="auther-img" />
        </div>
        <div className="question-body">
        <h4>Would You Rather...?</h4>
         {//check if it is answered or unanswered
         //if answered ->view votes and thier percantage
         answered ?(
             <div>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            
            <div className="answers-box">
                {authedUserAnswer==="optionOne"?(
                    <div>
                    <img src={answeredIcon}></img> 
                    <p>This is your answer</p>
                    </div>

                ):(<div>
                    </div>)
                }
             <p>{question.optionOne.text}?</p>
             <div class="w3-container w3-blue w3-center" style={{width: optionOnePerecntage + "%"}}>{optionOnePerecntage}</div>
             <p>{optionOneVotes} out of {votesSum}</p>
             </div>
             <div className="answers-box">
                {authedUserAnswer==="optionTwo"?(
                    <div>
                    <img src={answeredIcon}></img>
                    <p>This is your answer</p>
                    </div>
                ):(<div>
                    </div>)
                }
             <p>{question.optionTwo.text}?</p>
             <div class="w3-container w3-blue w3-center"  style={{width: optionTwoPerecntage + "%"}}>{optionTwoPerecntage}</div>
             <p>{optionTwoVotes} out of {votesSum}</p>
             </div>
             </div>
         ):
        (//if unanswered ->view otions and button for vote and handling voting
        <div>
        <form onSubmit={this.handleAddAnswer(authedUser,questionId,this.state.selectedOption)}>
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
  console.log('id ',id)
  console.log('match.params ',match.params)
  console.log('match.params.questiondID ',match.params.questiondID)
  console.log('Object.values(questions) ',Object.values(questions))
  const question = questions[id]
  console.log('question ',question)  ////////undefined why?
  const questionId = id
  console.log('id.author :',id.author)
  const authorId = questions[id].author
  const author=users[authorId]
  console.log('author: ',author)

  //authedUser's answer
  const authedUserAnswer=Object.keys(users[authedUser].answers);
  console.log('authedUserAnswer: ',authedUserAnswer)

  //perecntage of votes
  let optionOneVotes=question.optionOne.votes.length;
  let optionTwoVotes=question.optionTwo.votes.length;
  let votesSum=optionOneVotes+optionTwoVotes;

  let optionOnePerecntage=((optionOneVotes/votesSum)* 100).toFixed(1)
  let optionTwoPerecntage=((optionTwoVotes/votesSum)* 100).toFixed(1)
  const notExists = true
  if (question === undefined) {
    return {
        notExists,
    };}
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