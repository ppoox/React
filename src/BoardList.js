import React, { Component } from 'react';
import './css/BoardList.css';
import BoardInsert from './BoardInsert';

class BoardList extends Component {


    render() {
        return(
            <div className="boardList">
                <h1>번호 : {this.props.num}</h1>
                <h1>제목 : {this.props.title}</h1>
                <h1>내용{this.props.content}</h1>
            </div>
        )
    }
}

export default BoardList