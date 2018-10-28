var error_sku= false;
var error_mid= false;
var err_cat=false;
var err_ven=false;
var err_desc=false;
var err_feat=false;
var err_cost=false;
var cat_name;

$(document).ready(function() {

    $("[name='s_sku']").focus();

    $("#tabs").tabs();
    document.getElementById("del_sku").reset();
    document.getElementById("dcategory").disabled = true;
    document.getElementById("dvendor").disabled = true;
    document.getElementById("dm_id").disabled = true;
    document.getElementById("ddesc").disabled = true;
    document.getElementById("dfileupload").disabled = true;
    document.getElementById("dfeat").disabled = true;
    document.getElementById("dcost").disabled = true;
    document.getElementById("dretail").disabled = true;
    document.getElementById("dquantity").disabled = true;
    document.getElementById("del_submit").disabled = true;

    $('#del_search_sku').on('blur', function() {
      chk_sku();
      if(error_sku == false){
    	   var sku = $('#del_search_sku').val();
    	    if(!sku) return;
    	     var url = "/perl/jadrn036/chk_sku.cgi?sku="+sku;
    	      $.get(url, process_reply);
          }
    });

    $('#del_search_sku').on('focus', function() {
        $('#status').text("");
	});

    $('#del_search_sku').on('focus', function() {
    	var sku = $('#del_search_sku').val("");
	});
  });


function process_reply(response) {
    $('#status').text("");
    $('#status').show();
    if(response == "doesntexist")
    	$('#status').text("Enter a valid SKU that exists");
    else{
        $('#status').text("Found SKU");
        //retrieve data for the sku from db
        //var c_id="/perl/jadrn000/retrieve_cat_id.cgi?c="+cat_name;
        //var v_id="/perl/jadrn000/retrieve_ven_id.cgi?v="+ven_name;
        $ajax({
          type: "GET",
          url = "/perl/jadrn036/retrieve_data.cgi"
          data "sku="+sku,
          error: function(){
            alert("Error retrieving data");
          },
          success: function(data){
            if(data=="notvaliduser"){
              window.location="/perl/jadrn036/logout.cgi";
            }
            else {
              var d = eval("("+response+")");
              $('#s_sku').val(d[0][0]);
              $('#dcategory').val(d[0][1]);
              $('#dvendor').val(d[0][2]);
              $('#dm_id').val(d[0][3]);
              $('#ddesc').val(d[0][4]);
              $('#dfeat').val(d[0][5]);
              $('#dcost').val(d[0][6]);
              $('#dretail').val(d[0][7]);
              $('#dquantity').val(d[0][8]);
              //$('#').val(d[0][]);
            }
          }
      });

        $.get(url, display_reply);
      }
    setTimeout(clearStatus, 2000);
    }

function clearStatus() {
    $('#status').fadeOut(1000);
    }

function display_reply(response) {
  $('#dcategory').removeAttribute("disabled");
  $('#dvendor').removeAttribute("disabled");
  $('#dm_id').removeAttribute("disabled");
  $('#dm_id').removeAttribute("disabled");
  $('#dm_id').removeAttribute("disabled");
  $('#dm_id').removeAttribute("disabled");
  $('#dm_id').removeAttribute("disabled");
/*
  $('#status').text("");
  $('#status').show();
  if(response == "doesntexist")
    $('#status').text("Enter a valid SKU that exists");
  else{
      $('#status').text("Found SKU");
      //retrieve data for the sku from db
      var url = "/perl/jadrn000/retrieve_data.cgi?sku="+sku;
      $.get(url, display_reply);
  }
  setTimeout(clearStatus, 2000);*/
}

$('#del_submit').click(function(){
  if(validate()){
    //update the data in db - update_data.cgi;
/*    var sku=$('#del_search_sku').val();
    var c_name=$('select[name="dcategory"]').val();
    var v_name=$('select[name="dvendor"]').val();
    var m_id=$('#dm_id').val();
    var desc=$('#ddesc').val();
    var feat=$('#dfeat').val();
    var cost=$('#dcost').val();
    var retail=$('#dretail').val();
    var quantity=$('#dquantity').val();
    var fname;//get fileneme
*/
    $.ajax({
      type: "GET",
      url = "/perl/jadrn036/delete_data.cgi"
      data "sku="+sku,
      //+"&c_name"+c_name+"&v_name"+v_name+"&m_id"+m_id+"&desc"+desc+"&feat"+feat+
      //"&cost"+cost+"&retail"+retail+"&quantity"+quantity+"&fname"+fname,
      error: function(){
        alert("Error retrieving data");
      },
      success: function(data){
        if(data=="notvaliduser"){
          window.location="/perl/jadrn036/logout.cgi";
        }
        //updated successfully
        $('#status').show();
        $('#status').text("Product deleted successfully");
    });
});

function validate{
  //all variables should be true
  flag=false;

  if(error_sku == false)
  //&& error_cat== false && error_ven == false &&
  //error_mid== false && error_desc==false && error_feat==false && error_cost==false && error_ret==false){
    flag=false;
  }
  else {
    flag=true;
  }
  return flag;
}
function chk_sku(){
  if( (($('#del_search_sku').val()).trim=='') || (!$('#del_search_sku').val().match('/^[A-Z]{3}-[0-9]{3}$/')) ){
    $('#e_skuerror').show();
    $('#e_skuerror').html("Enter a valid SKU of the form ABC-123");
    error_sku= true;
  }
  else {
    error_sku= false;
    $('#e_skuerror').hide();
  }
  return error_sku;
}

function chk_cat(){
  if($('select[name="dcategory"]').val()=="") {
    $('#e_caterror').show();
    $('#e_caterror').html("Select a category from the dropdown");
    error_cat= true;
  }
  else {
    error_cat= false;
    $('#e_caterror').hide();
    cat_name= $('select[name="dcategory"]').val();
  }
}

function chk_ven(){
  if($('select[name="dvendor"]').val()=="") {
    $('#e_caterror').show();
    $('#e_venerror').html("Select a vendor from the dropdown");
    error_ven= true;
  }
  else {
    error_ven= false;
    $('#e_venerror').hide();
  }
}

function chk_mid(){
  if(($('#dm_id').val()).trim==''){
    $('#e_miderror').show();
    $('#e_miderror').html("Please enter a valid Manufacturer's ID");
    error_mid=true;
  }
  else{
    error_mid=false;
    $('#e_miderror').hide();
  }
}

function chk_desc(){
  if(($('#ddesc').val()).trim==''){
    $('#e_descerror').show();
    $('#e_descerror').html("Please enter a valid description for the product ");
    error_desc=true;
  }
  else{
    error_desc=false;
    $('#e_descerror').hide();
  }
}

function chk_feat(){
  if(($('#ddesc').val()).trim==''){
    $('#e_featerror').show();
    $('#e_featerror').html("Please enter a description/features for the product ");
    error_feat=true;
  }
  else{
    error_feat=false;
    $('#e_featerror').hide();
  }
}

function chk_cost(){
  if(($('#dcost').val()).trim=='' || $('#dcost').val()<=0 || !isNaN($('#dcost').val()) ){
    $('#e_costerror').show();
    $('#e_costerror').html("Please enter a valid cost for the product ");
    error_cost=true;
  }
  else{
    error_cost=false;
    $('#e_costerror').hide();
  }
}

function chk_retail(){
  if(($('#dretail').val()).trim=='' || $('#dretail').val()<=0 || !isNaN($('#dretail').val())){
    $('#e_retailerror').show();
    $('#e_retailerror').html("Please enter Retail price for the product");
    error_ret=true;
  }
  else{
    error_ret=false;
    $('#e_retailerror ').hide();
  }
}
