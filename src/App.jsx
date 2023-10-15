import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // 声を選ぶ
  const [selectedVoice, setSelectedVoice] = useState(0);

  // 聞き取り中か否かを制御
  const [isListening, setIsListening] = useState(false);

  // voiceList
  const [voiceList, setVoiceList] = useState([]);

  // 言語を聞き取る用のAPIを使用
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // 日本語を認識するようにする
  recognition.lang = "ja-JP";

  // 優先的に聞き取って欲しい単語を定義
  const grammar = "#JSGF V1.0; grammar colors; public <color> = 赤 | 青 | 緑;";
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  // 優先的に聞き取って欲しい単語を追加
  recognition.grammars = speechRecognitionList;

  // 聞き取った結果を処理する
  recognition.onresult = (event) => {
    // この場所に聞き取った結果が入る
    const speech = event.results[0][0].transcript;
    console.log("聞き取った内容", speech);
    speak(speech);
  };

  /**
   * 音声認識終了時の挙動
   */
  recognition.onend = (e) => {
    // リッスンを終了
    setIsListening(false);
  };

  /**
   * エラー時の挙動
   */
  recognition.onerror = (e) => {
    if (e.error === "no-speech") return alert("何かお話をしてください。");
    return alert("うまく聞き取れませんでした。");
  };

  // リッスンボタン押下時の処理
  const handleListen = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // リッスン開始
      recognition.start();
    } else {
      // リッスン終了
      recognition.stop();
    }
  };

  // PCが話す関数
  const speak = (message) => {
    // 話す用のAPIを使用
    const speech = new SpeechSynthesisUtterance(message);

    // voiceListが取得できていなければ取得して追加
    if (voiceList.length === 0) {
      const voices = window.speechSynthesis.getVoices();
      setVoiceList(voices);
    }

    // 選択したvoiceを適用
    speech.voice = voiceList[selectedVoice];

    // 日本語を認識するようにする
    speech.lang = "ja-JP";

    // 既存のキューをキャンセル
    window.speechSynthesis.cancel();

    // 聞き取った内容を話す
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    // 1回話させないとvoiceListを取得できないので、無言を話させている
    speak("");
  }, []);

  // voiceList
  const voices = [
    { name: "日本語1", value: 0 },
    { name: "日本語2", value: 1 },
    { name: "日本語3", value: 2 },
    { name: "日本語4", value: 3 },
    { name: "ドイツ語1", value: 4 },
    { name: "英語（アメリカ）", value: 5 },
    { name: "英語（イギリス）1", value: 6 },
    { name: "英語（イギリス）2", value: 7 },
    { name: "スペイン語（スペイン）", value: 8 },
    { name: "スペイン語（アメリカ）", value: 9 },
    { name: "フランス語（フランス）", value: 10 },
    { name: "ヒンディー語（インディア）", value: 11 },
    { name: "インドネシア語（インドネシア）", value: 12 },
    { name: "イタリア語（イタリア）", value: 13 },
  ];

  /**
   * voiceを選ぶ処理
   */
  const selectVoice = (value) => {
    setSelectedVoice(value);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <h2>音声認識</h2>
          <button onClick={handleListen}>
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>
        <div>
          <h2>Voiceリスト</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
            }}
          >
            {voices.map((voice) => (
              <button
                style={{
                  border:
                    selectedVoice === voice.value
                      ? "2px solid black"
                      : "0px solid ",
                }}
                key={voice.value}
                onClick={() => selectVoice(voice.value)}
              >
                {voice.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
