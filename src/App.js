import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import BoardList from './views/BoardList';
import BoardInsert from './views/BoardInsert';
import BoardList2 from './BoardList2';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';





const App = ({boards}) => (
    <div className="App">
        <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            게시판
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        >
            <BoardInsert insert={boards.insert}/>
            {/* {boards.map((board) => 
            <BoardList key={board.num} num={board.num} title={board.title} content={board.content} delete={board.delete} update={board.update}/>            )} */}
       
       
        {//<BoardList2 key={boards.num} num={boards.num} title={boards.title} content={boards.content} delete={boards.delete} update={boards.update}/>}
            <BoardList2 key={boards.num} rows={boards}/>}
        </Grid>
    </div>
)


const mapStateToProps = (state) => {
    return {
        boards: state.boards
    }
}

export default connect(mapStateToProps)(App);