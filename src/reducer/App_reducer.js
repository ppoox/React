import { createAction, handleActions } from 'redux-actions';
import firestore from '../FirebaseConfig.js';

const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_UPDATE = 'UPDATE';
const BOARD_UPDATE_NUM = "UPDATE_NUM";  // 글 삭제후 번호를 당기기 위한 action
const BOARD_LIST = 'LIST';

// actions 생성
export const board_save = createAction(BOARD_SAVE);
export const board_remove = createAction(BOARD_REMOVE);
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

//thunk란? - 특정 작업을 나중에 하도록 미루기 위해서 함수형태로 감싼것을 칭한다.
// redux-thunk란?
// 객체 대신 함수를 생성하는 액션 생성함수를 작성 할 수 있게 해준다.
// 리덕스에서는 기본적으로는 액션 객체를 디스패치한다. 일반 액션 생성자는 파라미터를 가지고 액션 객체를 생성하는 작업만 한다.
// redux-thunk를 사용하면 객체에 로직을 추가해서 생성 할 수 있다.


// .set() => 문서가 따로 없으면 생성하고 있으면 덮어씀
// .doc("id") => 만들 문서의 id를 지정해야함
// .add() => 만들 문서의 id를 따로 지정하지 않고 자동으로 생성 되는 id를 사용할때

// .add(...)와 .doc().set(...)은 내부적으로 완전히 동등하므로 편의에 따라 골라서 사용하면 됩니다.
export const firestore_board_save = (data) => {
    return (dispatch, getState) => {
        const doc=firestore.collection("boards").doc();
        const obj={
            ...data,
            id: doc.id,
            date: Date.now()
        };  
        // data.id=doc.id;
        // data.date=Date.now();
        return doc.set(obj).then(() => {
            dispatch(board_save(obj));
        })
    }
}

export const firestore_board_remove = (dId) => {
    return (dispatch) => {
        return firestore.collection("boards").doc(dId).delete().then(() => {
            dispatch(board_remove(dId));
        })
    }
}

export const firestore_board_list = () => {
    return (dispatch) => {
        return firestore.collection("boards").orderBy("date", "desc").get().then((querySnapshot) => {
            let rows=[];
            querySnapshot.forEach((doc) => {
                console.log("firebase getList"+ doc.data());
                rows.push(doc.data());
            });
            dispatch(board_list(rows));
        });
    }
}

export const firestore_board_update = (obj) => {
    return (dispacth) => {
        return firestore.collection("boards").doc(obj.id).update({ 
            title: obj.title,
            writer: obj.writer
        }).then(() => {
            console.log(obj.title +" "+obj.writer);
            dispacth(board_update(obj));
        })
    }
}

// 초기 state
const initialState ={
    boards:[]
};

// actions 정의
export default handleActions({
    [BOARD_SAVE]: (state, {payload: obj}) => {
        let boards = state.boards;
        return {boards: boards.concat(obj)}
    },
    [BOARD_REMOVE]: (state, {payload: dId}) => {
        let boards = state.boards;
        return {boards: boards.filter(boards => boards.id !== dId)}
    },
    [BOARD_UPDATE]: (state, { payload: data}) => {
        let boards = state.boards;
        return {boards: boards.map(board => board.id === data.id ? ({...board, title: data.title, writer: data.writer}): board)}
    },
    [BOARD_LIST]: (state, {payload: data}) => {
        return {boards: data}
    }
}, initialState);
