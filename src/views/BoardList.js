import React, { Component } from 'react';
import { connect } from 'react-redux';
import { board_remove } from '../reducers/App_reducer'
import '../css/BoardList.css';
import BoardUpdate from './BoardUpdate';

import Button from '@material-ui/core/Button';

class BoardList extends Component {
    state= {
        hideUpdate: true
    }

    deleteBtn = () => {
        this.props.dispatch(board_remove(this.props.num));
    }

    updateBtn = () => {
        this.setState({
            hideUpdate:false
        })
    }
    updateBtn2 = (hideUpdate) => {
        this.setState({
            hideUpdate: hideUpdate
        })
    }

    render() {
        return(
            <div className="boardList">
                <h1>번호 : {this.props.num}</h1>
                <h1>제목 : {this.props.title}</h1>
                <h1>내용 : {this.props.content}</h1>
                { !this.state.hideUpdate && <BoardUpdate num={this.props.num} update={this.props.update} updateBtn2={this.updateBtn2}/> }
                { this.state.hideUpdate && <Button variant="contained" color="primary" type="button" onClick={this.updateBtn}><h3>수정</h3></Button> }
                <Button variant="contained" color="primary" type="button" onClick={this.deleteBtn}><h3>삭제</h3></Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      
    }
}

export default connect(mapStateToProps)(BoardList)