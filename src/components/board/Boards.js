import React, { useEffect, useRef } from 'react';
import loader from '@ibsheet/loader';

const SheetComponent = () => {
    const sheetRef = useRef(null);
    const sheetIdRef = useRef(null);

    useEffect(() => {
        const sheetElement = document.getElementById('sheetContainer');
        if (!sheetElement) {
            console.error('Sheet container not found');
            return;
        }

        // IBSheet 로드 및 시트 생성
        loader.load().then(() => {
            loader.createSheet({
                el: sheetElement,
                options: {
                    // 시트 옵션 설정
                    Cfg: { SearchMode: 0 },
                    Cols: [
                        { Name: 'idx', Width: 100, Type: 'Int', Header: [{ Value: '글번호' }] },
                        { Name: 'title', Width: 300, Type: 'Text', Header: [{ Value: '제목' }] },
                        { Name: 'name', Width: 150, Type: 'Text', Header: [{ Value: '작성자' }] },
                        { Name: 'saveDate', Width: 200, Type: 'Date', Header: [{ Value: '시간' }] }
                    ]
                },
                data: [
                    // 예시 데이터
                    { idx: 1, title: '첫 번째 게시글', name: '홍길동', saveDate: '2025-02-20' },
                    { idx: 2, title: '두 번째 게시글', name: '김철수', saveDate: '2025-02-21' }
                ]
            }).then(sheet => {
                sheetIdRef.current = sheet.id;
                console.log('IBSheet created with ID:', sheet.id);
            }).catch(error => {
                console.error('Failed to create IBSheet:', error);
            });
        }).catch(error => {
            console.error('Failed to load IBSheet:', error);
        });

        return () => {
            if (sheetIdRef.current) {
                loader.removeSheet(sheetIdRef.current);
                console.log('IBSheet removed with ID:', sheetIdRef.current);
            }
        };
    }, []);

    return (
        <div>
            <h2>게시판 목록</h2>
            <div id="sheetContainer" style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
};

export default SheetComponent;
