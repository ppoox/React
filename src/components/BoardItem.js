import React from 'react';
import BoardUpdate from './BoardUpdate';
import { firestore_board_remove } from '../reducer/App_reducer';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

class BoardItem extends React.Component {
    
  // 삭제 버튼 클릭시
  deleteBtn = (dId, dNum) => {
    this.props.dispatch(firestore_board_remove(dId, dNum));
    this.setState({
      uNum: 0
    })
  }

  // 수정 버튼 클릭시 (수정을 위한 form을 보여줌)
  updateBtn = (uNum) => {
      this.setState({
          hideUpdate:false,
          uNum: uNum
      })
  }

  // 수정 폼 유지를 위한 정보를 받음
  updateBtn2 = (hideUpdate) => {
      this.setState({
          hideUpdate: hideUpdate
      })
  }

    render() {
        return (
            <TableRow key={this.props.row.num}>
            <TableCell component="th" scope="row" align="center">
            {this.props.row.num}
            </TableCell>
            <TableCell align="center">{this.props.row.title}</TableCell>
            <TableCell align="center">{this.props.row.writer}</TableCell>
            <TableCell align="center">
              { !this.props.hideUpdate && this.props.uNum === this.props.row.num && <BoardUpdate num={this.props.row.num} updateBtn2={this.updateBtn2}/> }
              {this.props.hideUpdate && <Button variant="contained" color="primary" type="button" onClick={()=>this.updateBtn(this.props.row.num)}><h3>수정</h3></Button> }</TableCell>
            <TableCell align="center"> <Button variant="contained" color="primary" type="button" onClick={()=>this.deleteBtn(this.props.row.id, this.props.row.num)}><h3>삭제</h3></Button></TableCell>
          </TableRow>
        )
    }
}

export default BoardItem;