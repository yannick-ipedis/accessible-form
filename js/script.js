$(document).ready(function(){
    // $("#signup-form").validate({
    //     submitHandler: function(form) {
    //       form.submit();
    //     }
    // });
//----Dropdown------------------------------------------------------------------------------------------------------------------
    $(function() {
      $('.dropdown ul li').on('click', function() {
        var label = $(this).parent().parent().children('label');
        label.attr('data-value', $(this).attr('data-value'));
        label.html($(this).html());
    
        $(this).parent().children('.selected').removeClass('selected');
        $(this).addClass('selected');
      });
    });

//----Validate Username---------------------------------------------------------------------------------------------------------
    $("#signup-form").on("submit",function(){

        $("#error-required-uname").hide();
        let usernameError = true;
        validateUsername();

      
        function validateUsername() {
          let usernameValue = $("#uname").val();
          if (usernameValue.length == "") {
            $("#error-required-uname").show();
            usernameError = false;
            return false;

          } else if (usernameValue.length < 3 || usernameValue.length > 10) {
            $("#error-required-uname").show();
            $("#error-required-uname").html("La longuere du nom d'utilisateur doit  être entre 3 et 10");
            usernameError = false;
            return false;

          } else {
            $("#error-required-uname").hide();
          }
        }
   
  //----Validate Phone Number and Postal Code-----------------------------------------------------------------------------------------------------

  function validateNumber(element){
    let value = $(element).val();
    var limit = element == "#p_num" ? 8 : 5; // Assign correct limit of length depending on field
    var reg = /^\d+$/; //Number regex
    if (!reg.test(value)) { // Check if value of field contains only numbers
        $(element).parent().find(".error-message").show(); //display error message
        addAria(element);
        validate++;
    }
    else if (value.length < limit){
        $(element).parent().find(".error-message").show(); //display error message
        addAria(element);
        validate++;
    }
    else{
      $(element).parent().find(".error-message").hide(); //hide error message
      removeAria(element)
    }
  }

  //----Validate Email-----------------------------------------------------------------------------------------------------------
  function validateEmail(){
    var element = "#email";
    let value = $(element).val();
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Number regex
    if (value == ""){
      $("#error-required-email").html("Le champ Email est obligatoire.").show(); //display error message
      addAria(element);
    }
    else if (!reg.test(value)) {// Check if value of field contains only numbers
        $("#error-required-email").html("L'email est invalide - Exemple nom@mail.com").show(); //display error message
        addAria(element);
    }
    else{
      $("#error-required-email").hide(); //hide error message
      removeAria(element)
    }
  }
         // Check Numeric Fields
          $(".numeric").each(function(){
          validateNumber("#" + $(this).attr("id"));
          });

         // Check Email Fields
          validateEmail();
      

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


        } 

        // Adding Accessibility attributes if field is invalid
        function addAria(element){
          $(element).attr("aria-invalid",true); //Adding invalid statement for screen readers
          //Associate error message to field
          var errorid = $(element).parent().find(".error-message").attr("id");
          $(element).attr("aria-describedby",errorid);
        }

        // Removing Accessibility Attributes if field is valid
        function removeAria(element){
          $(element).removeAttr("aria-invalid"); //Remove invalid statement
          $(element).attr("aria-describedby",""); //Remove asxsociation error message to field
        }

        if (validate != 0){
            $("input[aria-invalid]:eq(0)").focus(); //Set focus on first invalid field
            return false;
        }
        return false;
        })
  
})