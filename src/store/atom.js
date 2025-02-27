import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
/**
 * 🔹 Atom이란?
 * - Recoil에서 상태(state)를 관리하는 기본 단위.
 * - 전역에서 접근 가능하며, 어떤 컴포넌트에서든 읽고 수정할 수 있음.
 * - Atom을 구독하는 컴포넌트는 값이 변경될 때 자동으로 리렌더링됨.
 * - Redux의 store 개념과 유사하지만, 더 가볍고 선언적임.
 */


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
    default: false, //사이드바 열림
});




/* ------------------ 미사용  ------------------------- */
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
