'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(
  'click',
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリアの作成
    resultDivision.innerText = '';
    
    // headerDivision の作成
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果';

    // bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    // resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    // headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision);
    resultDivision.appendChild(bodyDivision);

    // TODO ツイートエリアの作成
    tweetDivision.innerText = '';
        const anchor = document.createElement('a');
    const hrefValue =
      'https://x.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたを動物に例えると')+'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたを動物に例えると';

    tweetDivision.appendChild(anchor);
    
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

const answers = [
  '###userName###を動物に例えると犬です。###userName###は明るく親しみやすく、仲間を大切にするタイプ。周囲の人を笑顔にすることが得意です。',
  '###userName###を動物に例えると猫です。###userName###は自分の考えや時間を大切にするタイプ。周囲に流されず、自分らしく行動できます。',
  '###userName###を動物に例えるとキツネです。###userName###は頭の回転が速く、物事を工夫して解決するタイプ。独創的なアイデアを考えることが得意です。',
  '###userName###を動物に例えるとフクロウです。###userName###は知識を集めてじっくり考えるタイプ。冷静に状況を分析し、慎重に判断できます。',
  '###userName###を動物に例えるとイルカです。###userName###は新しいことが好きで、人との交流を楽しむタイプ。周囲と協力しながら物事を進められます。',
  '###userName###を動物に例えるとライオンです。###userName###は自信を持って目標に向かって進むタイプ。困難な状況でも周囲を引っ張る力があります。',
  '###userName###を動物に例えるとウサギです。###userName###は周囲の変化や人の気持ちに敏感なタイプ。相手の立場を考え、細やかな気配りができます。',
  '###userName###を動物に例えると熊です。###userName###は落ち着きがあり、じっくり物事に取り組むタイプ。周囲から頼りにされる存在です。',
  '###userName###を動物に例えるとオオカミです。###userName###は自分の信念を持ち、目標に向かって突き進むタイプ。自分で考えて道を切り開くことが得意です。',
  '###userName###を動物に例えるとペンギンです。###userName###は周囲との協力を大切にし、計画的に物事を進めるタイプ。チームで力を発揮できます。',
  '###userName###を動物に例えるとリスです。###userName###は好奇心旺盛で、細かなことにもよく気が付くタイプ。複数のことに興味を持ち、素早く行動できます。',
  '###userName###を動物に例えるとシカです。###userName###は落ち着いた雰囲気で、周囲との調和を大切にするタイプ。相手を尊重し、丁寧に物事を進めます。',
  '###userName###を動物に例えるとゾウです。###userName###は大きな視点で物事を考え、仲間を支えるタイプ。困難なことにも粘り強く取り組めます。',
  '###userName###を動物に例えるとカメです。###userName###は焦らず着実に努力を積み重ねるタイプ。自分のペースを守り、長期的な目標を達成できます。',
  '###userName###を動物に例えるとワシです。###userName###は高い目標を持ち、広い視野で物事を考えるタイプ。未来を見据えて挑戦することが得意です。',
  '###userName###を動物に例えるとラッコです。###userName###は好奇心が旺盛で、楽しみながら物事に取り組むタイプ。周囲を和ませ、新しいアイデアを生み出します。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎を動物に例えるとリスです。太郎は好奇心旺盛で、細かなことにもよく気が付くタイプ。複数のことに興味を持ち、素早く行動できます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎を動物に例えるとラッコです。次郎は好奇心が旺盛で、楽しみながら物事に取り組むタイプ。周囲を和ませ、新しいアイデアを生み出します。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
    '花子を動物に例えると猫です。花子は自分の考えや時間を大切にするタイプ。周囲に流されず、自分らしく行動できます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.log('診断結果の文章のテスト終了');

  console.log('同じ名前なら、同じ結果を出力することのテスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('次郎');
  console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('花子');
  console.assert(
    assessment('花子') === assessment('花子'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  )

  console.log('同じ名前なら、同じ結果を出力することのテスト終了');
}

test();