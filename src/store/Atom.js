// Atom은 상태(state)의 일부를 나타낸다. Atoms는 어떤 컴포넌트에서나 읽고 쓸 수 있다.
// atom의 값을 읽는 컴포넌트들은 암묵적으로 atom을 구독한다.
// 그래서 atom에 어떤 변화가 있으면 그 atom을 구독하는 모든 컴포넌트들이 재 렌더링 되는 결과가 발생할 것이다.

import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 로그인 사용자 
export const userState = atom({
        key: 'userState',
        default: {
            id: null,
            password: null,
            name: null,
            isLogin: false,
        },
        effects_UNSTABLE: [persistAtom],// api를 한번 더 호출하는게 나음ㅎ
    }
);



// ✅ 사이드바 상태를 전역으로 관리
export const sidebarState = atom({
    key: "sidebarState",
    default: true, //사이드바 열림
});






// 게시글 전체
export const boardListState = atom({
        key: 'boardListState',
        default: [],
        // effects_UNSTABLE: [persistAtom],
    }
);

// 게시글 페이지별 
export const boardPageListState = atom({
    key: 'boardPageList',
    default: [],
    //effects_UNSTABLE: [persistAtom],
})

// 게시글 상세
export const boardState = atom({
    key: 'boardState',
    default: [],
})

// 페이징 현재 페이지
export const activePageState = atom({
    key: 'activePageState',
    default: 1,
})


// 댓글 전체
export const commentListState = atom({
        key: 'commentListState',
        default: [],
        // effects_UNSTABLE: [persistAtom],
    }
);

// 댓글 페이지별 
export const commentPageListState = atom({
    key: 'commentPageListState',
    default: [],
    //effects_UNSTABLE: [persistAtom],
})
