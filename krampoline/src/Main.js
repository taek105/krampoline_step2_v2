import { useState } from 'react';
import './App.css';
import { instance } from "./api.js";

function Main() {
  const [apiTest, setApiTest] = useState(false);
  const [dbData, setDbData] = useState(null);

  const handleApiOnclick = async () => {
    try {
      await instance.get("/test");
      setApiTest(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDbOnClick = async () => {
    try {
      const response = await instance.get("/api/db");
      setDbData(response.data);
    } catch (err) {
      console.log(err);
      setDbData([]); // 실패 시 빈 배열
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Krampoline!</h1>

        <div className="button-group">
          <button onClick={handleApiOnclick}>API TEST</button>
          <div className="status">{apiTest ? "✅ CONNECTED" : "❌ NOT YET"}</div>
        </div>

        <div className="button-group">
          <button onClick={handleDbOnClick}>DB TEST</button>
        </div>

        {/* 🔹 DB 데이터 카드 스타일 출력 */}
        {dbData !== null && (
          <div className="data-container">
            <h3>📌 DB 데이터 목록</h3>
            {dbData.length > 0 ? (
              <div className="card-list">
                {dbData.map((item) => (
                  <div className="card" key={item.id}>
                    <p className="card-id">ID: {item.id}</p>
                    <p className="card-detail">{item.detail}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">데이터 없음</p>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default Main;
