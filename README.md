# Boiler plate

## 어플리케이션 실행방법
1. 파일 다운로드 후, `server > config` 파일 안에 **dev.js** 파일 생성
2. mongoDB 정보를 **dev.js** 안에 넣어준다. [⭐️ mongoDB 연결 방법 여기 참고](https://www.youtube.com/watch?v=IHjolKwrjPE&list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T&index=3)    
3. 터미널 실행 후, **boiler-plate** 경로에서 `npm install` (백엔드 종속성 다운받기)
4. 터미널 경로 `cd client` 입력하여 클라이언트 디렉토리에서 `npm install` (프론트 종속성 다운받기)    
5. `cd ..`으로 **boiler-plate** 경로로 이동 후, `npm run dev` 실행

---

⭐️ dev.js 파일 참고
``` javascript
module.exports = {
  mongoURI: "본인 URI 입력"
}
```