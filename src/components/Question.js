import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/question.css'
import { Button } from 'react-bootstrap'

class Question extends Component {
  render() {
    const { question, author, questionId } = this.props
    console.log('author: ',author)

    return (
      <div className="question-container">
        <div className="auther-info">
        <h2>{author.name} asks: </h2>
        <img src={author.avatarURL} alt="avatar" className="auther-img" />
        </div>
        <div className="question-body">
        <h4>Would You Rather...?</h4>
          <p>---{question.optionOne.text}---</p>
          <div className="center">
          <Link to={`/question/${questionId}`}>
            <Button className="poll-button">View </Button>
          </Link> 
          </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  console.log('id :',id)
  const question = questions[id]
  const questionId = question.id
  const author = users[question.author]

  return {
    question,
    author,
    questionId
  }
}

export default connect(mapStateToProps)(Question)