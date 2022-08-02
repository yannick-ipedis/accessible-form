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

//----Validate Username------------------------------------------------------------------------------------------------------------------
    $("#signup-form").on("submit",function(){

        $("#error-required-uname").hide();
        let usernameError = true;
        $("#uname").keyup(function () {
       validateUsername();
    });
 
    function validateUsername() {
      let usernameValue = $("#uname").val();
         if (usernameValue.length == "") {
       $("#error-required-uname").show();
          usernameError = false;
          return false;
     } else if (usernameValue.length < 3 || usernameValue.length > 10) {
       $("#error-required-uname").show();
       $("#error-required-uname").html("**La longueure du nom d'utilisateur doit etre entre 3 et 10");
      usernameError = false;
      return false;
    } else {
      $("#error-required-uname").hide();
    }
  }
   
  //----Validate Phone Number------------------------------------------------------------------------------------------------------------------
        //allow only numeric keys
        $(".isNumeric").on("keypress keyup blur",function (event) {    
                  $(this).val($(this).val().replace(/[^\d].+/, ""));
                   if ((event.which < 48 || event.which > 57)) {
                       event.p_num();
                   }
               });

//----Validate password------------------------------------------------------------------------------------------------------------------
        verifyPassword($("#pwd").val());
        var validate = 0;

        $(".required-field").each(function(){
            var fieldValue = $(this).val();
            if (fieldValue == ""){
                validate++;
                //Error handling for screen readers
                $(this).parent().find(".error-message").show(); //Show error message
                $(this).attr("aria-invalid",true); //Adding invalid statement for screen readers
                //Associate error message to field
                var errorid = $(this).parent().find(".error-message").attr("id");
                $(this).attr("aria-describedby",errorid);
            } 
            else{
                $(this).parent().find(".error-message").hide(); //Hide error mesage
                $(this).attr("aria-describedby",""); //Remove asxsociation error message to field
                $(this).removeAttr("aria-invalid"); //Remove invalid statement
            }
        });


        function verifyPassword(pwd) { 
             
            $("#error-required-pwd").hide();
            let passwordError = true;
            $("#error-required-pwd").keyup(function () {
              validatePassword();
            });
            
            //-minimum password length validation  
            if(pwd.length < 5) {  
                $("#error-required-pwd").html("Mot de passe obligatoire et doit contenir au moins 5 caracteres!");  
                $("#error-required-pwd").show();
               
              return false;  
            }  
 
            //-maximum length of confirm password validation  
            if(conf_pwd.length > 15) {  
                $("#error-required-conf_pwd").html("Confirmation obligatoire et doit contenir moins 15 caracteres!"); 
                $("#error-required-conf_pwd").show();
             return false;  

           } else {  
            alert("Mot de passe invalide");            
           }  
        }  
        if (validate != 0){
            $("input[aria-invalid]:eq(0)").focus(); //Set focus on first invalid field
            return false;
        }

  
        return false;
        })
        

})