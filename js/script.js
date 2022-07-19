$(document).ready(function(){
    // $("#signup-form").validate({
    //     submitHandler: function(form) {
    //       form.submit();
    //     }
    // });

    $("#signup-form").on("submit",function(){
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


        if (validate != 0){
            $("input[aria-invalid]:eq(0)").focus(); //Set focus on first invalid field
            return false;
        }

        return false;
    })
})