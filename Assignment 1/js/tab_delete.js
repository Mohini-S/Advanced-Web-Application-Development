//Salunke Mohini Account:
//RedId: 822049248
//CS 645, Spring 2018
//Project 1

var form_type;
var eerror_sku=false;


function echk_sku(){
  var s=$('#del_search_sku').val();
  var re=/^[A-Z]{3}-[0-9]{3}$/;
  //if( ($.trim(s)=='') || (!s.match('/^[A-Z]{3}-[0-9]{3}$/')) ){
  if( ($.trim(s)=='') || !(re.test($.trim(s))) ){
    //$('#e_skuerror').show();
    //$('#e_skuerror').text("Enter a valid SKU of the form ABC-123");
    eerror_sku= true;
  }
  else {
    eerror_sku= false;
    $('#d_skuerror').hide();
    //$('#e_skuerror').text("");
  }
  return eerror_sku;
}

/*
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
*/
function disableall(){
  document.getElementById("dcategory").disabled = true;
  document.getElementById("dvendor").disabled = true;
  document.getElementById("dm_id").disabled = true;
  document.getElementById("ddesc").disabled = true;
  document.getElementById("efileupload").disabled = true;
  document.getElementById("dfeat").disabled = true;
  document.getElementById("dcost").disabled = true;
  document.getElementById("dretail").disabled = true;
  document.getElementById("dquantity").disabled = true;
}

function enableall(){
  document.getElementById("dcategory").disabled = false;
  document.getElementById("dvendor").disabled = false;
  document.getElementById("dm_id").disabled = false;
  document.getElementById("ddesc").disabled = false;
  document.getElementById("efileupload").disabled =false;
  document.getElementById("dfeat").disabled = false;
  document.getElementById("dcost").disabled = false;
  document.getElementById("dretail").disabled = false;
  document.getElementById("dquantity").disabled = false;
}

function dprocess_reply(response) {
      $('#statusd').text("");
      $('#statusd').show();
      if(response == "OK"){ //means sku not there in db
        $('#statusd').text("SKU does not exist! Enter a valid SKU that exists");
        document.getElementById("del_submit").disabled = true;

      }
      else{
          var s=$.trim($('#del_search_sku').val());
          console.log(s);
          $('#statusd').text("SKU exists")
          var url="/perl/jadrn036/retrieve_data.cgi?sku="+s;

          $.get(url, dispdata);
          document.getElementById("del_submit").disabled = false;
        }
      setTimeout(dclearStatus, 2000);
}

function dispdata(values){
  if(values == ''){
    disableall();
    document.getElementById("del_submit").disabled = true;
  }
  else{
    enableall();
    row=getdataarr(values, ',');
    disableall();
  }
}

function getdataarr(inp, sval){//split values based on sval
  var temp=new Array();
  console.log(inp);
  temp=inp.split("|");
  console.log(temp[1]);
  document.getElementById("del_search_sku").value = temp[0];
  $('#dcategory').val(temp[1]);
  $('#dvendor').val(temp[2]);
  document.getElementById("dm_id").value = temp[3];
  document.getElementById("ddesc").value = temp[4];
  document.getElementById("dfeat").value = temp[5];
  document.getElementById("dcost").value = temp[6];
  document.getElementById("dretail").value = temp[7];
  document.getElementById("dquantity").value = temp[8];
  //document.getElementById("efileupload").src="/~jadrn036/public_html/file_upload/"+temp[9];

}

function dclearStatus() {
      $('#statusd').fadeOut(1000);
      }
/*
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
*/
$(document).ready(function() {
//  $('#del_sku').reset();

    $('#del_search_sku').focus();

    $('#d_skuerror').text("");
    $('#d_skuerror').hide();
    document.getElementById("del_submit").disabled = true;

    $('#del_search_sku').on('blur', function() {
      //echk_sku();
      var sku = $.trim($('#del_search_sku').val());
      var er=echk_sku();
      if(er==false){
    	//if(!sku) return;
    	var url = "/perl/jadrn036/check_dup.cgi?sku="+sku;
    	$.get(url, dprocess_reply);
    }
    else {
      $('#d_skuerror').show();
      $('#e_skuerror').text("Enter a valid SKU of the form ABC-123");
    }
    });


    $('#del_submit').on("click",function() {
      //check if all fields populated
      //if(evalidate()){
      if(eerror_sku==false){
      //check image
      //eval_image();
      var sku=$("#del_search_sku").val();
      var cat=document.getElementById("dcategory").value;
      var ven=document.getElementById("dvendor").value;
      var dm_id=$("#dm_id").val();
      var desc=$("#ddesc").val();
      //var fname=egetfname($("#efileupload").val());
      var feat=$("#dfeat").val();
      var cost=$("#dcost").val();
      var retail=$("#dretail").val();
      var quant=$("#dquantity").val();
      console.log("sku="+sku+ "&catID="+cat+ "&venID="+ven+ "&dm_id="+dm_id+ "&desc="+desc+
      "&feat="+feat+ "&cost="+cost+ "&retail="+retail+ "&quantity="+quant);//+ "&fname="+fname);
      var url = "/perl/jadrn036/delete_inventory.cgi?sku="+sku;
      $.get(url, handleData);
      $('#del_sku').reset();
      setTimeout(20000);
          function handleData(response){
            $('#errordel').html(response);
          }
        }
        else {
            $('#errordel').html("not valid user");
          }
    });

});//closing of docready
