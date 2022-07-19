$(document).ready(function(){
    // $("#signup-form").validate({
    //     submitHandler: function(form) {
    //       form.submit();
    //     }
    // });

   
        $("#signup-form").on("submit",function(){
        
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
                $(this).attr("aria-describedby",""); //Remove association error message to field
                $(this).removeAttr("aria-invalid"); //Remove invalid statement
            }
        });


        function verifyPassword(pwd) { 
             //Validate Password
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