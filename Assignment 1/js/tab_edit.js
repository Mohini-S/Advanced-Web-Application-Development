//Salunke Mohini Account:
//RedId: 822049248
//CS 645, Spring 2018
//Project 1

var form_type;
var eerror_cat=false;
var e_error_sku=false;
var eerror_mid=false;
var eerror_ven=false;
var eerror_desc=false;
var eerror_feat=false;
var eerror_cost=false;
var eerror_ret=false;

function evalidate(){
  //check if all fields entered
  var flag=false;

  if(e_error_sku == false && eerror_cat== false && eerror_ven == false &&
  eerror_mid== false && eerror_desc==false && eerror_feat==false && eerror_cost==false && eerror_ret==false){
    flag=true;
  }
  else {
    flag=false;
  }
  return flag;
}

function e_chk_sku(){
  var s=$('#edit_search_sku').val();
  var re=/^[A-Z]{3}-[0-9]{3}$/;
  //if( ($.trim(s)=='') || (!s.match('/^[A-Z]{3}-[0-9]{3}$/')) ){
  if( ($.trim(s)=='') || !(re.test($.trim(s))) ){
    //$('#e_skuerror').show();
    //$('#e_skuerror').text("Enter a valid SKU of the form ABC-123");
    e_error_sku= true;
  }
  else {
    e_error_sku= false;
    $('#e_skuerror').hide();
    //$('#e_skuerror').text("");
  }
  return e_error_sku;
}

function echk_cat(){
  if($('select[name="ecategory"]').val()=="") {
    $('#e_caterror').show();
    $('#e_caterror').html("Select a category from the dropdown");
    eerror_cat= true;
  }
  else {
    eerror_cat= false;
    $('#e_caterror').hide();
    cat_name= $('select[name="ecategory"]').val();
  }
}

function echk_ven(){
  if($('select[name="evendor"]').val()=="") {
    $('#e_caterror').show();
    $('#e_venerror').html("Select a vendor from the dropdown");
    eerror_ven= true;
  }
  else {
    eerror_ven= false;
    $('#e_venerror').hide();
    ven_name= $('select[name="evendor"]').val();
  }
}

function echk_mid(){
  var m=$('#em_id').val();
  if($.trim(m)==''){
    $('#e_miderror').show();
    $('#e_miderror').text("Please enter a valid Manufacturer's ID");
    eerror_mid=true;
  }
  else{
    eerror_mid=false;
    $('#e_miderror').hide();
    $('#e_miderror').text=("");
  }
}

function echk_desc(){
  var d=$('#edesc').val();
  if($.trim(d)=='' || d.length > 1000){
    $('#e_descerror').show();
    $('#e_descerror').html("Please enter a valid description for the product(Maximum lenght: 1000 characters)");
    eerror_desc=true;
  }
  /*else if($('#edesc').val().length > 1000){
    $('#e_descerror').show();
    $('#e_descerror').html("Maximum length is 1000 characters");
  }*/
  else{
    eerror_desc=false;
    $('#e_descerror').hide();
  }
}

function echk_feat(){
  var f=$('#efeat').val();
  if($.trim(f)=='' || f.length > 500){
    $('#e_featerror').show();
    $('#e_featerror').html("Please enter features for the product(Maximum length: 500 characters) ");
    eerror_feat=true;
  }/*
  else if($('#efeat').val().length > 500){
    $('#e_featerror').show();
    $('#e_featerror').html("Maximum length is 500 characters");
  }*/
  else{
    eerror_feat=false;
    $('#e_featerror').hide();
  }
}

function echk_cost(){
  var c=$('#ecost').val();
  if( ($.trim(c)=='') || (c<=0) || (isNaN(c)) ){
    $('#e_costerror').show();
    $('#e_costerror').html("Please enter a valid cost for the product ");
    eerror_cost=true;
  }
  else{
    eerror_cost=false;
    $('#e_costerror').hide();
  }
}

function echk_retail(){
  var r=$('#eretail').val();
  if($.trim(r)=='' || r<=0 || isNaN(r)){
    $('#e_retailerror').show();
    $('#e_retailerror').html("Please enter Retail price for the product");
    eerror_ret=true;
  }
  else{
    eerror_ret=false;
    $('#e_retailerror').hide();
  }
}


function eval_image(){
  if($("#efileupload").val()==""){
    $(invalidFile1).show();
  }
  else if (!egetfname($("#efileupload").val()).match(/.(jpg|jpeg|png|gif)$/)) {
    $(invalidFile).show();
  }
}

function egetfname(path){
  if(path){
    fname=path.replace(/^.*[\\\/]/, '');
  }
  return fname;
}
function disableall(){
  document.getElementById("ecategory").disabled = true;
  document.getElementById("evendor").disabled = true;
  document.getElementById("em_id").disabled = true;
  document.getElementById("edesc").disabled = true;
  document.getElementById("efileupload").disabled = true;
  document.getElementById("efeat").disabled = true;
  document.getElementById("ecost").disabled = true;
  document.getElementById("eretail").disabled = true;
  document.getElementById("equantity").disabled = true;
}

function enable_all(){
  document.getElementById("ecategory").disabled = false;
  document.getElementById("evendor").disabled = false;
  document.getElementById("em_id").disabled = false;
  document.getElementById("edesc").disabled = false;
  document.getElementById("efileupload").disabled =false;
  document.getElementById("efeat").disabled = false;
  document.getElementById("ecost").disabled = false;
  document.getElementById("eretail").disabled = false;
  document.getElementById("equantity").disabled = false;
}

function eprocess_reply(response) {
      $('#status').text("");
      $('#status').show();
      if(response == "OK"){ //means sku not there in db
        $('#status').text("SKU does not exist! Enter a valid SKU that exists");
        document.getElementById("edit_submit").disabled = true;
      }
      else{
          var s1=$.trim($('#edit_search_sku').val());
          console.log(s1);
          $('#status').text("SKU exists")
          var url="/perl/jadrn036/retrieve_data.cgi?sku="+s1;
          $.get(url, edispdata);
          document.getElementById("edit_submit").disabled = false;
        }
      setTimeout(clearStatus, 2000);
}

function edispdata(values){
  if(values == ''){
    disableall();
    document.getElementById("edit_submit").disabled = true;
  }
  else{
    enable_all();
    row=egetdataarr(values, ',');
  }
}

function egetdataarr(inp1, sval){//split values based on sval
  var etemp=new Array();
  console.log(inp1);

  // temp=inp.split(",");
  // //console.log(length(temp[5].le));
  // console.log(temp[1]);
  // document.getElementById("edit_search_sku").value = temp[0].substr(3, temp[0].length -4);
  // //document.getElementById("ecategory").value = temp[1];//"temp[1].substr(1, temp[1].length -2)";
  // $('#ecategory').val(temp[1].substr(1, temp[1].length -2));
  // //document.getElementById("evendor").value = temp[2].substr(1, temp[2].length -2);
  // $('#evendor').val(temp[2].substr(1, temp[1].length -2));
  // document.getElementById("em_id").value = temp[3].substr(1, temp[3].length -2);
  // document.getElementById("edesc").value = temp[4].substr(1, temp[4].length -2);
  // document.getElementById("efeat").value = temp[5].substr(1, temp[5].length -2);
  // document.getElementById("ecost").value = temp[6].substr(1, temp[6].length -2);
  // document.getElementById("eretail").value = temp[7].substr(1, temp[7].length -2);
  // document.getElementById("equantity").value = temp[8].substr(1, temp[8].length -2);
  // document.getElementById("efileupload").src="/~jadrn036/public_html/file_upload/"+temp[9];

  etemp=inp1.split("|");
  console.log(etemp[1]);
  document.getElementById("edit_search_sku").value = etemp[0];
  $('#ecategory').val(etemp[1]);
  $('#evendor').val(etemp[2]);
  document.getElementById("em_id").value = etemp[3];
  document.getElementById("edesc").value = etemp[4];
  document.getElementById("efeat").value = etemp[5];
  document.getElementById("ecost").value = etemp[6];
  document.getElementById("eretail").value = etemp[7];
  document.getElementById("equantity").value = etemp[8];
  document.getElementById("efileupload").src="/~jadrn036/public_html/file_upload/"+etemp[9];
  $('#e_skuerror').hide();
  $('#e_caterror').hide();
  $('#e_venerror').hide();
  $('#e_miderror').hide();
  $('#e_descerror').hide();
  $('#e_featerror').hide();
  $('#e_costerror').hide();
  $('#e_retailerror').hide();
}

function clearStatus() {
      $('#status').fadeOut(1000);
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

$(document).ready(function() {

    $('#edit_search_sku').focus();
    $('#e_skuerror').text("");
    $('#e_skuerror').hide();
    document.getElementById("edit_submit").disabled = true;

    $('#edit_search_sku').on('blur', function() {
      //e_chk_sku();
      var esku = $.trim($('#edit_search_sku').val());
      var er=e_chk_sku();
      if(er==false){
    	//if(!sku) return;
    	var url = "/perl/jadrn036/check_dup.cgi?sku="+esku;
    	$.get(url, eprocess_reply);
    }
    else {
      $('#e_skuerror').show();
      $('#e_skuerror').text("Enter a valid SKU of the form ABC-123");
    }
    });

    $('#category').on('blur', function(){
      echk_cat();
      if(eerror_cat == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#evendor').on('blur', function(){
      echk_ven();
      if(eerror_ven == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#em_id').on('blur', function(){
      echk_mid();
      if(eerror_mid == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#edesc').on('blur', function(){
      echk_desc();
      if(eerror_desc == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#efeat').on('blur', function(){
      echk_feat();
      if(eerror_feat == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#ecost').on('blur', function(){
      echk_cost();
      if(eerror_cost == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });
    $('#eretail').on('blur', function(){
      echk_retail();
      if(eerror_ret == true){
        document.getElementById("edit_submit").disabled = true;
      }
      else {
        document.getElementById("edit_submit").disabled = false;
      }
    });

    $('#edit_submit').on("click",function() {
      //check if all fields populated
      if(evalidate()){
      //check image
      //eval_image();
      //add Inventory
      var sku=$("#edit_search_sku").val();
      var cat=document.getElementById("ecategory").value;
      var ven=document.getElementById("evendor").value;
      var em_id=$("#em_id").val();
      var desc=$("#edesc").val();
      var fname=egetfname($("#efileupload").val());
      var feat=$("#efeat").val();
      var cost=$("#ecost").val();
      var retail=$("#eretail").val();
      var quant=$("#equantity").val();
      console.log("sku="+sku+ "&catID="+cat+ "&venID="+ven+ "&em_id="+em_id+ "&desc="+desc+
      "&feat="+feat+ "&cost="+cost+ "&retail="+retail+ "&quantity="+quant+ "&fname="+fname);
      //setTimeout(200000);
      var url="/perl/jadrn036/edit_inventory.cgi?sku="+sku+ "&catID="+cat+ "&venID="+ven+ "&em_id="+em_id+ "&desc="+desc+
      "&feat="+feat+ "&cost="+cost+ "&retail="+retail+ "&quantity="+quant+ "&fname="+fname;
      //setTimeout(20000);
      //alert("hi");
      $.get(url,handleData);
      /*
      $.ajax({
                type: "GET",
                url: "/perl/jadrn036/edit_inventory.cgi",
                data: "sku="+sku+ "&catID="+cat+ "&venID="+ven+ "&em_id="+em_id+ "&desc="+desc+
                "&feat="+feat+ "&cost="+cost+ "&retail="+retail+ "&quantity="+quant+ "&fname="+fname,
                error:function(xhr, status, error){
                  //error
                  alert("Error adding data");
                  alert("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);
                  //document.getElementById("erroradding").innerHTML = "Error while adding data in db!";
                },
                success: function(result) {
                  if(result == "notvaliduser"){
                    document.location = "/perl/jadrn036/logout.cgi";
                  }
                  document.getElementById("erroradding").innerHTML = "Product updated successfully to database!";
            }
          });*/

          function handleData(response){
            $('#erroradding').html(response);
          }
        }
        else {
            $('#erroradding').html("not valid user");
          }
    });

});//closing of docready
