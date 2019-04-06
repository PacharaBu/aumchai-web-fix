document.querySelector('#myForm').addEventListener('submit', saveData);

function saveData(e) {
  e.preventDefault();
  var subject = document.querySelector('#subject').value;
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#email').value;
  var phone = document.querySelector('#phone').value;
  var messagge = document.querySelector('#message').value;

  var contact = {
    sub: subject,
    n: name,
    m: email,
    p: phone,
    msg: messagge
  }
  if (subject == '' || name == '' || email == '' || phone == '' || message == '') {
    alert('Please fill all of areas');
  } else {
    if (localStorage.getItem('contacts') === null) {
      var contacts = [];
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      var contacts = JSON.parse(localStorage.getItem('contacts'));
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      subject = document.querySelector('#subject').value = '';
      name = document.querySelector('#name').value = '';
      email = document.querySelector('#email').value = '';
      phone = document.querySelector('#phone').value = '';
      messagge = document.querySelector('#message').value = '';
    }
    fetch();
  }
}
function fetch() {
  var contacts = JSON.parse(localStorage.getItem('contacts'));

  var contactsResults = document.querySelector('#contactsResults');

  contactsResults.innerHTML = '';

  var str = '<div class="card-deck text-center">';

  for (var i = 0; i < contacts.length; i++) {
    var sub = contacts[i].sub;
    var n = contacts[i].n;
    var m = contacts[i].m;
    var p = contacts[i].p;
    var msg = contacts[i].msg;

    str += '<div class="col-sm-6 col-md-4 col-lg-3">'
      + `<div class="card mb-4 shadow-sm">`
      + `<div class="card-header"><h1 class="my-0">${sub}</h1></div>`
      + `<div class="card-body">`
      //   + `<a class="btn btn-primary" target="_blank" href="${sub}">Visit<br></a>`
      + `<div><h5> ${n} <h5></div>`
      + `<div> ${m}</div>`
      + `<div> ${p}</div>`
      + `<div> ${msg}</div>`
      + ` <a onclick="deleteBookmark('${sub}')" class="btn btn-danger" href="#">Delete</a>`
      + `</div></div></div>`;
    + `<br>`
  }
  str += '</div>'

  contactsResults.innerHTML = str;
}
function deleteBookmark(sub) {
  var contacts = JSON.parse(localStorage.getItem('contacts'));

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].sub === sub) {
      contacts.splice(i, 1);
    }
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));

  fetch();
}