import React, { Component } from 'react';
import './css/BoardList.css';

class BoardList extends Component {

    deleteBtn = (e) => {
        this.props.delete(this.props.num);
    }

    render() {
        return(
            <div className="boardList">
                <h1>번호 : {this.props.num}</h1>
                <h1>제목 : {this.props.title}</h1>
                <h1>내용{this.props.content}</h1>
                <button type="button" onClick={this.deleteBtn}><h3>삭제하기</h3></button>
            </div>
        )
    }
}

export default BoardList