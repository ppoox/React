import React, { Component } from 'react';
import { connect } from 'react-redux';
import {firestore_board_save} from '../reducer/App_reducer'
// css import
import '../css/BoardInsert.css';
import Button from '@material-ui/core/Button';

class BoardInsert extends Component{
    // 입력 버튼 클릭시
    insertSubmit = (e) => {
        e.preventDefault();
        let data={
            title: e.target.title.value,
            writer: e.target.writer.value
        }
        this.props.dispatch(firestore_board_save(data));
    }

    render(){
        return(
            <div className="boardInsert">
                <form onSubmit={this.insertSubmit}>
                  <span><h3>제목 : </h3></span>
                  <input className="titleInsert" id="title" name="title"></input>
                  <span><h3>작성자 : </h3></span>
                  <input className="writerInsert" id="writer" name="writer"></input>
                  <Button variant="contained" color="primary" type="submit"><h3>입력</h3></Button>
              </form>
            </div>
        )
    }
}

// BoardInsert.propTypes = {
//     data: PropTypes.object.isRequired,
//     title: PropTypes.string.isRequired,
//     writer: PropTypes.textarea.isRequired
// };

export default connect()(BoardInsert);