import React from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import QuestionInfo from './QuestionInfo';

class DashBoard extends React.Component {
    state=
    {
      answered:false
    }
    handleChange = (answeredFlag) => {
        this.setState(() => ({
            answered: answeredFlag
        }));
     
    }
render(){ 
const {questions,authedUser,users}=this.props
const {answered}=this.state
console.log('users[authedUser] : ', users[authedUser] )

/*
const filteredQuestions = Object.values(questions).filter(function(question) {
    const answerFlag = (Object.keys(users[authedUser].answers).includes(question)  );
    return answered ? answerFlag : !answerFlag; //if user clicks answered tab ->then show the answered questions,else => show him unanswered questions
});
console.log('filteredQuestions : ',filteredQuestions)
const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);
console.log('sortedQuestions : ',sortedQuestions) */

const answeredQuestions=Object.values(questions).filter((question)=>
    Object.keys(users[authedUser].answers).includes(question)).map((question) => Object.assign({}, question));

const unansweredQuestions=Object.values(questions).filter((question)=>
!Object.keys(users[authedUser].answers).includes(question)).map((question) => Object.assign({}, question));

const sortedAnsweredQuestions = answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
console.log('sortedAnsweredQuestions : ',sortedAnsweredQuestions)

const sortedUnannsweredQuestions = unansweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
console.log('sortedUnannsweredQuestions : ',sortedUnannsweredQuestions)


    return (
        <div>
                <div className="btn-group">
                    <Button className={ !answered ? 'btn-selected' : 'btn-default'} onClick={this.handleChange(false)}>Unanswered Questions</Button>
                    <Button className={ answered ? 'btn-selected' : 'btn-default'} onClick={this.handleChange(true)}>Answered Questions</Button>
                </div>
                {answered?(
                  sortedAnsweredQuestions.map(answeredQuestion=>  <QuestionInfo key={answeredQuestion.id}></QuestionInfo>)

                ):(
                    sortedUnannsweredQuestions.map(unansweredQuestion=>  <QuestionInfo key={unansweredQuestion.id}></QuestionInfo>)
                )}
</div>

    )}}






    function mapStateToProps({ questions,authedUser,users }) {
      
        return {
          questions,
          authedUser,
          users
        }
      }
      
      export default connect(mapStateToProps)(DashBoard)