//Salunke Mohini Account:
//RedId: 822049248
//CS 645, Spring 2018
//Project 1

var form_type;
var error_cat=false;
var error_sku=false;
var error_mid=false;
var error_ven=false;
var error_desc=false;
var error_feat=false;
var error_cost=false;
var error_ret=false;

function validate(){
  //check if all fields entered
  flag=false;

  if(error_sku == false && error_cat== false && error_ven == false &&
  error_mid== false && error_desc==false && error_feat==false && error_cost==false && error_ret==false){
    flag=true;
  }
  else {
    flag=false;
  }
  return flag;
}

function chk_sku(){
  var s=$('#sku').val();
  console.log(s);
  var re=/^[A-Z]{3}-[0-9]{3}$/;
  //if( ($.trim(s)=='') || (!s.match('/^[A-Z]{3}-[0-9]{3}$/')) ){
  if( ($.trim(s)=='') || !(re.test($.trim(s))) ){
    //$('#a_skuerror').show();
    //$('#a_skuerror').text("Enter a valid SKU of the form ABC-123");
    error_sku= true;
  }
  else {
    error_sku= false;
    $('#a_skuerror').hide();
    //$('#a_skuerror').text("");
  }
  return error_sku;
}

function chk_cat(){
  if($('select[name="category"]').val()=="") {
    $('#a_caterror').show();
    $('#a_caterror').html("Select a category from the dropdown");
    error_cat= true;
  }
  else {
    error_cat= false;
    $('#a_caterror').hide();
    cat_name= $('select[name="category"]').val();
  }
}

function chk_ven(){
  if($('select[name="vendor"]').val()=="") {
    $('#a_caterror').show();
    $('#a_venerror').html("Select a vendor from the dropdown");
    error_ven= true;
  }
  else {
    error_ven= false;
    $('#a_venerror').hide();
    ven_name= $('select[name="vendor"]').val();
  }
}

function chk_mid(){
  var m=$('#m_id').val();
  if($.trim(m)==''){
    $('#a_miderror').show();
    $('#a_miderror').text("Please enter a valid Manufacturer's ID");
    error_mid=true;
  }
  else{
    error_mid=false;
    $('#a_miderror').hide();
    $('#a_miderror').text=("");
  }
}

function chk_desc(){
  var d=$('#desc').val();
  if($.trim(d)=='' || d.length > 1000){
    $('#a_descerror').show();
    $('#a_descerror').html("Please enter a valid description for the product(Maximum lenght: 1000 characters)");
    error_desc=true;
  }
  /*else if($('#desc').val().length > 1000){
    $('#a_descerror').show();
    $('#a_descerror').html("Maximum length is 1000 characters");
  }*/
  else{
    error_desc=false;
    $('#a_descerror').hide();
  }
}

function chk_feat(){
  var f=$('#feat').val();
  if($.trim(f)=='' || f.length > 500){
    $('#a_featerror').show();
    $('#a_featerror').html("Please enter features for the product(Maximum length: 500 characters) ");
    error_feat=true;
  }/*
  else if($('#feat').val().length > 500){
    $('#a_featerror').show();
    $('#a_featerror').html("Maximum length is 500 characters");
  }*/
  else{
    error_feat=false;
    $('#a_featerror').hide();
  }
}

function chk_cost(){
  var c=$('#cost').val();
  if( ($.trim(c)=='') || (c<=0) || (isNaN(c)) ){
    $('#a_costerror').show();
    $('#a_costerror').html("Please enter a valid cost for the product ");
    error_cost=true;
  }
  else{
    error_cost=false;
    $('#a_costerror').hide();
  }
}

function chk_retail(){
  var r=$('#retail').val();
  if($.trim(r)=='' || r<=0 || isNaN(r)){
    $('#a_retailerror').show();
    $('#a_retailerror').html("Please enter Retail price for the product");
    error_ret=true;
  }
  else{
    error_ret=false;
    $('#a_retailerror').hide();
  }
}


function val_image(){
  if($("#fileupload").val()==""){
    $(invalidFile1).show();
  }
  else if (!getfname($("#fileupload").val()).match(/.(jpg|jpeg|png|gif)$/)) {
    $(invalidFile).show();
  }
}

function getfname(path){
  if(path){
    fname=path.replace(/^.*[\\\/]/, '');
  }
  return fname;
}

$(document).ready(function() {
  //var error_sku=false;
  //  $("#tabs").tabs();
    //  clearerror();
    // $('#sku').on('focus', function() {
    //     $('#status1').text("");
    //   });
    //
    // $('#sku').on('focus', function() {
    // 	var sku = $('#sku').val("");
    // });
    $('#sku').focus();
    $('#sku').on('blur', function() {
      //chk_sku();
      //var sku = $.trim($('#sku').val());
      var sku=$('#sku').val();
      console.log(sku);
      var er=chk_sku();
      if(er==false){
    	//if(!sku) return;
    	var url = "/perl/jadrn036/check_dup.cgi?sku="+sku;
    	$.get(url, process_reply);
    }
    else {
      $('#a_skuerror').text("Enter a valid SKU of the form ABC-123");
    }
    });

    $('#category').on('blur', function(){
      chk_cat();
      if(error_cat == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#vendor').on('blur', function(){
      chk_ven();
      if(error_ven == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#m_id').on('blur', function(){
      chk_mid();
      if(error_mid == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#desc').on('blur', function(){
      chk_desc();
      if(error_desc == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#feat').on('blur', function(){
      chk_feat();
      if(error_feat == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#cost').on('blur', function(){
      chk_cost();
      if(error_cost == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    $('#retail').on('blur', function(){
      chk_retail();
      if(error_ret == true){
        document.getElementById("add_submit").disabled = true;
      }
      else {
        document.getElementById("add_submit").disabled = false;
      }
    });
    /*$form_type = $('#ftype').val();

    if(form_type == "edit"){
      $('#s_sku').focus();
      $('#editinv').hide();
    }
    if(form_type == "del"){
      $('#s_sku').focus();
      $('#deleteinv').hide();
    }*/
    $('#add_submit').on("click",function() {
      //check if all fields populated
      if(validate()){
      //check image
      val_image();
      //add Inventory
      var sku=$("#sku").val();
      var cat=document.getElementById("category").value;
      var ven=document.getElementById("vendor").value;
      var m_id=$("#m_id").val();
      //var desc=$("#desc").val();
      var desc=$.trim($('#desc').val());
      var fname=getfname($("#fileupload").val());
      //var feat=$("#feat").val();
      var feat=$.trim($('#feat').val());
      var cost=$("#cost").val();
      var retail=$("#retail").val();
      var quant=$("#quantity").val();
      sendfile();//upload picture
      $.ajax({
                type: "GET",
                url: "/perl/jadrn036/add_inventory.cgi",
                data: "sku="+sku+ "&catID="+cat+ "&venID="+ven+ "&m_id="+m_id+ "&desc="+desc+
                "&feat="+feat+ "&cost="+cost+ "&retail="+retail+ "&quantity="+quant+ "&fname="+fname,
                error:function(xhr, status, error){
                  //error
                  alert("Error adding data");
                  alert("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);
                  //document.getElementById("erroradding").innerHTML = "Error while adding data in db!";
                },
                success: function(result) {
                  console.log(result);
                  if(result == "notvaliduser"){
                    document.location = "/perl/jadrn036/logout.cgi";
                  }
                  document.getElementById("erroradding").innerHTML = "Product added successfully to database!";
            }
          });
/*          var url="/perl/jadrn036/add_inventory.cgi";
          url+="?sku="+sku+"&catID="+cat+"&venID="+ven+"&m_id="+m_id+"&desc="+desc+
          "&feat="+feat+"&cost="+cost+"&retail="+retail+"&quantity="+quant+"&fname="+fname;
          var req=new HttpRequest(url,handleData);
          req.send();
        }
*/
        function handleData(response){
          $('#erroradding').html(response);
        }
      }
      else {
        $('#erroradding').html("not validated");
      }
    });

});//closing of docready
  function process_reply(response) {
      $('#status1').text("");
      $('#status1').show();
      if(response == "OK"){
      	$('#status1').text("OK, not a duplicate");
        document.getElementById("add_submit").disabled = false;
      }
      else{
          $('#status1').text("ERROR, duplicate");
          document.getElementById("add_submit").disabled = true;
        }
      setTimeout(clearStatus1, 2000);
      }

  function clearStatus1() {
      $('#status1').fadeOut(1000);
      }

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
};

function send_file() {
        var form_data = new FormData($('form')[0]);
        var fname = document.getElementById("fileupload").value;
        var where = fname.lastIndexOf("\\");  // this is safer!
        fname = fname.substring(where+1);
        form_data.append("image", document.getElementById("fileupload").files[0]);
        $.ajax( {
            url: "/perl/jadrn036/upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
               $('#a_fileerror').css('color','blue');
               $('#a_fileerror').html("Your file has been received.");
               var toDisplay = "<img src=\"/~jadrn036/proj1/uploadDIR_/" + fname + "\" />";
               //$('#pic').html(toDisplay);

                },
            error: function(response) {
               $('#a_fileerror').css('color','red');
               $('#a_fileerror').html("Sorry, an upload error occurred, "+response.statusText);
                }
            });
        }
