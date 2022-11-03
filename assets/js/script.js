var navList = document.querySelectorAll('.nav-list');
var hamburger = document.querySelector('.hamburger');
var bannerList = document.querySelectorAll('.banner-list');
var next = document.querySelector('.next-btn');
var prev = document.querySelector('.prev-btn');
var financeList = document.querySelectorAll('.finance-list');
var readMore = document.querySelectorAll('.finance-list a');
var cancelContent = document.querySelectorAll('.cancel-content');
var mainForm = document.mainForm;
var mainFullName =  mainForm.fullName;
var mainEmail =  mainForm.email;
var mainSubject =  mainForm.subject;
var mainTextarea =  mainForm.textarea;
var footerForm = document.footerForm;
var footerFullName =  footerForm.fullName;
var footerEmail =  footerForm.email;
var footerTextarea =  footerForm.textarea;
var stringPattern = /^[a-zA-Z]+\s[a-zA-Z]+$/;
var generalPattern = /^[\w\D\s]+$/;
var emailPattern = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
var inputGroup = document.querySelectorAll('.input-group');
var formWrapper = document.querySelector('.callback .wrapper');

// nav function 
navList.forEach(function (list) {
  list.addEventListener('click', function () {
    var activeNav = document.querySelector('.active-nav');
    activeNav.classList.remove('active-nav');
    list.classList.add('active-nav');
  });
});

// hamburger function
var hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active-hamburger');
  document.documentElement.classList.toggle('removeScroll');
});


if (document.body.classList.contains("home")) {
    homeFunction();
} else if (document.body.classList.contains("services")) {
    servicesFunction();
}

function homeFunction() {
  // slider function
  var initial = 0;
  bannerList[0].classList.add("active-banner");

  setInterval(function () {
    initial++;
    if (initial == bannerList.length) {
      initial = 0;
    }
    slider(initial);
  }, 4000);

  function slider(num) {
    for (let i = 0; i < bannerList.length; i++) {
      bannerList[i].classList.remove("active-banner");
    }
    bannerList[num].classList.add("active-banner");
  }
  slider(initial);
  next.addEventListener("click", function () {
    initial++;
    if (initial == bannerList.length) {
      initial = 0;
    }
    slider(initial);
  })
  prev.addEventListener("click", function () {
    initial--;
    if (initial < 0) {
      initial = bannerList.length - 1;
    }
    slider(initial);
  })

  // Read more function
  readMore.forEach(function (btn,index) {
    btn.addEventListener('click',function () {
      var activeFinance = document.querySelector('.active-finance');
      console.log('wor');
      if (activeFinance) {
        activeFinance.classList.remove('active-finance'); 
      }
      financeList[index].classList.add('active-finance');
      cancelContent[index].addEventListener('click',function () {
        financeList[index].classList.remove('active-finance'); 
      })
    })
  })

  // form validation function
  commonFormJS(mainForm, mainFullName, mainEmail, mainTextarea, mainSubject);
  commonFormJS(footerForm, footerFullName, footerEmail, footerTextarea);
}

// Error function
function validateInput(input, pattern, err) {
  if(pattern.test(input.value)) {
    input.nextElementSibling.classList.remove("show-error");
    return true;
  } else {
    input.nextElementSibling.classList.add("show-error");
    input.nextElementSibling.innerText = err;
    return false;
  }
}

// commonFormJS
function commonFormJS(form, fullname, email, textarea, subject) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var checkFullName = validateInput(fullname, stringPattern, "space separated first & last name");
    var checkEmail = validateInput(email, emailPattern, "please write valid email address");
    var checkTextarea = validateInput(textarea, generalPattern, "please fill the input");

    
    if(e.target == mainForm) {
      var checkSubject = validateInput(subject, generalPattern, "please fill the input");

      if (checkFullName && checkEmail && checkSubject && checkTextarea) {
        alert("form submitted successfully");
        var div = document.createElement('div');
        div.className = 'success-div';
        div.innerHTML = `<p>success</p>`;
        form.appendChild(div);
        form.reset();
      }
    }

    if (e.target == footerForm) {
      if (checkFullName && checkEmail && checkTextarea) {
        alert("form submitted successfully");
        var div = document.createElement('div');
        div.className = 'success-div';
        div.innerHTML = `<p>success</p>`;
        form.appendChild(div);
        form.reset();
      }
    }
  });
}

// commonFormJS(mainForm, mainFullName, mainEmail, mainTextarea, mainSubject);
// commonFormJS(footerForm, footerFullName, footerEmail, footerTextarea);



















