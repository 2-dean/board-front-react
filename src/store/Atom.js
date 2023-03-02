// Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다.
// atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
// 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생할 것이다.

import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist();


export const userState = atom({
        key: 'userState',
        default: {
            id: null,
            password: null,
            name: null,
            isLogin: false,
        },
        //effects_UNSTABLE: [persistAtom],// api를 한번 더 호출하는게 나음ㅎ
    }
);

export const tokenState = atom({
    key: 'tokenState',
    default: {
        access: '',
        expirationTime: ''
    }
})


export const boardList = atom({
        key: 'boardList',
        default: [],
        // effects_UNSTABLE: [persistAtom],
    }
);


export const pageInfo = atom({
        key: 'pageInfo',
        default: {
            pageNum: 1,    //현재페이지
            pageSize: '',   //페이지 범위
            total: '',      //총아이템 갯수
            hasNextPage: '',     //첫번째 페이지 여부 (이전페이지 노출에사용)
            hasPreviousPage: '', //마지막 페이지 여부
        },
        effects_UNSTABLE: [persistAtom],
    }
);