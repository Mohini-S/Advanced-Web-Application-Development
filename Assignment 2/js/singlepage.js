$(document).ready(function(){
$('#productButton').on('click',function() {
      $('#content').html(allChocolates);
      $('#productPage').css('display','block');
      $('#productPage').siblings().css('display','none');
});
