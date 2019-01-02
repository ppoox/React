import React, { Component } from 'react';
import { connect } from 'react-redux';
import { board_update } from '../reducers/App_reducer' 
import Button from '@material-ui/core/Button';

class BoardUpdate extends Component {
    updateSubmit = (e) => {
        e.preventDefault();
        
        if(e.target.title.value === "" || e.target.content.value === ""){
            let hideUpdate=true;
            this.props.updateBtn2(hideUpdate);
            return false;
        }

        let obj={
            num: this.props.num,
            title: e.target.title.value,
            content: e.target.content.value,
        }
        let hideUpdate=true;
        this.props.dispatch(board_update(obj));
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
                  <Button variant="contained" color="primary" type="submit"><h3>수정</h3></Button>
              </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}


export default connect(mapDispatchToProps)(BoardUpdate)