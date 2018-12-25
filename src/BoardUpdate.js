import React, { Component } from 'react';

class BoardUpdate extends Component {
    updateSubmit = (e) => {
        e.preventDefault();
        
        let obj={
            num: this.props.num,
            title: e.target.title.value,
            content: e.target.content.value,
        }
        let hideUpdate=true;
        this.props.update(obj);
        this.props.updateBtn2(hideUpdate);
    }

    render(){
        return(
            <div className="boardUpdate">
                <form onSubmit={this.updateSubmit}>
                  <span><h3>제목 : </h3></span>
                  <input className="titleUpdate" id="title" name="title"></input>
                  <span><h3>내용 : </h3></span>
                  <textarea className="contentUpdate" id="content" name="content"></textarea>
                  <button type="submit"><h3>수정</h3></button>
              </form>
            </div>
        )
    }
}

export default BoardUpdate