// console.log("main js running");

// Funtion to colapse navbar on outer click
$(document).click(function (event) {
  $('#navBar').collapse('hide');
});

// for controling istall prompt section
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile.
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  $('#installSection').show();
});

let butInstall = document.getElementById('installBtn');
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  const result = await promptEvent.userChoice;
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  $('#installSection').hide();
});
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

// to fit the heading to screen
fitty('#rcHeading');
fitty('#depHeading');

//Constants
const subType = {
  "mjr": '<sup><span class="badge badge-pill badge-primary">M</span></sup>',
  "nmjr": '<sup><span class="badge badge-pill badge-warning">N.M</span></sup>'
}


//Show today's date
$('#dateView').html(`${todayFull}, ${todayDate} ${todayMonth} ${todayYear}`);
//show tomorrow's date
$('#tmDateView').html(`${tomorrowFull}, ${tomorrowDate} ${tomorrowMonth} ${tomorrowYear}`);


// get rutine.json as object
fetch('./assets/rutine.json')
  .then((response) => response.json())
  .then((data) => {
    var rutine = data;

    fetch('./assets/holidays.json')
      .then((response) => response.json())
      .then((holidays) => {
        holidayArray = holidays;
        // console.log(holidayArray.length)
        // console.log(isHolyday(todayShort))
        showRutine(rutine);
      });

  }
  );


// check if the day is gov holiday
function isHolyday(date, fullDate, output) {
  let holidayList = holidayArray;
  let holidayStatus = false;
  for (holiday of holidayList) {
    // console.log(holiday.date)
    if (holiday.date == date) {
      holidayStatus = true;
      $(output).html(`<div class="lead alert-secondary m-2 rounded text-center m-0 py-5">${holiday.reason}<br>${fullDate}</div>`)
      // console.log(holiday)
    }
  }
  return holidayStatus;
}


// show rutine
function showRutine(data) {
  const rutine = data;

  // show today rutine
  let rutineToday = rutine[today];
  let periods = rutineToday.periods;
  let periodList = rutine.periodList;

  // Show today rutine
  if (isHolyday(todayShort, formatedDate, '#rutineDiv')) {
    // if today is gov holiday
    // console.log("today is holiday")
  } else if (today == 'sat' || today == 'fri') {
    // if today is weekly holiday
    $('#rutineDiv').html(`<div class="lead alert-success m-2 rounded text-center m-0 py-5">Today is weekly holiday<br>${formatedDate}</div>`)
  }
  else {
    // if today is not holiday
    for (let period in periods) {
      let thisPeriod = periods[period];
      let classTime = periodList[period];
      let type = thisPeriod.type;
      if (thisPeriod.sub) {
        $("#rutineView").append(`<tr><td class='p-1 align-middle text-center'>${classTime}</td><td class='p-1 align-middle text-center'>${thisPeriod.sub} ${subType[type]}</td><td class='p-1 align-middle text-center'>${thisPeriod.room}</td><td class='p-1 align-middle text-center'>${thisPeriod.teacher}</td></tr>`);
      }
    }
  }

  // show Tomorrow rutine
  let rutineTomorrow = rutine[tomorrow];
  let periodsTm = rutineTomorrow.periods;

  // check tomorrow is not holyday
  if (isHolyday(tomorrowShort, formatedDateTm, '#rutineDivTm')) {
    // if tomorrow is gov holiday
    // console.log("tomorrow is holiday")
  } else if (tomorrow == 'sat' || tomorrow == 'fri') {
    // if tomorrow is weekly holyday
    $('#rutineDivTm').html(`<div class="lead alert-success m-2 rounded text-center m-0 py-5">Tomorrow is weekly holiday<br>${formatedDateTm}</div>`)
  }
  else {
    // if tomorrow is not holyday
    for (let period in periodsTm) {
      let thisPeriod = periodsTm[period];
      let classTime = periodList[period];
      let type = thisPeriod.type;
      if (thisPeriod.sub) {
        $("#rutineViewTm").append(`<tr><td class='p-1 align-middle text-center'>${classTime}</td><td class='p-1 align-middle text-center'>${thisPeriod.sub} ${subType[type]}</td><td class='p-1 align-middle text-center'>${thisPeriod.room}</td><td class='p-1 align-middle text-center'>${thisPeriod.teacher}</td></tr>`);
      }
    }
  }
}

// Function to generate random number
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
if (localStorage.getItem('quotesList')) {
  console.log('found in localStorage')
  let quotes = JSON.parse(localStorage.getItem("quotesList"))
  showQuote(quotes)
} else {
  fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('quotesList', JSON.stringify(data))
      showQuote(data)
    }
    );
}
function showQuote(quotes) {
  let quote = quotes[randomNumber(0, quotes.length - 1)]
  // console.log(quotes[4])
  $('#quote').html(quote.text)
  $('#quoteBy').html(quote.author)
}

// for fab
function toggleBtn() {
  const Btns = document.querySelector(".btns-fab");
  const add = document.getElementById("add");
  const remove = document.getElementById("remove");
  const btn = document.querySelector(".btns-fab").querySelectorAll("a");
  Btns.classList.toggle("open");
  if (Btns.classList.contains("open")) {
    remove.style.display = "block";
    add.style.display = "none";
    btn.forEach((e, i) => {
      setTimeout(() => {
        bottom = 40 * i;
        e.style.bottom = bottom + "px";
        console.log(e);
      }, 150 * i);
    });
  } else {
    add.style.display = "block";
    remove.style.display = "none";
    btn.forEach((e, i) => {
      e.style.bottom = "0px";
    });
  }
}