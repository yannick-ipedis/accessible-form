$(document).ready(function() {
    // $("#signup-form").validate({
    //     submitHandler: function(form) {
    //       form.submit();
    //     }
    // });

  
    //----Validate Form on submit---------------------------------------------------------------------------------------------------------
    $("#signup-form").on("submit", function() {
      var validate = 0;
      validateUsername();
      verifyPassword();
      validateEmail();
      $(".numeric").each(function() {
        validateNumber("#" + $(this).attr("id"));
      });
  
      // Validate all required fields
      $(".required-field").each(function() {
        var fieldValue = $(this).val();
        if (fieldValue == "") {
          validate++;
          //Error handling for screen readers
          $(this).parent().find(".error-message").show(); //Show error message
          addAria($(this));
        } else {
          $(this).parent().find(".error-message").hide(); //Hide error mesage
          removeAria($(this));
        }
      });
  
      //----Validate Phone Number and Postal Code-----------------------------------------------------------------------------------------------------
      function validateNumber(element) {
        let value = $(element).val();
        var limit = element == "#p_num" ? 8 : 5; // Assign correct limit of length depending on field
        var reg = /^\d+$/; //Number regex
        if (!reg.test(value)) { // Check if value of field contains only numbers
          $(element).parent().find(".error-message").show(); //display error message
          addAria(element);
          validate++;
        } else if (value.length < limit) {
          $(element).parent().find(".error-message").show(); //display error message
          addAria(element);
          validate++;
        } else {
          $(element).parent().find(".error-message").hide(); //hide error message
          removeAria(element)
        }
      }
  
      //----Validate Email-----------------------------------------------------------------------------------------------------------
      function validateEmail() {
        var element = "#email";
        let value = $(element).val();
        var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Number regex
        if (value == "") {
          $("#error-required-email").html("Le champ Email est obligatoire.").show(); //display error message
          addAria(element);
          validate++;
        } else if (!reg.test(value)) { // Check if value of field contains only numbers
          $("#error-required-email").html("L'email est invalide - Exemple nom@mail.com").show(); //display error message
          addAria(element);
          validate++;
        } else {
          $("#error-required-email").hide(); //hide error message
          removeAria(element)
        }
      }
  
      //----Validate Username-----------------------------------------------------------------------------------------------------------
      function validateUsername() {
        let usernameValue = $("#uname").val();
        var element = "#" + $("#uname").attr("id");
        if (usernameValue == "") {
          $(element).parent().find(".error-message").html("Le champ Nom utilisateur est obligatoire").show(); //display error message
          addAria(element);
          validate++;
        } else if (usernameValue.length < 5) {
          $(element).parent().find(".error-message").html("Le champ nom d'utilisateur doit être composé au minimum de 5 caractères.").show(); //display error message;
          addAria(element);
          validate++;
        } else {
          $("#error-required-uname").hide();
        }
      }
  
      //----Validate  Password-----------------------------------------------------------------------------------------------------------
      function verifyPassword() {
        var element = "#" + $("#conf_pwd").attr("id");
        var password = $("#pwd").val();
        var confirmPassword = $("#conf_pwd").val();
  
        //Check if password and confirm password match together
        if (password != confirmPassword) {
          console.log(1);
          $(element).parent().find(".error-message").html("Les mots de passe ne correspondent pas. Veillez à ce que les deux mots de passe correspondent.").show(); //display error message
          addAria(element);
          validate++;
        }
        else{
          $(element).parent().find(".error-message").html("").hide(); //display error message
          removeAria(element);
        }
      }
  
      if (validate != 0) {
        console.log("Number of errors detected", validate);
        $("input[aria-invalid]:eq(0)").focus(); //Set focus on first invalid field
        return false;
      }
      return false;
    });
  
    $('#pwd').keyup(function() {
      console.log(1);
      // keyup code here
      // set password variable
      var password = $(this).val();
      if ( password.length < 8 ) {
        $('#length').removeClass('valid').addClass('invalid');
      } else {
        $('#length').removeClass('invalid').addClass('valid');
      }
      
       //validate letter
      if (password.match(/[A-z]/)) {
        $('#letter').removeClass('invalid').addClass('valid');
      } else {
        $('#letter').removeClass('valid').addClass('invalid');
      }
  
      //validate capital letter
      if (password.match(/[A-Z]/)) {
        $('#capital').removeClass('invalid').addClass('valid');
      } else {
        $('#capital').removeClass('valid').addClass('invalid');
      }
  
      //validate number
      if (password.match(/\d/)) {
        $('#number').removeClass('invalid').addClass('valid');
      } else {
        $('#number').removeClass('valid').addClass('invalid');
      }
    }).focus(function() {
      console.log(2);
        // focus code here
        //validate the length
        
    }).blur(function() {
      console.log(3);
      // blur code here
      if ($("li.invalid").length){
        var errorMessage = "Le mot de passe doit contenir ";
        $("li.invalid").each(function(){
          errorMessage = errorMessage + $(this).text() + ", ";
        })
        console.log(errorMessage);
        $(this).parent().find(".error-message").html(errorMessage).show(); //display error message
        addAria("#" + $(this).attr("id"));
      }
      else{
        $(this).parent().find(".error-message").html("").hide();
        removeAria("#" + $(this).attr("id"));
      }
    });
  
    // Adding Accessibility attributes if field is invalid
    function addAria(element) {
      $(element).attr("aria-invalid", true); //Adding invalid statement for screen readers
      //Associate error message to field
      var errorid = $(element).parent().find(".error-message").attr("id");
      $(element).attr("aria-describedby", errorid);
    }
  
    // Removing Accessibility Attributes if field is valid
    function removeAria(element) {
      $(element).removeAttr("aria-invalid"); //Remove invalid statement
      $(element).attr("aria-describedby", ""); //Remove asxsociation error message to field
    }
  
});