/*
Salunke Mohini Account:
RedId: 822049248
CS 645, Spring 2018
Project 1
*/

$(document).ready(function(){

  //set focus on username
  $("[name='uname']").val('');
	$("[name='uname']").focus();

  //toggle between show password
  $('#checkpwd').click(function(){
      $('#pwd').attr('type', $(this).is(':checked') ? 'text' : 'password');
  });

});
