var cart_str = "";


$(document).ready(function(){
     var cart = new shopping_cart("jadrn036");
     $('#cart036').on('click',function(){
          // $('#products').css('display','none');
          // $('#showcart').css('display','block');
          // $('#showcart').siblings().css('display','none');

          getcartdata();
     });
});

function displaycart(url){
     $.ajax({
          url:url,
          async:true,
          success: handlecartData});
}
function updatedisplay(){
     $('#product').html("");
}
function getcartdata(){
     var cartArray = cart.getCartArray();
     var c = 0;
     var skuarr = "";
     if(cartArray.length > 0){
          for(i=0; i < cartArray.length; i++) {
               if(c == 0){
                    skuarr += "('" + cartArray[i][0] + "'";
                    c++;
               }
               else{
                    skuarr += ",'" + cartArray[i][0] + "'";
                    c++;
               }
          }
          if(skuarr!=""){
               skuarr += ")";
               console.log(skuarr);
               var url = "/jadrn036/servlet/LoadProducts?sku="+skuarr;
               // console.log(url);
               displaycart(url);
          }
     }
     else {
          $('#products').css('display','none');
          $('#showcart').css('display','block');
          $('#showcart').siblings().css('display','none');
          document.getElementById("showcart").innerHTML = "<img src='/~jadrn036/file_upload/empty_cart.png' class=emptycart alt=''>";
          // $('#showcart .emptycart').show();
          $(".productsincart").css('width','84%');
          $(".summary").hide();
     }
     $('#count').text(cart.size());
}
function handlecartData(response){
     $('#products').css('display','none');
     $('#showcart').css('display','block');
     $('#showcart').siblings().css('display','none');
     // console.log(response);
     var s = new Array();
     var q = new Array();
     var total = 0;
     var cartArray = cart.getCartArray();
     cart_str = "";
     for(i=0; i < cartArray.length; i++) {
          s[i] = cartArray[i][0];
          q[i] = cartArray[i][1];
     }
     var item = response.split('|||');
     cart_str += "<hr><table><tr><th>image</th><th>Name</th><th>Quantity Available</th><th>Quantity</th><th>Modify</th><th>Delete</th><th>Price</th></tr>";
     for (var i = 0; i < item.length; i++) {
          var v = item[i].split('|');
          cart_str += "<tr><td><img src=/~jadrn036/file_upload/"+ v[8] +" width=100px height=105px></td><td>" + v[3]+"</td><td>" + v[9]+"</td><td>" + q[i] + "</td><td><input type='number' required size='4' min=1 placeholder="+q[i]+" value="+q[i]+" id='qty"+i+"' onchange='changeqty(v[0],this.value)'></td><td><div class='del-btn-cart' id='del-btn-cart"+i+"'><button type='button' class='btn btn-primary'>Delete</button></div></td><td><i class='fa fa-dollar pull-right'>"+v[7]+"</i></td></tr>";
          total += parseFloat(v[7])*parseInt(q[i]);
     }
     // console.log(cart_str);
     cart_str += "</table>";
     cart_str += "<p> Subtotal: " + total + "</p>";
     cart_str += "<div class='proceedtopayment'><button type='button' name='button' class='getting-started btn btn-primary col-md-12' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#paymentmodal'>Proceed</button></div>";
     cart_str += "<div class='proceedtopayment'><button type='button' name='button' class='btn btn-primary col-md-12' >Proceed</button></div>";

     // console.log(cart_str);
     $('.productsincart').html(cart_str);
     // $('.carttotal').html(parseFloat(total).toFixed(2));
     // $('.tax').html((total*7.5/100).toFixed(2));
     // $('.totalpayable').html((parseFloat((total))+parseFloat((total*7.5/100))+5.0).toFixed(2));
     // $(".summary").show();
     for (var i = 0; i < item.length; i++) {
          $('#del-btn-cart'+i).on('click',function(){
               var id = this.id;
               var v=item[id.substring(12)].split('|');
               var sku = v[0];
               cart.delete(sku);
               getcartdata();
          });
     }
}

function changeqty(s,val){
     var cartArray = cart.getCartArray();
     for(i=0; i < cartArray.length; i++) {
          if(s == cartArray[i][0]){
               cartArray[i][1] = val;
          }
     }
     console.log(cartArray);
}

function checkempty(total){
     if(total == 0){
          $('#showcart .emptycart').show();
          $(".productsincart").css('width','84%');
          $(".summary").hide();
     }
}
