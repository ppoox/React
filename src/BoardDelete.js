import React, { Component } from 'react';
import './css/BoardDelete.css';

class BoardDelete extends Component {
    _deleteBtn = () =>{
        
    }

    render() {
        return (
            <div className="boardDelete">
                <button onClick={this._deleteBtn}><h3>삭제</h3></button>
            </div>
        )
    }
}

export default BoardDelete