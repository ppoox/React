import React, { Component } from 'react';
import './css/BoardInsert.css';

class BoardInsert extends Component{
    insertSubmit = (e) => {
        e.preventDefault();
  
        let data={
            title: e.target.title.value,
            content: e.target.content.value
        }
  
       this.props.insert(data);
    }

    render(){
        return(
            <div className="boardInsert">
                <form onSubmit={this.insertSubmit}>
                  <span><h3>제목 : </h3></span>
                  <input className="titleInsert" id="title" name="title"></input>
                  <span><h3>내용 : </h3></span>
                  <textarea className="contentInsert" id="content" name="comtent"></textarea>
                  <button type="submit"><h3>작성</h3></button>
              </form>
            </div>
        )
    }
}

export default BoardInsert;