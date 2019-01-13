import { createAction, handleActions } from 'redux-actions';
import firestore from '../FirebaseConfig.js';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_UPDATE = 'UPDATE';
const BOARD_UPDATE_NUM = "UPDATE_NUM";  // 글 삭제후 번호를 당기기 위한 action
const BOARD_LIST = 'LIST';

// actions 생성
export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE, dNum => dNum);
export const board_update = createAction(BOARD_UPDATE);
export const board_update_num = createAction(BOARD_UPDATE_NUM);
export const board_list = createAction(BOARD_LIST);

// 많이 사용하는 방법인 액션과 리듀서를 분리하고 
// 리듀서를 여러 개의 파일로 분리하는 방법을 사용한다. 
// 다음과 같이 리듀서를 각각의 파일을 분리하고 index.js 파일에서는 분리한 리듀서를 합친다. 
// 만약 파일의 개수가 많아진다면 ducks 기법을 사용하는 것을 고려할 수 있다.
// 이 프로젝트에서는 ducks 기법을 사용하였다.


// 아래와 같은 함수지만 다른 형태의 함수 표현
// export const firesotre_board_save = () => (dispatch, getState => {
//     return 
// }
export const firestore_board_save = (data) => {
    return (dispatch, getState) => {
        let boards = getState().boards;
        let doc=firestore.collection("boards").doc();
        let obj={
            id: doc.id,
            title: data.title,
            writer: data.writer,
            date: Date.now()
        };  
        
        return  doc.set(obj).then(() => console.log("create firestore!")).then(() => {
            
        if(boards.length === 0){
            obj.num=1;
        }
        if(boards.length !== 0){
            obj.num=boards[boards.length-1].num+1;
               
        }
            dispatch(board_save(obj));
        })
    }
}

export const firestore_board_remove = (dId, dNum) => {
    return (dispatch, getState) => {
        return firestore.collection("boards").doc(dId).delete().then(() => {
            dispatch(board_remove(dId));
            dispatch(board_update_num(dNum));
        })
    }
}

export const firestore_board_list = () => {
    return (dispatch) => {
        let rows=[];
        console.log("list action");
        
        return firestore.collection("boards").orderBy("date", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("firebase getList"+ doc.data());
                rows.push(doc.data());
            });
            dispatch(board_list(rows));
        });
    }
}

// 초기 state
const initialState ={
    boards:[
    ]
};

// actions 정의
export default handleActions({
    [BOARD_SAVE]: (state, {payload: obj}) => {
        let boards = state.boards;
        
        return {boards: boards.concat(obj)}
    },
    [BOARD_REMOVE]: (state, {payload: dNum}) => {
        console.log("remove action");
        let boards = state.boards;

        return {boards: boards.filter(boards => boards.id !== dNum)}
    },
    [BOARD_UPDATE]: (state, { payload: data}) => {
        console.log("update action");
        let boards = state.boards;

        return {boards: boards.map(board => board.num === data.num ? ({...board, title: data.title, writer: data.writer}): board)}
    },
    [BOARD_UPDATE_NUM]: (state, { payload: dNum}) => {
        let boards = state.boards;

        return {boards: boards.map(board => board.num > dNum ? ({...board, num: board.num - 1}): board)}
    },
    [BOARD_LIST]: (state, {paylad: data}) => {
        return {boards: data}
    }
}, initialState);
