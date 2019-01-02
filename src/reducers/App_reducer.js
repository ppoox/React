import { createAction, handleActions } from 'redux-actions';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_UPDATE = 'UPDATE';
const BOARD_LIST = 'LIST';

export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, dNum => dNum);
export const board_update = createAction(BOARD_UPDATE);
export const board_list = createAction(BOARD_LIST);

const initialState ={
    boards:[
            {
                num: 1,
                title: "title1",
                content: "content1"
            }
        ]
};

export default handleActions({
    [BOARD_SAVE]: (state, {payload: data}) => {
        console.log("save action");
        let boards = state.boards;
        let obj={
            num: boards[boards.length-1].num+1,
            title: data.title,
            content: data.content
          };  
          
          return {boards: boards.concat(obj)}
    },
    [BOARD_REMOVE]: (state, {payload: dNum}) => {
        console.log("remove action");
        let boards = state.boards;
        
        return {boards: boards.filter(boards => boards.num !== dNum)}
    },
    [BOARD_UPDATE]: (state, { payload: data}) => {
        console.log("update action");
        let boards = state.boards;

        return {boards: boards.map(board => board.num === data.num ? ({...board, title: data.title, content: data.content}): board)}
    }




}, initialState);
