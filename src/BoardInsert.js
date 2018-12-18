import React, { Component } from 'react';
import './css/BoardInsert.css';
import BoardList from './BoardList';
import { throws } from 'assert';

class BoardInsert extends Component{
    state= {
        boards:[]
    }
    _insertBtn = () => {
        let title=document.getElementById("title").value;
        let content=document.getElementById("content").value;

        let obj={
            num: this.state.boards.length + 1,
            title: title,
            content: content
        };

        this.setState({
        boards: this.state.boards.concat(obj)
        }, () => console.log(this.state.boards));

        return false;
    }

    _showDelBtn = () => {
        document.getElementById("deleteForm").style.display="block";
    }

    _deleteBtn = () => {
        let dNum=document.getElementById("deleteNum").value;

        console.log(dNum);
        this.setState({
            boards: this.state.boards.filter(boards => boards.num != dNum)
           
        })
        console.log(this.state.boards);
    }

    render(){
        return(
            <div className="boardInsert">
                <form id="insertForm">
                    <span><h3>제목 : </h3></span>
                    <input className="titleInsert" id="title"></input>
                    <span><h3>내용 : </h3></span>
                    <textarea className="contentInsert" id="content"></textarea>
                    <button type="button" onClick={this._insertBtn}><h3>작성</h3></button>
                    <button type="button" onClick={this._showDelBtn}><h3>삭제하기</h3></button>
                </form>
                <form id="deleteForm">
                    <span><h3>글번호를 입력하세요.</h3></span>
                    <input id="deleteNum"></input>
                    <button type="button" onClick={this._deleteBtn}><h3>삭제</h3></button>
                </form>
                {this.state.boards.map((board, index) => 
                    <BoardList num={board.num} title={board.title} content={board.content} key={index}/>
                 )}
            </div>
            
        )
    }
}

export default BoardInsert;