//Validations
$(document).ready(function() {
     $(".required").blur(function () {
          length = $(this).val().trim().length;
          if(length==0){
               $(this).next('span').show();
          }
          else {
               $(this).next('span').hide();
          }
     });

     $('.requiredDropDown').change(function () {
          if(  $(this).val()!="" ){
               $(this).next('span').hide();
          }
          else{
               $(this).next('span').show();
          }
     });

     $('.requiredDropDown').on("focus blur",function () {
          if(  $(this).val()=="" ){
               $(this).next('span').show();
          }
     });
     $(document).on('click', '[name="proceed-button"]',function(){
          $('#reset').trigger("click");
     });
     $(document).on('blur', '[name="zip"]',function(){
          valZip();
     });
     function valZip() {
          if($("#zip").val().length==0){
               $("#zip+span").show();
               return false;
          }
          if($('#zip').val().replace(/[^0-9]/g,"").length==5){
               $(".validZip").hide();
               $("#zip+span").hide();
               return true;
          }
          if($('#zip').val().replace(/[^0-9]/g,"").length!=5 && $("#zip").val().length!=0){
               $("#zip+span").hide();
               $(".validZip").show();
               return false;
          }
     }

     $(document).on('blur','[name="#phone"]',function () {
          valPhone();
     });

     function valPhone(){
          phnum  = $('#phone').val().length;
          if(phnum==0){
               $("#phone").next('span').show();
               return false;
          }
          else {
               var regex = new RegExp(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/);
               var ph = $("#phone").val();
               if (!regex.test(ph)&regex.length!=0) {
                     $("#phone").next('span').show();
                     return false;
               }
          }
          return true;
     }

     $(document).on('blur', '[name="fname"]',function(){
		var value = $(this).val();
		if (value == "") {
			$(this).next('span').show();
		}
		else {
			$(this).next('span').hide();

		}
	});
     $(document).on('blur', '[name="address1"]',function(){
		var value = $(this).val();
		if (value == "") {
			$(this).next('span').show();
		}
		else {
			$(this).next('span').hide();

		}
	});
     $(document).on('blur', '[name="city"]',function(){
		var value = $(this).val();
		if (value == "") {
			$(this).next('span').show();
		}
		else {
			$(this).next('span').hide();

		}
	});
     $(document).on('blur', '[name="zip"]',function(){
		var value = $(this).val();
		if (value == "") {
			$(this).next('span').show();
		}
		else {
			$(this).next('span').hide();

		}
	});
     $(document).on('blur', '[name="phone"]',function(){
		var value = $(this).val();
		if (value == "") {
			$(this).next('span').show();
		}
		else {
			$(this).next('span').hide();

		}
	});

     $(document).on('change', '[name="sameaddr"]',function(){
          var same = $("input[name=sameaddr]:checked").val();
          if(same=='yes'||same=='no'){
               $(".noselect").hide();
          }
          else{
               $(".noselect").show();
          }
     });

     $(document).on('change', '[name="card"]',function(){
          var c = $("input[name=card]:checked").val();
          if(c!=''||c!='undefined'){
               $(".card").hide();
          }
          else{
               $(".card").show();
          }
     });

     $(document).on('click', '[name="reset"]',function(){
          $(".required+span,.requiredDropDown+span").css("display","none");
          $(".noselect").hide();
          $(".invalidCardNo").hide();
     });
     $(document).on('change', '[name="sameaddr"]',function(){
          var samead = $("input[name=sameaddr]:checked").val();
          console.log(samead);
          if(samead=='yes'){
               $(".shippingaddr").hide();
          }
          else if(samead=='no'){
              $(".shippingaddr").show();
         }
    });
    $(document).on('blur', '[name="cardnum"]',function(){
         valcardnum();
    });
    function valcardnum(){
         if($("#cardnum").val().length==0){
              $("#cardnum+span").show();
              return false;
         }
         if($('#cardnum').val().replace(/[^0-9]/g,"").length==16){
              $(".invalidcardnum").hide();
              $("#cardnum+span").hide();
              return true;
         }
    }

});
