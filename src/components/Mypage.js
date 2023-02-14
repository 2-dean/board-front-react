function Mypage() {
  const Logout = () => {
    console.log(">>> 로그아웃");
  };

  return (
    <>
      <h1>MyPage</h1>
      <p>USER 님, 안녕하세요!</p>
      <button onClick={() => Logout()}>logout</button>
    </>
  );
}

export default Mypage;
