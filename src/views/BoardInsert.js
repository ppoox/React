import React, { Component } from 'react';
import { connect } from 'react-redux';

import { board_save } from '../reducers/App_reducer'
import '../css/BoardInsert.css';

import Button from '@material-ui/core/Button';

class BoardInsert extends Component{
    insertSubmit = (e) => {
        e.preventDefault();
  
        let data={
            title: e.target.title.value,
            content: e.target.content.value
        }
        this.props.dispatch(board_save(data))
    }

    render(){
        return(
            <div className="boardInsert">
                <form onSubmit={this.insertSubmit}>
                  <span><h3>제목 : </h3></span>
                  <input className="titleInsert" id="title" name="title"></input>
                  <span><h3>내용 : </h3></span>
                  <textarea className="contentInsert" id="content" name="content"></textarea>
                  <Button variant="contained" color="primary" type="submit"><h3>입력</h3></Button>
              </form>
            </div>
        )
    }
}

export default connect()(BoardInsert);