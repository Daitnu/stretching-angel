require('dotenv').config();

const Slack = require('slack-node');  // 슬랙 모듈 사용

const { WEB_HOOK_URL } = process.env;
const slack = new Slack();
slack.setWebhook(WEB_HOOK_URL);

const stretching = [{
  title: '🐢거북목 스트레칭',
  value: `
1. 양손으로 턱을 잡고 턱을 아래로 잡아당기세요.
2. 목을 좌우로 기울이면서 위쪽으로 쭉 끌어당기세요.
3. 좌우 어깨를 바라보면서 목을 좌우로 돌리세요.
4. 턱을 거북이처럼 앞으로 쭉 뺐다 넣었다 반복하세요.
5. 양손으로 뒤통수를 감싼 뒤, 턱이 가슴에 닿도록 고개를 앞으로 푹 숙이세요.
6. 팔꿈치를 구부려 가슴을 활짝 펴고 등 뒤 날개 뼈가 서로 닿도록 한 후, 머리를 뒤로 최대한 젖히세요.
7. 허리와 목을 곧게 편다. 양쪽 어깨에 힘을 뺀 뒤, '으쓱으쓱' 하듯이 어깨만 천천히 올렸다가 내리세요.
  `
}, {
  title: '😮기지개',
  value: '허리를 곧개 펴고 팔과 다리를 쭈욱~~'
}];

const colors = [
  '#dee2e6',
  '#ffa8a8',
  '#faa2c1',
  '#e599f7',
  '#b197fc',
  '#91a7ff',
  '#74c0fc',
  '#66d9e8',
  '#63e6be',
  '#8ce99a',
  '#c0eb75',
  '#ffe066',
  '#ffc078',
];

const randomlyPick = (array, num = 5) => {
  const picked = [];
  const len = array.length;
  let randIdx;
  let cnt = 0;

  if (len < num) return array;

  while (cnt < num) {
    while (true) {
      randIdx = Math.floor(Math.random() * len);
      if (!picked.includes(randIdx)) break;
    }
    picked.push(randIdx);
    cnt++;
  }

  return picked.map(idx => array[idx]);
};

const makeAttachments = () => {
  const color = randomlyPick(colors, 1)[0];
  const fields = randomlyPick(stretching).map(item => {
    const { title, value } = item;
    return {
      title,
      value,
      short: false,
    }
  });

  return [{
    color,
    fields
  }]
};

const send = async () => {
  const attachments = makeAttachments();

  slack.webhook({
    text: "스트레칭 요정이에요~!",
    attachments
  }, function (err, response) {
    console.log(response);
  });
}

module.exports = {
  main: send
};
