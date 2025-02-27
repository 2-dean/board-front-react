import BasePage from "./common/BasePage";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { createSample, removeSample } from '../reducer';

export default function BmDrv() {
    const dispatch = useDispatch();

    //페이지 정보
    const name = "BmDrv";
    const title = "기사관리";
    const subTitle = "IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.";
    const menuIndex = 4;

    // 시트 옵션 설정
    const sheetOptions = {
        Def: { Col: { RelWidth: 1 } },
        Cfg: {
            SearchMode: 0
        },
        LeftCols: [
            {
                Header: "No",
                Type: 'Int',
                Name: 'SEQ',
                Width: 80
            }
        ],
        Cols: [
            { Header: "이름", Name: "drv_nm", Type: "Text" },
            { Header: "사원번호", Name: "drv_cd", Type: "Text", Align: "center" },
            { Header: "입사일", Name: "upd_dtm", Type: "Text" },
            { Header: "비고", Name: "rm", Type: "Text" },
        ],
        Events: {},
    };

    const options = {
        id: "sheet",
        el: "sheetDiv",
        height: "100%",
        width: "100%",
        options: sheetOptions,
        data: []
    };

    useEffect(() => {
        console.log("[BmDrv] 마운트")
        dispatch(createSample(name, title, subTitle, options, menuIndex));
        return () => {
            dispatch(removeSample());
            console.log("[BmDrv] 언마운트")
        }
    }, []);

    const searchFields = [{ label: "이름", name: "name", type: "input", placeholder: "이름 입력하세요" }];

    return (
        <>
            <BasePage searchFields={searchFields}/>
        </>
    );
}
