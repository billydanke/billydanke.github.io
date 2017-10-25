function TheLogin() {

var password = 'OZZOmu';

if (this.document.login.pass.value == password) {
  top.location.href="ozzo.html";
}
else {
  window.alert("Incorrect password, please try again.");
  }
}