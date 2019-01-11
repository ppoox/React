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


// 초기 state
const initialState ={
    boards:[
    ]
};

// actions 정의
export default handleActions({
    [BOARD_SAVE]: (state, {payload: data}) => {
        console.log("save action");
        let boards = state.boards;
        let obj;
        let doc=firestore.collection("boards").doc();

        if(boards.length === 0){
            obj={
                id: doc.id,
                num: 1,
                title: data.title,
                content: data.content
              };  
        }
        if(boards.length !== 0){
            obj={
                id: doc.id,
                num: boards[boards.length-1].num+1,
                title: data.title,
                content: data.content
            };  
        }
        //firestore에 저장
        doc.set(obj).then(() => console.log("create firestore!"));
        
        return {boards: boards.concat(obj)}
    },
    [BOARD_REMOVE]: (state, {payload: dNum}) => {
        console.log("remove action");
        let boards = state.boards;
        //firestore에서 삭제
        firestore.collection("boards").doc(dNum).delete().then(() => console.log("delete firestore!"));

        return {boards: boards.filter(boards => boards.id !== dNum)}
    },
    [BOARD_UPDATE]: (state, { payload: data}) => {
        console.log("update action");
        let boards = state.boards;

        return {boards: boards.map(board => board.num === data.num ? ({...board, title: data.title, content: data.content}): board)}
    },
    [BOARD_UPDATE_NUM]: (state, { payload: dNum}) => {
        let boards = state.boards;

        return {boards: boards.map(board => board.num > dNum ? ({...board, num: board.num - 1}): board)}
    },
    [BOARD_LIST]: (state, {paylad: data}) => {
        let rows=[];
        console.log("list action");
        firestore.collection("boards").orderBy("num", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                console.log("firebase getList"+ doc.data());
                rows.push(doc.data());
            });
        });
        
        return {boards:rows}
    }


}, initialState);
