const addQuestionBtn = document.getElementById("add-question");

const questions = JSON.parse(window.localStorage.getItem("questions")) ??
  [];

UpdateQuestionList()


addQuestionBtn.addEventListener("click", () => {
  
 
})













function createQuestionCard({
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

            <button 
            class="btn secondry-btn" 
            id="see-question-details"
            onclick="window.location.assign("/question.html?id=${id}")">
              مشاهده جزییات
            </button>
          </div>
    </section>
  
  `
}


function addQuestion({title,content}) {
  questions.push({
    id: crypto.randomUUID(),
    title,
    content,
    commentNumber: Math.trunc(Math.random() * 20),
    time:randomDate().time ,
    date:randomDate().date
  })

  window.localStorage.setItem("questions", JSON.stringify(questions))
  UpdateQuestionList()
}


function UpdateQuestionList() {
  const questionlistElm = document.getElementById("question-list");
  
  if (!questionlistElm) return
  
  questionlistElm.innerHTML = (questions ?? [])
    .map((question) => createQuestionCard(question))
    .join(" ")
   
}




















function randomDate() {
  const start = new Date(2010, 0, 1);
  const end = new Date();
  const date =new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = `${hour}:${minute}`
  
  return {date:date.toLocaleString("fa-IR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }),time:time}
}






// this function just for make fake data for test
function addFakeData() {
  const exampleList = [
    {
      title: "عدم ارسال ایمیل به علت غیرفعال کردن دسترسی امنیت پایین جیمیل توسط گوگل",
      content:"سلام وقت بخیر،گوگل دسترسی سطح پایین جیمیل رو کلا غیرفعال کرده،میشه راهنمایی بفرمایید که باید چه کار انجام داد؟"
    },
    {
      title: "عدم ارسال ایمیل به علت غیرفعال کردن دسترسی امنیت پایین جیمیل توسط گوگل",
      content:"سلام وقت بخیر،گوگل دسترسی سطح پایین جیمیل رو کلا غیرفعال کرده،میشه راهنمایی بفرمایید که باید چه کار انجام داد؟"
    },
    {
      title: "ادغام مقدار تکست باکس ها",
      content:"سلام وقت شما بخیر من می خوام درون یک فرم چند تکست باکس داشته باشم که همه تکس باکس ها مقدارشان در یک تکس باکس با زدن یک دکمه نمایش داده شود مثلا ماهی/فیله/منجمد/20 کیلویی. یعنی ماهی در یک تکس باکس فیله در یکی منجمد در یکی 20کیلویی هم در یک تک..."
    },
    {
      title: "محاسبه مساحت دایره با متد void",
      content:"سلام من یه سوال داشتم درباره تمرین Void سوالش اینه : متدی بنویسید که اندازه ضلع مربع را از ورودی دریافت کند و مساحت مربع را محاسبه کند و در خروجی نمایش دهد."
    },
    {
      title: "انتشار دوره ساختمان وب",
      content:"سلام خسته نباشید آقای ملکی دوره ساختمان وب کی آماده میشه میخوام بخرمش اگر میشه کم کم قسمت هارو بزارید که اینطوری کامل بخوایید بزارید دیر میشه"
    },
    {
      title: "کار نکردن دکمه ها در بوت استرپ",
      content:"با عرض سلام و خسته نباشید من دارم آموزش بوت استرپ را کار میکنم در قسمت ساخت دکمه به مشکل بر خوردم دکمه را میسازم و دکمه نمایش داده میشود ولی عملی انجام نمیدهد ممنون"
    },
    {
      title:"یه سوالی در مورد حل به تمرین داشتم",
      content:"یه مشکلی توی نوشتن کد های تمرین داشتم اینکه فرض کنید یه دیتا بیسی درست کردیم ک توش جدول هایی با نام های (درس ، اطلاعات مدرس، اطلاعات دانشجو ، اطلاعات انتخاب واحد )وجود دارن و فرض کنیم مدرسی با نام (اکبری) توی جدول (اطلاعات مدرس )وجود داره میخایم نام دانشجویانی که تمام درس های استاد اکبر..."
    },
  ]

  exampleList.forEach((q) => {
    addQuestion({title:q.title,content:q.content})
  })
  
}