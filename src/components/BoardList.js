import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestore_board_remove, firestore_board_list } from '../reducer/App_reducer'
import BoardUpdate from './BoardUpdate';
// css import
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TableHead } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

// 페이징 처리를 위한 class
class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// Table에서의 actions들을 담은 class
class CustomPaginationActionsTable extends React.Component {
  state= {
    hideUpdate: true,   //수정폼을 appear 및 disappar하기 위한 변수
    uId: 0,            //선택한 row만 수정하기 위한 변수
    page: 0,
    rowsPerPage: 5,
  }

  // 삭제 버튼 클릭시
  deleteBtn = (dId, dNum) => {
    this.props.dispatch(firestore_board_remove(dId, dNum));
    this.setState({
      uId: 0
    })
  }

  // 수정 버튼 클릭시 (수정을 위한 form을 보여줌)
  updateBtn = (uId) => {
      this.setState({
          hideUpdate:false,
          uId: uId
      })
  }

  // 수정 폼 유지를 위한 정보를 받음
  updateBtn2 = (hideUpdate) => {
      this.setState({
          hideUpdate: hideUpdate
      })
  }

  // Table 페이징 이동을 위한 메소드 1
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  // Table 페이징 이동을 위한 메소드 2
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
   this.props.dispatch(firestore_board_list());
    console.log("componentDidMount()");
  }

  // componentDidReceiveProps(nextProps) {
  //     this.props.dispatch(firestore_board_list());
  // }
  
  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.boards.length - page * rowsPerPage);
    let countNum=(this.props.boards.length)-(page*rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">번호</TableCell>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">작성자</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.boards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="center">
                    {countNum--}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.writer}</TableCell>
                    <TableCell align="center">
                      { !this.state.hideUpdate && this.state.uId === row.id && <BoardUpdate id={row.id} updateBtn2={this.updateBtn2}/> }
                      {this.state.hideUpdate && <Button variant="contained" color="primary" type="button" onClick={()=>this.updateBtn(row.id)}><h3>수정</h3></Button> }</TableCell>
                    <TableCell align="center"> <Button variant="contained" color="primary" type="button" onClick={()=>this.deleteBtn(row.id, row.num)}><h3>삭제</h3></Button></TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={this.props.boards.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// reducer의 state를 받아오기 위한 mapStateToProps
const mapStateToProps = (state) => {
  return {
    boards: state.boards
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));