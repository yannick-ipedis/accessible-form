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

        // Validate Password
         $("#pwd").hide();
            let passwordError = true;
        $("#pwd").keyup(function () {
            validatePassword();
        });

        function validatePassword() {
        let passwordValue = $("#pwd").val();
            if (passwordValue.length == "") {
             $("#pwd").show();
            passwordError = false;
                return false;
        }

            if (passwordValue.length < 3 || passwordValue.length > 10) {
            $("#pwd").show();
            $("#pwd").html( "**length of your password must be between 3 and 10");

            $("#pwd").css("color", "red");
            passwordError = false;
                 return false;
             }    else {
            $("#pwd").hide();
          }
        }

    });
});
