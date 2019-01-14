import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestore_board_update } from '../reducer/App_reducer' 
// css import
import Button from '@material-ui/core/Button';

class BoardUpdate extends Component {
    // 수정 버튼 클릭시
    updateSubmit = (e) => {
        e.preventDefault();
        // 수정 form에 아무것도 입력하지 않았을때
        if(e.target.title.value === "" || e.target.writer.value === ""){
            let hideupdate=true;
            this.props.updateBtn2(hideupdate);
            return false;
        }
        let obj={
            id: this.props.id,
            title: e.target.title.value,
            writer: e.target.writer.value,
        }
        let hideupdate=true;
        this.props.dispatch(firestore_board_update(obj));
        this.props.updateBtn2(hideupdate);
    }

    render(){
        return(
            <div className="boardUpdate">
                <form onSubmit={this.updateSubmit}>
                  <span><h3>제목 : </h3></span>
                  <input className="titleUpdate" id="title" name="title"></input>
                  <span><h3>작성자 : </h3></span>
                  <input className="writerUpdate" id="writer" name="writer"></input>
                  <Button variant="contained" color="primary" type="submit"><h3>수정</h3></Button>
              </form>
            </div>
        )
    }
}

export default connect()(BoardUpdate);