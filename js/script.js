$(document).ready(function() {
    // $("#signup-form").validate({
    //     submitHandler: function(form) {
    //       form.submit();
    //     }
    // });
    //----Dropdown------------------------------------------------------------------------------------------------------------------
   /* $(function() {
      $('.dropdown ul li').on('click', function() {
        var label = $(this).parent().parent().children('label');
        label.attr('data-value', $(this).attr('data-value'));
        label.html($(this).html());
  
        $(this).parent().children('.selected').removeClass('selected');
        $(this).addClass('selected');
     
       });
    });*/
    /*
    accessibleDropdown();
      function accessibleDropdown(){
  
          $('.dropdown ul li').each(function(){
              $(this).focus(function(){
                  $(this).addClass('focused');
                  var menuParent = $(this).parent().next().find('ul');
                  $(menuParent).css('display','block');
              });
  
              $(this).blur(function(){
                  $(this).removeClass('focused');
              });
          });
      } 
  
      $(document).ready(function() {
    var $select = $(".select-account");
    var $choose = $(".choose-account");
    
    // handle KEYPRESS events
    $("body").on("keypress", function(e) {
      var $target = $(e.target);
      var $parent = $target.parents(".select-account");
      if (e.which == 13) {
        if ($target.attr("name") == "account-type") {
          var $whichActive = $("#" + $choose.val());
          $whichActive.focus();
          $(".select-account").removeClass("active");
          
          var $clicked = $("input:checked ~ label");
          var clicked = $clicked.text();
          $choose.val($clicked.attr("for"));
          $choose.text(clicked);
          $select.removeClass("active");
        } else {
          $select.removeClass("active");
        }
      }
    });
    
    // handle random body clicks off-$target
      $("body").on("click", function (e) {
        var $target = $(e.target);
        var isSelect = $target.parents(".select-account").length > 0;
        if (!isSelect) {
          $select.removeClass("active");
        }
      });
  
    // handle direct BUTTON click
    $choose.on("click", function() {
      var $whichActive = $("#" + $choose.val());
      if ($select.hasClass("active")) {
        $select.removeClass("active");
        $choose.focus();
      } else {
        $select.addClass("active");
        $whichActive.focus();
      }
    });
  
    // handle direct LABEL clicks
    $select.on("click", "label", function() {
      var clicked = $(this).text();
      $choose.val($(this).attr("for"));
      $choose.text(clicked);
      $select.removeClass("active");
    });
  
  });
  */
  function DropDown(dropDown) {
    const [toggler, menu] = dropDown.children;
    
    const handleClickOut = e => {
      if(!dropDown) {
        return document.removeEventListener('focus', handleClickOut);
  }
      
      if(!dropDown.contains(e.target)) {
        this.toggle(false);
  }
    };
    
    const setValue = (item) => {
      const val = item.textContent;
      toggler.textContent = val;
      this.value = val;
      this.toggle(false);
      dropDown.dispatchEvent(new Event('change')); 
      toggler.focus();
    }
    
    const handleItemKeyDown = (e) => {
      e.preventDefault();
  
      if(e.keyCode === 38 && e.target.previousElementSibling) { // up
        e.target.previousElementSibling.focus();
      } else if(e.keyCode === 40 && e.target.nextElementSibling) { // down
        e.target.nextElementSibling.focus();
      } else if(e.keyCode === 27) { // escape key
        this.toggle(false);
      } else if(e.keyCode === 13 || e.keyCode === 32) { // enter or spacebar key
        setValue(e.target);
      }
    }
  
    const handleToggleKeyPress = (e) => {
      e.preventDefault();
  
      if(e.keyCode === 27) { // escape key
        this.toggle(false);
      } else if(e.keyCode === 13 || e.keyCode === 32) { // enter or spacebar key
        this.toggle(true);
      }
    }
    
    toggler.addEventListener('keydown', handleToggleKeyPress);
    toggler.addEventListener('click', () => this.toggle());
    [...menu.children].forEach(item => {
      item.addEventListener('keydown', handleItemKeyDown);
      item.addEventListener('click', () => setValue(item));
    });
    
    this.element = dropDown;
    
    this.value = toggler.textContent;
    
    this.toggle = (expand = null) => {
      expand = expand === null
        ? menu.getAttribute('aria-expanded') !== 'true'
        : expand;
  
      menu.setAttribute('aria-expanded', expand);
      
      if(expand) {
        toggler.classList.add('active');
        menu.children[0].focus();
        document.addEventListener('click', handleClickOut);
        dropDown.dispatchEvent(new Event('opened'));
      } else {
        toggler.classList.remove('active');
        dropDown.dispatchEvent(new Event('closed'));
        document.removeEventListener('click', handleClickOut);
      }
    }
  }
  
  const dropDown = new DropDown(document.querySelector('.dropdown'));
    
  dropDown.element.addEventListener('change', e => {
    console.log('changed', dropDown.value);
  });
  
  dropDown.element.addEventListener('opened', e => {
    console.log('opened', dropDown.value);
  });
  
  dropDown.element.addEventListener('closed', e => {
    console.log('closed', dropDown.value);
  });
  
  dropDown.toggle();
  
  
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
  
  })