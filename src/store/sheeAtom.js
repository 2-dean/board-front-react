import { atom, useRecoilState } from 'recoil';

// 초기 상태
const initialState = {
    title: '',
    subTitle: '',
    name: '',
    sheet: [],
    options: [],
    menuIndex: null
};

// name 상태 관리
export const nameState = atom({
    key: 'nameState',
    default: '', // 초기값
});

// 탭 상태 (각 탭별 상태를 저장하는 atom)
export const tabPageState = atom({
    key: 'tabPageState', // 탭별 페이지 상태를 저장 (기존 tabsState -> tabPageState로 변경)
    default: {},         // 각 탭의 상태는 key-value 형태로 관리
});

// 시트를 추가하는 함수
export const useCreateSheet = () => {
    const [tabs, setTabs] = useRecoilState(tabPageState);

    const createSheet = (tabId, newSheet) => {
        setTabs(prevTabs => ({
            ...prevTabs,
            [tabId]: {
                ...prevTabs[tabId],
                sheet: prevTabs[tabId]?.sheet ? [...prevTabs[tabId].sheet, newSheet] : [newSheet], // ✅ sheet가 없으면 새 배열로 초기화
            },
        }));
    };

    return createSheet;
};

// 샘플을 추가하는 함수
export const useCreateSample = () => {
    const [tabs, setTabs] = useRecoilState(tabPageState);

    const createSample = (tabId, title, subTitle, options, menuIndex) => {
        setTabs(prevTabs => ({
            ...prevTabs,
            [tabId]: {
                ...prevTabs[tabId],
                title,
                subTitle,
                options: [...(prevTabs[tabId]?.options || []), options],
                menuIndex
            },
        }));
    };

    return createSample;
};

// 샘플을 삭제하는 함수
export const useRemoveSample = () => {
    const [tabs, setTabs] = useRecoilState(tabPageState);

    const removeSample = (tabId) => {
        setTabs(prevTabs => {
            const updatedTabs = { ...prevTabs };
            delete updatedTabs[tabId]; // 해당 탭의 데이터를 삭제
            return updatedTabs;
        });
    };

    return removeSample;
};
