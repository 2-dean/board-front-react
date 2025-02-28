import React, { useEffect, useRef } from "react";
import loader from "@ibsheet/loader";
import {useDispatch, useSelector} from "react-redux";
import {createSheet} from "../../reducer";

const IBSheet8 = () => {

  /*
  loader.config({
    registry: [{
      name: 'ibsheet',
      baseUrl: '/',
      theme:"default",
      locales:"ko"
      //plugins: ['common', 'dialog', 'excel']
    }]
  });

   */
//loader.load()

  const mounted= useRef(false);
  const state = useSelector(state => state);
  const name = state.name;
  const options = state.options;
  const dispatch = useDispatch();

  const basicStyle = (width) => ({
    width: width || "100%",
    height: "70vh",
  });

  const elStyle = (height) => ({
    width: "100vw",
    height: height || "inherit",
    "background-color": "antiquewhite"
  });

  useEffect(() => {

      if (!mounted.current) {
          mounted.current = true;
      } else if (options.length > 0) {
        console.log("----------- create Sheet mount")
        console.log(state)

        options.map(sheet => {
          eventBinding(name, sheet);
          // 시트생성
          console.log("sheet :: ",sheet )
          console.log("sheet.el : ",sheet.el )
          console.log("sheet.options : ",sheet.options )
          loader.createSheet({
                id: sheet.id,
                el: sheet.el,
                options: sheet.options
          })
              .then(sheet => {
                // 주의: 해당 구간에서 데이터 조회를 하면 안됩니다. 데이터 조회는 onRenderFirstFinish 이벤트에서 실행해야합니다.
                dispatch(createSheet(sheet));
              })
              .catch(err => {
                console.log('Failed to create sheet', err);
              });
      });
    }

    return () => {
        console.log("----------- create Sheet unmount")
        options.forEach(sheet => {
        loader.removeSheet(sheet.id);
      });
    };
  }, [options]);

  // 이벤트 바인딩
  const eventBinding = (name, sheet) => {
    const events = {
      onRenderFirstFinish: (evt) => {
        console.log("onRenderFirstFinish 이벤트 발생");

       if (evt.sheet.SearchMode === 0) {
          const data = sheet.data.length ? sheet.data : [];
          //if (data.length) evt.sheet.loadSearchData(data);
         // ✅ gridData가 있을 때만 loadSearchData 실행
        // if (gridData.length > 0) {
          // evt.sheet.loadSearchData(gridData);
        // }
        }

      },
      onBeforeDataLoad: (evt) => {
        let message = "";
        switch (evt.result) {
          case -1:
            message = "URL을 다시 확인해주세요.";
            break;
          case -3:
            message = "100 이하 또는 400 이상의 상태 코드입니다.";
            break;
          case -5:
            message = "서버를 실행하세요. (명령어: node app.js)";
            break;
          case -6:
            message = "연결 시간이 초과되었습니다.";
            break;
          case -7:
            message = "잘못된 데이터 형식입니다.";
            break;
          default:
            return;
        }
        evt.sheet.showMessage(message, evt.sheet.SuppressMessage + 1, 1);
      },
      onDataLoad: (evt) => {},
      onSearchFinish: (evt) => {},
    };

    return sheet;
  };

  return (
      <>
        {options.length > 0 &&
            options.map((sheet, index) => {
              return (
                  <div style={basicStyle(sheet.width)} key={sheet.id}>
                      <div id={sheet.el} style={elStyle(sheet.height)} key={index}></div>
                  </div>
              )
            })
        }
      </>
  );
};

export default IBSheet8;
