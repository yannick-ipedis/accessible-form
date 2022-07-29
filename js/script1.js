// Document is ready
$(document).ready(function () {


     // Validate Username
  $("#uname").hide();
  let unameError = true;
  $("#uname").keyup(function () {
    validateUsername();
  });
 
  function validateUsername() {
    let unameValue = $("#uname").val();
    if (unameValue.length == "") {
      $("#uname").show();
      unameError = false;
      return false;
    } else if (unameValue.length < 3 || unameValue.length > 10) {
      $("#uname").show();
      $("#uname").html("**length of username must be between 3 and 10");
      unameError = false;
      return false;
    } else {
      $("#uname").hide();
    }
  }
 
  // Validate Email
  const email = document.getElementById("email");
  email.addEventListener("blur", () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {
      email.classList.remove("is-invalid");
      emailError = true;
    } else {
      email.classList.add("is-invalid");
      emailError = false;
    }
  });
 
  // Validate Password
  $("#pwd").hide();
  let pwdError = true;
  $("#pwd").keyup(function () {
    validatePassword();
  });
  function validatePassword() {
    let pwdValue = $("#password").val();
    if (pwdValue.length == "") {
      $("#pwd").show();
      pwdError = false;
      return false;
    }
    if (pwdValue.length < 3 || pwdValue.length > 10) {
      $("#pwd").show();
      $("#pwd").html(
        "**length of your password must be between 3 and 10"
      );
      $("#pwd").css("color", "red");
      pwdError = false;
      return false;
    } else {
      $("#pwd").hide();
    }
  }
 
  // Validate Confirm Password
  $("#conpasscheck").hide();
  let confirmPasswordError = true;
  $("#conpassword").keyup(function () {
    validateConfirmPassword();
  });
  function validateConfirmPassword() {
    let confirmPasswordValue = $("#conpassword").val();
    let passwordValue = $("#password").val();
    if (passwordValue != confirmPasswordValue) {
      $("#conpasscheck").show();
      $("#conpasscheck").html("**Password didn't Match");
      $("#conpasscheck").css("color", "red");
      confirmPasswordError = false;
      return false;
    } else {
      $("#conpasscheck").hide();
    }
  }
 
  // Submit button
  $("#submitbtn").click(function () {
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();
    if (
      usernameError == true &&
      passwordError == true &&
      confirmPasswordError == true &&
      emailError == true
    ) {
      return true;
    } else {
      return false;
    }
  });
});


        
    