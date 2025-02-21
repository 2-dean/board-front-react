import loader from '@ibsheet/loader';

// ✅ IBSheet 글로벌 설정
loader.config({
    registry: [
        {
            name: "ibsheet",
            baseUrl: "/ibsheet/",  // 🔥 public/ibsheet 경로 설정
            locales: ["ko"],
        },
    ],
});
