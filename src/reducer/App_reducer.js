import { createAction, handleActions } from 'redux-actions';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_UPDATE = 'UPDATE';
const BOARD_LIST = 'LIST';

// actions 생성
export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, dNum => dNum);
export const board_update = createAction(BOARD_UPDATE);
export const board_list = createAction(BOARD_LIST);

// 많이 사용하는 방법인 액션과 리듀서를 분리하고 
// 리듀서를 여러 개의 파일로 분리하는 방법을 사용한다. 
// 다음과 같이 리듀서를 각각의 파일을 분리하고 index.js 파일에서는 분리한 리듀서를 합친다. 
// 만약 파일의 개수가 많아진다면 ducks 기법을 사용하는 것을 고려할 수 있다.
// 이 프로젝트에서는 ducks 기법을 사용하였다.

// 초기 state
const initialState ={
    boards:[
        {
            num: 1,
            title: "title1",
            content: "content1"
        }
    ],
};

// actions 정의
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
