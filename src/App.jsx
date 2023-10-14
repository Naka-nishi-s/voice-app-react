// App.js
import React, { useState } from "react";
import "./App.css";

const App = () => {
  // 聞き取り中か否かを制御
  const [isListening, setIsListening] = useState(false);

  // 言語を聞き取る用のAPIを使用
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // 言語設定
  recognition.lang = "ja-JP";

  // 聞き取った結果を処理する
  recognition.onresult = (event) => {
    // この場所に聞き取った結果が入る
    const speech = event.results[0][0].transcript;
    console.log(speech);
    speak(speech);
  };

  // リッスンボタン押下時の処理
  const handleListen = () => {
    setIsListening(!isListening);
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  // PCが話す関数
  const speak = (message) => {
    // PCに話してもらうspeechを定義
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "ja-JP";

    // 既存のキューをキャンセル
    window.speechSynthesis.cancel();

    // speechの内容を話す
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="App">
      <button onClick={handleListen}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
};

export default App;
