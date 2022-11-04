var navList = document.querySelectorAll('.nav-list');
var hamburger = document.querySelector('.hamburger');
var bannerList = document.querySelectorAll('.banner-list');
var next = document.querySelector('.next-btn');
var prev = document.querySelector('.prev-btn');
var financeList = document.querySelectorAll('.finance-list');
var navigationList = document.querySelectorAll('.navigation-list');
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
  var autoPlay = setInterval(bannerAutoPlay, 4000);
  function bannerAutoPlay() {
    initial++;
    if (initial == bannerList.length) {
      initial = 0;
    }
    slider(initial);
  }
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
    clearInterval(autoPlay);
    autoPlay = setInterval(bannerAutoPlay, 4000);
  })
  prev.addEventListener("click", function () {
    initial--;
    if (initial < 0) {
      initial = bannerList.length - 1;
    }
    slider(initial);
    clearInterval(autoPlay);
    autoPlay = setInterval(bannerAutoPlay, 4000);
  })

  // Read more function
  readMore.forEach(function (btn,index) {
    btn.addEventListener('click',function () {
      var activeFinance = document.querySelector('.active-finance');
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

function servicesFunction() {
  // Tab navigation function 
  navigationList.forEach(function(tablist,index){
    tablist.addEventListener('click', function () {
      var activeNavigation = document.querySelector('.active-navigation');
      var activeDetail = document.querySelector('.active-detail');
      var detailList = document.querySelectorAll('.detail-list');
      activeNavigation.classList.remove('active-navigation');
      tablist.classList.add('active-navigation');
      activeDetail.classList.remove('active-detail');
      detailList[index].classList.add('active-detail');
    })
  });

  // form validation function
  commonFormJS(mainForm, mainFullName, mainEmail, mainTextarea, mainSubject);
  commonFormJS(footerForm, footerFullName, footerEmail, footerTextarea);
}

blur(mainFullName, stringPattern, "*Space separated first & last name");
blur(mainEmail, emailPattern, "*Please write valid email address");
blur(mainSubject, generalPattern, "*Please fill the input");
blur(mainTextarea, generalPattern, "*Please fill the input");
blur(footerFullName, stringPattern, "*Space separated first & last name");
blur(footerEmail, emailPattern, "*Please write valid email address");
blur(footerTextarea, generalPattern, "*Please fill the input");

function blur(input, pattern, err) {
  input.addEventListener('blur', function () {
    validateInput(input, pattern, err);
  })
}

// Error function
function validateInput(input, pattern, err) {
  if (input.value) {
    if(pattern.test(input.value)) {
      input.classList.remove('error');
      input.nextElementSibling.classList.remove("show-error");
      return true;
    } else {
      input.classList.add('error');
      input.nextElementSibling.classList.add("show-error");
      input.nextElementSibling.innerText = err;
      return false;
    }
  } else {
    input.classList.add('error');
    input.nextElementSibling.classList.add("show-error");
    input.nextElementSibling.innerText = '*Field is required';
    return false;
  }
}

// commonFormJS
function commonFormJS(form, fullname, email, textarea, subject) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var checkFullName = validateInput(fullname, stringPattern, "*Space separated first & last name");
    var checkEmail = validateInput(email, emailPattern, "*Please write valid email address");
    var checkTextarea = validateInput(textarea, generalPattern, "*Please fill the input");
    
    function successmodal() {
      var div = document.createElement('div');
      div.className = 'success-div';
      div.innerHTML = `<span class="submit-icon">submit</span>
                      <span class="success-message">success</span>`;
      form.appendChild(div);
      setTimeout(function () {
        div.remove();
      }, 2000);
    }
    
    if(e.target == mainForm) {
      var checkSubject = validateInput(subject, generalPattern, "*Please fill the input");
      if (checkFullName && checkEmail && checkSubject && checkTextarea) {
        successmodal();      
        form.reset();
      }
    }
    
    if (e.target == footerForm) {
      if (checkFullName && checkEmail && checkTextarea) {
        successmodal();      
        form.reset();
      }
    }
  });
}




















