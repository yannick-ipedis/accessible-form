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

  //----Validate  Password-----------------------------------------------------------------------------------------------------------
  verifyPassword($("#pwd").val());
  var validate = 0;

  $(".required-field").each(function(){
      var fieldValue = $(this).val();
      if (fieldValue == ""){
          validate++;
          //Error handling for screen readers
          $(this).parent().find(".error-message").show(); //Show error message
          addAria($(this));
      } 
      else{
          $(this).parent().find(".error-message").hide(); //Hide error mesage
          removeAria($(this));
      }
  });

  function verifyPassword(pwd) { 
       
      $("#error-required-pwd").hide();
      let passwordError = true;
      $("#error-required-pwd").keyup(function () {
        validatePassword();
      });
      
      //Check if password and confirm password match together
      if(pwd != conf_pwd) {  
          $("#error-required-pwd").html("Les mots de passe doivent  être identique.").css("color", "red");  
          $("#error-required-pwd").show();

     } else {  
      var password = $("#pwd").val();
      var confirmPassword = $("#conf_pwd").val();
      $("#error-required-conf_pwd").html("Les mots de passe ne sont pas identique.").css("color", "red");
      $("#error-required-conf_pwd").show();           
     }  
     

     //validate letter
  if ( pwd.match(/[A-z]/) ) {
       $('#letter').removeClass('invalid').addClass('valid');
    } else {
       $('#letter').removeClass('valid').addClass('invalid');
  }    

    //validate capital letter
  if ( pwd.match(/[A-Z]/) ) {
      $('#capital').removeClass('invalid').addClass('valid');
    } else {
   $('#capital').removeClass('valid').addClass('invalid');
  }

  //validate number
  if ( pwd.match(/\d/) ) {
     $('#number').removeClass('invalid').addClass('valid');
    } else {
  $('#number').removeClass('valid').addClass('invalid');
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


        
    