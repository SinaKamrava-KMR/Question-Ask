
const answers = (JSON.parse(window.localStorage.getItem(`answers`)) ?? []);

const answersElmWrapper = document.getElementById("answer-list");
const sendAnswerBtn = document.getElementById("send-answer-btn");
const answerInput = document.getElementById("answer-input")

sendAnswerBtn.addEventListener("click", () => {
  if (answerInput.value == "") return;

  addAnswer({ userName: "سارا بیات", content: answerInput.value });
  showAlert();
  answerInput.value=""
})


addUserQuestion()
updateAnswersList()
// fakeAnswer()


function updateAnswersList() {
  answersElmWrapper.innerHTML = answers
    .filter(({ qId }) => qId === findQuestionId())
    .map((answer) => createAnswerCard(answer))
    .join(" ")
}

function addAnswer({userName = "", content=""}) {
  answers.push({
    id: crypto.randomUUID(),
    qId: findQuestionId(),
    userName: userName,
    content: content,
    time: randomDate().time,
    date: randomDate().date,
    likeCount: Math.trunc(Math.random() * 50),
    disLikeCount: Math.trunc(Math.random() * 50)
  })

  window.localStorage.setItem(`answers`, JSON.stringify(answers));
  updateAnswersList()

}


function findQuestionId() {
  return window.location.search.split("=")[1];
}

function getQuestion() {
  const id = findQuestionId()
 return questions.filter((question) => question.id == id)[0]
}

function createSingleQuestionCard({
  id="",
  title = "",
  time = "",
  date = "",
  commentNumber = 2,
  content=""
  
}) {
  return `
<section class="question-card">
          <header class="question-card__header">
                <div class="question-card__avatar">
                  <img src="/src/img/user${Math.trunc(Math.random()*5)+1}.jpg" alt="user img">
                </div>
                <div class="question-card__question-title">${title}</div>
                <div class="spacer"></div>
                <div class="question-card__date-time">
                  <div class="question-card__time">
                    <span>ساعت:</span>
                    <span>${time}</span>
                  </div>
                  <div class="question-card__date">
                    <span>تاریخ :</span>
                    <span>${date}</span>
                  </div>
                </div>


                <div class="question-card__comment">
                  <img src="/src/img/comment-icon.svg" alt="comment">
                  <span>${commentNumber.toLocaleString("fa-IR", {
                    useGrouping:false
                  })}</span>
                </div>
          </header>

          <div class="question-card__wrapper">
            <p>${content}</p>

          </div>
    </section>
  
  `
}

function addUserQuestion() {
  const userQuestionWrapper = document.getElementById("main__user-question");
  userQuestionWrapper.innerHTML = createSingleQuestionCard(getQuestion())
}

function createAnswerCard({
  id = "",
  qId = "",
  userName = "",
  time = "",
  date = "",
  likeCount = 0,
  disLikeCount = 0,
  content=""
}) {
  return `
  <section class="answer-card">
  <header class="answer-card__header">
        <div class="answer-card__avatar">
          <img src="/src/img/user${Math.trunc(Math.random()*5)+1}.jpg" alt="user img">
        </div>
        <div class="answer-card__user-name">${userName}</div>
        <div class="spacer"></div>
        <div class="answer-card__date-time">
          <div class="answer-card__time">
            <span>ساعت:</span>
            <span>${time}</span>
          </div>
          <div class="answer-card__date">
            <span>تاریخ :</span>
            <span>${date}</span>
          </div>
        </div>


        <div class="answer-card__status">
            <div class="status__icon-wrapper">
              <div><img src="/src/img/happy.png" alt="happy"></div>
              <span>${likeCount.toLocaleString("fa-IR",{useGrouping:false})}</span>
            </div>
            <div class="status__icon-wrapper">
              <div><img src="/src/img/sad.png" alt="happy"></div>
              <span>${disLikeCount.toLocaleString("fa-IR",{useGrouping:false})}</span>
            </div>
        </div>
  </header>

  <div class="answer-card__wrapper">
    <p> ${content}</p>

    <div class="answer-card__btns-wrapper">
      <button id="like-btn" class="btn secondry-btn status__icon-wrapper">
        <div><img src="/src/img/happy.png" ></div>
        <span>پاسخ خوب بود</span>
      </button>
      <button id="dislike-btn" class="btn secondry-btn status__icon-wrapper red">
        <div><img src="/src/img/sad.png" ></div>
        <span>پاسخ خوب نبود</span>
      </button>

    </div>
  </div>
</section>
`
}












function fakeAnswer() {
  const exampleList = [
    {
      userName: "سینا",
      content:"سلام وقت بخیر،گوگل دسترسی سطح پایین جیمیل رو کلا غیرفعال کرده،میشه راهنمایی بفرمایید که باید چه کار انجام داد؟"
    },
    {
      userName:"علی یاسینی",
      content:"سلام وقت بخیر،گوگل دسترسی سطح پایین جیمیل رو کلا غیرفعال کرده،میشه راهنمایی بفرمایید که باید چه کار انجام داد؟"
    },
    {
      userName: "پروین اعتصامی",
      content:"سلام وقت شما بخیر من می خوام درون یک فرم چند تکست باکس داشته باشم که همه تکس باکس ها مقدارشان در یک تکس باکس با زدن یک دکمه نمایش داده شود مثلا ماهی/فیله/منجمد/20 کیلویی. یعنی ماهی در یک تکس باکس فیله در یکی منجمد در یکی 20کیلویی هم در یک تک..."
    },
    {
      userName:"یاشار صالحی",
      content:"سلام من یه سوال داشتم درباره تمرین Void سوالش اینه : متدی بنویسید که اندازه ضلع مربع را از ورودی دریافت کند و مساحت مربع را محاسبه کند و در خروجی نمایش دهد."
    },
    {
      userName: "رضا صادقی",
      content:"سلام خسته نباشید آقای ملکی دوره ساختمان وب کی آماده میشه میخوام بخرمش اگر میشه کم کم قسمت هارو بزارید که اینطوری کامل بخوایید بزارید دیر میشه"
    },
    {
      userName: "هوشنگ ابتهاج",
      content:"با عرض سلام و خسته نباشید من دارم آموزش بوت استرپ را کار میکنم در قسمت ساخت دکمه به مشکل بر خوردم دکمه را میسازم و دکمه نمایش داده میشود ولی عملی انجام نمیدهد ممنون"
    },
    {
      userName:"حسن کلید",
      content:"یه مشکلی توی نوشتن کد های تمرین داشتم اینکه فرض کنید یه دیتا بیسی درست کردیم ک توش جدول هایی با نام های (درس ، اطلاعات مدرس، اطلاعات دانشجو ، اطلاعات انتخاب واحد )وجود دارن و فرض کنیم مدرسی با نام (اکبری) توی جدول (اطلاعات مدرس )وجود داره میخایم نام دانشجویانی که تمام درس های استاد اکبر..."
    },
  ]

  exampleList.forEach((answer) => {
    addAnswer(answer);
  })
}