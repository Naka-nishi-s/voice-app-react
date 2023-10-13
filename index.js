// 音声入力用のAPIを取得
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// 言語の設定
recognition.lang = "ja-JP";

// ボタンのクリック時に音声入力をOn
const btn = document.querySelector("#start");
btn.addEventListener("click", () => {
  recognition.start();
});

// 音声入力の結果が入る
recognition.onresult = (event) => {
  const speech = event.results[0][0].transcript;
  alert(speech);
};
