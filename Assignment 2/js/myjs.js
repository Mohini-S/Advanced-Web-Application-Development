var cat_str = "";
var ven_str = "";
var prod_str = "";
var cart;
var venids = new Array();
var catids = new Array();
var sortval = "";

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
     $('#sortBy').change(function(){
          filterchange();
     });
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
     // filterchange();
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
                    delete catids[id.substring(3)];
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
               // console.log(venids);
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
     prod_str = "";
     var item = response.split('|||');
     for (var i = 0; i < item.length; i++) {
          var v = item[i].split('|');
          // console.log(v[9]);
          if(parseInt(v[9],10)==0){     //quantity is 0
               quant = " Coming Soon";
          }
          else {
               quant = " In Stock";
          }
          prod_str +="<div class='col-md-4 prodcell'><div class='title'><h5>" + v[1]+" - "+v[3] + "</h5> <i class='fas fa-heart fa-inverse'></i></div><div class='firstdiv'><img src=/~jadrn036/file_upload/"+ v[8] +" width=260px height=225px align='middle'><div class='bottom'></div></div><div class='seconddiv'>" + v[2] + "<div class='shortDesc'>"+ v[5] +"</div><p><div class='longDesc'><div>  <button class = showdetails id = showdetails"+i+" data-toggle='modal' data-target='#product_view"+i+"'>Show Details</button></div></p>";
          if(v[9]==0){
               prod_str += "<button class='btn cartButton' id=cartButton"+i+" data-toggle='tooltip' title='Add to Cart' product-id='" + v[0] + "' value='Add To Cart' disabled><i class='fa fa-shopping-cart'></i></button>";
          }
          else {
               prod_str += "<button class='btn cartButton' id=cartButton"+i+" data-toggle='tooltip' title='Add to Cart' product-id='" + v[0] + "' value='Add To Cart'><i class='fa fa-shopping-cart'></i></button>";
          }
          prod_str += quant + "<i class='fa fa-dollar pull-right'>"+v[7]+"</i></div></div></div><div class='modal fade product_view' id='product_view" +i+"'></div>";
     }
     $('.dispproducts').html(prod_str);
     for (var i = 0; i < item.length; i++) {
          $('#showdetails'+i).on('click',function(){
               var id = this.id;
               var v=item[id.substring(11)].split('|');
               var s1 = "<div class='modal-dialog'><div class='modal-content'><div class='modal-body'><a href='#' data-dismiss='modal' class='class pull-right'><span class='glyphicon glyphicon-remove'></span></a><div class='row'><div class='col-md-6 product_img'><img src=/~jadrn036/file_upload/"+ v[8] +" class='img-responsive'width=500px height=500px></div><div class='col-md-6 product_content'><h4>Product: <span>" + v[1]+" - "+v[3] + "</span></h4><hr><p>Features:<hr>" + v[5] + "</p><hr><p>Description:<hr>"+v[4] + "</p><h3 class='cost'><span class='glyphicon glyphicon-usd'></span>" + v[7] + "</h3><div class='row'><div class='col-md-4 col-sm-6 col-xs-12'></div>";
               // "<div class='btn-cart' id='btn-cart"+i+"' name='btn-cart'><button type='button' class='btn btn-primary'><span class='glyphicon glyphicon-shopping-cart'></span> Add To Cart</button></div>";
               s1 += "</div></div></div></div></div></div>";
               // console.log(v[4]);
               document.getElementById("product_view"+id.substring(11)).innerHTML = s1;
          });
     }
     for (var i = 0; i < item.length; i++) {
     //      $('#dispproducts').on('click', '[id="#btn-cart"+i]',function(){
     //      // $('#btn-cart'+i).on('click',function(){
     //           var id = this.id;
     //           var v=item[id.substring(8)].split('|');
     //           var sku = v[9];
     //           if(v[9]>0){
     //                console.log(sku);
     //                cart.delete(sku);
     //           }
     //           var p = cart.getCartArray();
     //           console.log(p.length);
     //      });
          $('#cartButton'+i).on('click',function(){
               var id = this.id;
               var v=item[id.substring(10)].split('|');
               var cartarr = cart.getCartArray();
               var sku = v[0];
               // console.log(v[9]);
               if(v[9]>0){
                    console.log(sku);
                    cart.add(sku,1);
               }
               var p = cart.getCartArray();
               console.log(p.length);
               for (var i = 0; i < p.length; i++) {
                    console.log(p[i][0]);
               }
          });
     }
}

function display_details(s){
     window.location.href = "/jadrn036/servlet/DispProduct?sku="+s;
}
function filterchange(){
          var filter = document.getElementById("sortBy");
          sortval = filter.options[filter.selectedIndex].value;
          if(sortval == 'best'){
               disp_filtered_products();
          }
          else if(sortval == 'priceAsc'){
               sortval = "ASC";
               disp_filtered_products();
          }
          else if(sortval == 'priceDesc'){
               sortval = "DESC";
               disp_filtered_products();
          }
          else {
               sortval = "";
          }
}
function disp_filtered_products(){
     var cat_filter = "";
     var ven_filter = "";
     var cnt = 0;
     var cnt1 = 0;
     var flag = 0;
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
               flag = 1;
          }
          // console.log(url);
     }

     //write similar for vendor filter
     if(venids.length > 0){
          // console.log("inside vendor loop");
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
               if(flag == 1){
                    url += "&vendor=" + ven_filter;
               }
               else {
                    url += "?vendor=" + ven_filter;
                    flag =1;
               }
          }
          // console.log(url);
     }
     if(sortval != ""){
          if(sortval == 'best'){
               //dont append to url
          }
          else{
               if(flag == 1){
                    url+= "&sortby=" + sortval;
               }
               else {
                    url+= "?sortby=" + sortval;
               }
          }
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
     // console.log(response);
     handleproductData(response);
}
$('.cart036').on('click',function() {
     $('.paymentButton button').show();
     $('.totalPayableParent h3').html($('.totalPayableParent h3').html().replace("Amount Paid", "Payable Amount"))  ;
     $('.productsincart h3').html('My Cart');
     $('#showcart').css('display','block');
     $('#showcart').siblings().css('display','none');
     $('.afterOrderconfirmation').hide();
});

$('#home').on('click',function() {
     $('#products').css('display','block');
     initialize();

     $('#products').siblings().css('display','none');

});
