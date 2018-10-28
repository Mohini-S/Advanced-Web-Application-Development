var cat_str = "";
var ven_str = "";
var prod_str = "";
var cart;
var venids = new Array();
var catids = new Array();

$(document).ready(function(){
     initialize();

     $('.catPlus').click(function(){
          $('.catMinus').show();
          $('.catPlus').hide();
          $('.browsecategory').show();
     });

     $('.catMinus').click(function(){
          $('.catPlus').show();
          $('.catMinus').hide();
          $('.browsecategory').hide();
     });

     $('.catPlus1').click(function(){
          $('.catMinus1').show();
          $('.catPlus1').hide();
          $('.browsevendor').show();
     });

     $('.catMinus1').click(function(){
          $('.catPlus1').show();
          $('.catMinus1').hide();
          $('.browsevendor').hide();
     });

     //$.get("/jadrn036/servlet/LoadProducts",handleData);
});

function initialize(){
     //get categories
     $.ajax({
          url:"/jadrn036/servlet/BrowseData?browse=category",
          async:true,
          success: handlecategoryData});
     $.ajax({
          url:"/jadrn036/servlet/BrowseData?browse=vendor",
          async:true,
          success: handlevendorData});
     fetchProducts();
     cart= new shopping_cart("jadrn036");
}

function handleData(response) {
     $('#content').html(response);
}

function handlecategoryData(response){
     var cat = response.split('|||');
     for (var i = 0; i < cat.length; i++) {
          var c = cat[i].split('|');
          cat_str += "<div><input type=checkbox id =cat" + c[0] + " name=" + c[1]+"> "+ c[1] + "</div>";
     }
     document.getElementById("browsecategory").innerHTML = cat_str;
     for (var i = 0; i < cat.length; i++) {
          $('#cat'+i).on('click',function(){
               // display_category(this.id);
               var id = this.id;
               // console.log(id);
               if(document.getElementById(id).checked){
                    catids[id.substring(3)] = document.getElementById(id).name;
               }
               else {
                    delete catids[id];
               }
               // console.log(catids);
               disp_filtered_products();
          });
     }
}


function handlevendorData(response){
     var ven = response.split('|||');
     for (var i = 0; i < ven.length; i++) {
          var v = ven[i].split('|');
          ven_str += "<div><input type=checkbox id=ven" + v[0] + " name=" + v[1]+">"+ v[1] + "</div>";
     }
     document.getElementById("browsevendor").innerHTML = ven_str;
     for (var i = 0; i < ven.length; i++) {
          $('#ven'+i).on('click',function(){
               var id1 = this.id;
               if(document.getElementById(id1).checked){
                    venids[id1.substring(3)] = document.getElementById(id1).name;
               }
               else {
                    delete venids[id1.substring(3)];
               }
               console.log("venids: ");
               console.log(venids);
               disp_filtered_products();
          });
     }
}

function fetchProducts(){
     $.ajax({
          url:"/jadrn036/servlet/LoadProducts",
          async:true,
          success: handleproductData});
}

function handleproductData(response){
     // console.log(response);
     var item = response.split('|||');
     for (var i = 0; i < item.length; i++) {
          var v = item[i].split('|');
          if(v[8]==0){     //quantity is 0
               quant = "Coming Soon";
          }
          else {
               quant = "In Stock";
          }
          // prod_str += "<div><p><img src = /~jadrn036/file_upload/" + v[9] +" width=200px height=200px></p></div>";
          prod_str +="<div class='col-md-4 prodcell'><div class='title'><h5>" + v[3] + "</h5> <i class='fas fa-heart fa-inverse'></i></div><div class='firstdiv'><img src=/~jadrn036/file_upload/"+ v[8] +" width=250px height=225px><div class='bottom'>" + v[2] + "</div></div><div class='seconddiv'><div class='shortDesc'>"+ v[5] +"</div><p><div class='longDesc'><div><button class = showdetails id = showdetails>Show Details</button></div></p><a class='cartButton' id=cartButton data-toggle='tooltip' title='Add to Cart' product-id='" + v[0] + "' value='Add To Cart'><i class='fa fa-shopping-cart'></i></a>" + quant + "<i class='fa fa-dollar pull-right'>"+v[7]+"</i></div></div></div>";

     }
     // console.log(prod_str);
     document.getElementById("dispproducts").innerHTML = prod_str;
     for (var i = 0; i < item.length; i++) {
          var v = item[i].split('|');
          $('#showdetails').on('click',function(){
               display_details(v[0]);
               // $("#dialog-modal").dialog('open');
               var s="<div id=dialog-modal class=widget-dialog-container title=Complete Your Order><table><tr><td>Name:</td><td><input type=text name=name size=20 /></td></tr></table></div>";
               // document.getElementById("dispproducts").innerHTML = s;
          });
          $('#cartButton').on('click',function(){
               var sku = v[0];
               if(v[8] > 0){
                    cart.add(sku,1);
                    //updatedisp
                    //updatecartcount
               }
          });
     }
}

function display_details(s){
     window.location.href = "/jadrn036/servlet/DispProduct?sku="+s;

}

function disp_filtered_products(){
     var cat_filter = "";
     var ven_filter = "";
     var cnt = 0;
     var cnt1 = 0;
     var url = "/jadrn036/servlet/LoadProducts";
     if(catids.length > 0){
          for (var i = 0; i < catids.length; i++) {
               if(catids[i]){
                    if(cnt==0){
                         cat_filter += "(" + i;
                         cnt++;
                    }
                    else{
                         cat_filter += "," + i;
                         cnt++;
                    }
               }
          }
          if(cat_filter!=""){
               cat_filter += ")";
               url += "?category=" + cat_filter;
          }
          // console.log(url);
     }

     //write similar for vendor filter
     if(venids.length > 0){
          console.log("inside vendor loop");
          for (var j = 0; j < venids.length; j++) {
               if(venids[j]){
                    if(cnt1==0){
                         ven_filter += "(" + j;
                         cnt1++;
                    }
                    else{
                         ven_filter += "," + j;
                         cnt1++;
                    }
               }
          }
          if(ven_filter!=""){
               ven_filter += ")";
               url += "?vendor=" + ven_filter;
          }
          // console.log(url);
     }
     console.log(url);
     if(url != ""){
          // $.ajax({
          //      url:url,
          //      async:true,
          //      success: handlefilteredproductData});
          $.get(url,handlefilteredproductData)
     }
}

function handlefilteredproductData(response){
     // if(response != null || response != ""){
     //      handleproductData(response);
     //      console.log(response);
     // }
     // else {
     //      document.getElementById("dispproducts").innerHTML = "No relevant products found! Please try another search ";
     // }
     console.log(response);
     handleproductData(response);
}
