// trigger upload on space & enter
// = standard button functionality
$('#buttonlabel span[role=button]').bind('keypress keyup', function(e) {
    if(e.which === 32 || e.which === 13){
      e.preventDefault();
      $('#fileupload').click();
    }    
  });
  
  // return chosen filename to additional input
  $('#fileupload').change(function(e) {
    var filename = $('#fileupload').val().split('\\').pop();
    $('#filename').val(filename);
    $('#filename').attr('placeholder', filename);
    $('#filename').focus();
  });