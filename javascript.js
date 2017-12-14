// $(document).ready(function() {
// Calendar app that has pop up box using modal asking for thier email.  Email is saved in Firebase.
// Once day is clicked they have to enter it pulls/calls the Eventful API and displays events 
// for that day and then both Yelp and Google Maps are there for them to use.


var config = {
 apiKey: "AIzaSyBH0UC7olo9ACFcMrX9vOW-scqTXmjft7c",
 authDomain: "calendar-3648a.firebaseapp.com",
 databaseURL: "https://calendar-3648a.firebaseio.com",
 projectId: "calendar-3648a",
 storageBucket: "calendar-3648a.appspot.com",
 messagingSenderId: "980862729484"
};

firebase.initializeApp(config);


 // Create a variable to reference the database
var database = firebase.database();  

// Link to Google Maps API:
  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 5
    });
  }
   

  // var vanillacalendar = {
  //   month: document.querySelectorAll('[data-calendar-area="month"]')[0],
  //   next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
  //   previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
  //   label: document.querySelectorAll('[data-calendar-label="month"]')[0],
  //   activeDates: null,
  //   date: new Date(),
  //   todaysDate: new Date(),

  //   init: function () {
  //     this.date.setDate(1)
  //     this.createMonth()
  //     this.createListeners()
  //   },

  //   createListeners: function () {
  //     var _this = this
  //     this.next.addEventListener('click', function () {
  //       _this.clearCalendar()
  //       var nextMonth = _this.date.getMonth() + 1
  //       _this.date.setMonth(nextMonth)
  //       _this.createMonth()
  //     })
  //     // Clears the calendar and shows the previous month
  //     this.previous.addEventListener('click', function () {
  //       _this.clearCalendar()
  //       var prevMonth = _this.date.getMonth() - 1
  //       _this.date.setMonth(prevMonth)
  //       _this.createMonth()
  //     })
  //   },

  //   createDay: function (num, day, year) {
  //     var newDay = document.createElement('div')
  //     var dateEl = document.createElement('span')
  //     dateEl.innerHTML = num
  //     newDay.className = 'cal__date'
  //     newDay.setAttribute('data-calendar-date', this.date)

  //     if (num === 1) {
  //       var offset = ((day - 1) * 14.28)
  //       if (offset > 0) {
  //         newDay.style.marginLeft = offset + '%'
  //       }
  //     }

  //     if (this.date.getTime() <= this.todaysDate.getTime() - 1) {
  //       newDay.classList.add('cal__date--disabled')
  //     } else {
  //       newDay.classList.add('cal__date--active')
  //       newDay.setAttribute('data-calendar-status', 'active')
  //     }

  //     if (this.date.toString() === this.todaysDate.toString()) {
  //       newDay.classList.add('cal__date--today')
  //     }

  //     newDay.appendChild(dateEl)
  //     this.month.appendChild(newDay)
  //   },

  //   dateClicked: function () {
  //     var _this = this
  //     this.activeDates = document.querySelectorAll('[data-calendar-status="active"]')
  //     for (var i = 0; i < this.activeDates.length; i++) {
  //       this.activeDates[i].addEventListener('click', function (event) {
  //         var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
  //         picked.innerHTML = this.dataset.calendarDate
  //         _this.removeActiveClass()
  //         this.classList.add('cal__date--selected')
  //         })
  //      }
  //   },

  //   createMonth: function () {
  //     var currentMonth = this.date.getMonth()
  //     while (this.date.getMonth() === currentMonth) {
  //       this.createDay(this.date.getDate(), this.date.getDay(), this.date.getFullYear())
  //       this.date.setDate(this.date.getDate() + 1)
  //     }
  //     // while loop trips over and day is at 30/31, bring it back
  //     this.date.setDate(1)
  //     this.date.setMonth(this.date.getMonth() - 1)

  //     this.label.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
  //     this.dateClicked()
  //   },

  //   monthsAsString: function (monthIndex) {
  //     return [
  //       'January',
  //       'Febuary',
  //       'March',
  //       'April',
  //       'May',
  //       'June',
  //       'July',
  //       'August',
  //       'September',
  //       'October',
  //       'November',
  //       'December'
  //     ][monthIndex]
  //   },

  //   clearCalendar: function () {
  //     vanillacalendar.month.innerHTML = ''
  //   },

  //   removeActiveClass: function () {
  //     for (var i = 0; i < this.activeDates.length; i++) {
  //       this.activeDates[i].classList.remove('cal__date--selected')
  //     }
  //   }
  // }


var email = "";

// / Capture Button Click
$("#add-user").on("click", function(event) {
  event.preventDefault();
  email = $("#email-input").val().trim();

// function ValidateEmail(mail)   
// {  
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value))  
//   {  
//     return (true)  
//   }  
//     alert("You have entered an invalid email address!")  
//     return (false)  
// }  


// var email = document.getElementById("mail");

// email.addEventListener("input", function (event) {
//   if (email.validity.typeMismatch) {
//     email.setCustomValidity("I expect an e-mail, darling!");
//   } else {
//     email.setCustomValidity("");
//   }
// });


  database.ref().push({
    email: email,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});


// $("#frmDemo").submit(function(e) {
//   e.preventDefault();
//   var email = $("#email").val();
//   var comment = $("#comment").val();
  
//   if(name == "" || comment == "" ) {
//     $("#error_message").show().html("All Fields are Required");
//   } else {
//     $("#error_message").html("").hide();
//     $.ajax({
//       type: "POST",
//       url: "post-form.php",
//       data: "email="+email+"&comment="+comment,
//       success: function(data){
//         $('#success_message').fadeIn().html(data);
//         setTimeout(function() {
//           $('#success_message').fadeOut("slow");
//         }, 2000 );

//       }
//     });
//   }
// })



// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.email);

  // Change the HTML to reflect
  $("#email-display").text(sv.email);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


    



