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
     cart_str += "<h3>Shopping Cart</h3>";
     cart_str += "<hr><table><tr><th></th><th></th><th></th><th>Modify</th><th>Delete</th><th>Price</th></tr>";
     for (var i = 0; i < item.length; i++) {
          var v = item[i].split('|');
          cart_str += "<tr><td><img src=/~jadrn036/file_upload/"+ v[8] +" width=100px height=105px></td><td>" + v[3]+"</td><td><input type='string' required size='4' min=1 placeholder="+q[i]+" value="+q[i]+" id='qty"+i+"' name=quant ></td><td><div class='updt-btn-cart' id='updt-btn-cart"+i+"'><button type='button' class='btn btn-primary'>Update</button></div></td><td><div class='del-btn-cart' id='del-btn-cart"+i+"'><button type='button' class='btn btn-primary'>Delete</button></div></td><td><i class='fa fa-dollar pull-right'>"+v[7]+"</i></td></tr>";
          total += parseFloat(v[7])*parseInt(q[i]);
     }
     cart_str += "</table>";
     total = parseFloat(total);
     cart_str += "<table class='cost'><tr><td class ='costcol1'>Subtotal:<br>Shipping Charge:<br>Tax(7.75%):<br>Total Due:</td>";
     cart_str += "<td class='costcol2'>$"+total.toFixed(2)+"<br>";
     var tax = parseFloat((total+5)*7.5/100);
     cart_str += "$5.00<br>$"+tax.toFixed(2);
     var totalamt = parseFloat(total+tax+5);
     cart_str += "<br>$"+totalamt.toFixed(2);
     cart_str += "</td></table><div class='proceedtopayment'><button type='button' name='proceed-button' id='proceed' class='btn btn-primary col-md-12 proceed' >Checkout</button></div>";

     // console.log(cart_str);
     $('.productsincart').html(cart_str);
     for (var i = 0; i < item.length; i++) {
          $('#del-btn-cart'+i).on('click',function(){
               var id = this.id;
               var v=item[id.substring(12)].split('|');
               var sku = v[0];
               cart.delete(sku);
               getcartdata();
          });
     }
     for (var i = 0; i < item.length; i++) {
          $('#updt-btn-cart'+i).on('click',function(){
               var id = this.id;
               var v=item[id.substring(13)].split('|');
               var sku = v[0];
               var q = $('#qty1').val();
               console.log(q);
               changeqty(sku,q);
               getcartdata();
          });
     }
     $('#proceed').on('click',$('input[type="button"]'), function(e){
          var txt = "You clicked on: ";
          var cartArray = cart.getCartArray();
          cart_str = "";
          for(i=0; i < cartArray.length; i++) {
               s[i] = cartArray[i][0];
               q[i] = cartArray[i][1];
          }
          var item = response.split('|||');
          // console.log("item");
          total = 0;
          cart_str += "<div class='row'>";
          cart_str += "<div class='col-md-6 payment'>";
          cart_str += "<h3>Address and Payment Details</h3><hr>";
          cart_str += loadpayment();
          cart_str += "</div></div>";

          cart_str += "<div class='col-md-6 ordersummary'>";
          cart_str += "<h3>Order Summary</h3>";
          cart_str += "<hr><table id='ordertable'><tr><th></th><th></th><th>Quantity</th><th>    Price</th></tr>";
          for (var i = 0; i < item.length; i++) {
               var v = item[i].split('|');
               cart_str += "<tr><td><img src=/~jadrn036/file_upload/"+ v[8] +" width=100px height=105px></td><td>" + v[3]+"</td><td>" + q[i] + "</td><td><i class='fa fa-dollar pull-right'>"+v[7]+"</i></td></tr>";
               total += parseFloat(v[7])*parseInt(q[i]);
          }
          total = parseFloat(total);
          cart_str += "<tr><hr><td class ='costcol1'>Subtotal:<br>Shipping Charge:<br>Tax(7.75%):<br>Total Due:</td><td></td><td></td>";
          cart_str += "<td class='costcol2'>$"+total.toFixed(2)+"<br>";
          var tax = parseFloat((total+5)*7.5/100);
          cart_str += "$5.00<br>$"+tax.toFixed(2);
          var totalamt = parseFloat(total+tax+5);
          cart_str += "<br>$"+totalamt.toFixed(2);
          cart_str += "</td></table>";

          cart_str += "</div>";    //add link to go back to edit products
          // cart_str += "<div class='proceedtopayment'><button type='button' name='button' class='getting-started btn btn-primary col-md-12' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#paymentmodal'>Proceed</button></div>";
          cart_str += "</div>"; //closing of class=row
          // console.log(cart_str);
          $('.productsincart').html(cart_str);

          $('#placeorder').on('click',$('input[type="button"]'), function(e){   //show order confirmation page
               var skuar = new Array();
               var name = $('#fname').val();
               var add1 = $('#address1').val();
               var add2 = $('#address1').val();
               var city = $('#city').val();
               var state = $('#state').val();
               var zip = $('#zip').val();
               var phone = $('#phone').val();
               var samechk =$("input[name=sameaddr]:checked").val();
               console.log(samechk);
               var sadd1 = $('#saddress1').val();
               var sadd2 = $('#saddress1').val();
               var scity = $('#scity').val();
               var sstate = $('#sstate').val();
               var szip = $('#szip').val();
               var sphone = $('#sphone').val();
               var crdno = $('#cardnum').val();
               var edt = $('#edate').val();
               var eyr = $('#eyear').val();
               var item = response.split('|||');
               var confirm_str ="";
               if(samechk == 'yes'){
                    console.log("hiiiii");
                    console.log(sadd1);
                    sadd1 += add1;
                    console.log(sadd1);
                    sadd2 += add2;
                    scity += city;
                    sstate += state;
                    szip += zip;
                    sphone += phone;
               }
               confirm_str += confirmstr(name,add1,add2,city,state,zip,phone,sadd1,sadd2,scity,sstate,szip,sphone,crdno,edt,eyr);

               var sku_str = "(";
               confirm_str += "<hr><table id='ordertable'><tr><th>image</th><th>Name</th><th>Quantity</th><th>Price</th></tr>";
               for (var i = 0; i < item.length; i++) {
                    var v = item[i].split('|');
                    confirm_str += "<tr><td><img src=/~jadrn036/file_upload/"+ v[8] +" width=100px height=105px></td><td>" + v[3]+"</td><td>" + q[i] + "</td><td><i class='fa fa-dollar pull-right'>"+v[7]+"</i></td></tr>";
                    total += parseFloat(v[7])*parseInt(q[i]);
                    sku_str += v[0];
                    sku_str += "=";
                    sku_str += q[i];
                    sku_str += ",";
                    skuar[i] = v[0];
               }
               sku_str = sku_str.substring(0,sku_str.length-1);//remove last ,
               sku_str += ")";
               console.log(sku_str);
               confirm_str += "</table>";
               // total = parseFloat(total).toFixed(2);
               // confirm_str += "<p> Subtotal: " + total + "</p>";
               // confirm_str += "</div>";
               // confirm_str += "<div></div>";

               confirm_str += "<table class='cost'><tr><td class ='costcol1'>Subtotal:<br>Shipping Charge:<br>Tax(7.75%):<br>Total Due:</td>";
               confirm_str += "<td class='costcol2'>$"+total.toFixed(2)+"<br>";
               var tax = parseFloat((total+5)*7.5/100);
               confirm_str += "$5.00<br>$"+tax.toFixed(2);
               var totalamt = parseFloat(total+tax+5);
               confirm_str += "<br>$"+totalamt.toFixed(2);
               confirm_str += "</div>";
               confirm_str += "<div></div>";

               $('.productsincart').html(confirm_str);
               //ajax call to delete mentioned quantity from db
               console.log(sku_str);
               $.ajax({
                    url:"/jadrn036/servlet/UpdateProducts?sku_str="+sku_str,
                    async:true,
                    success: oncomplete
               });

               // for (var i = 0; i < item.length; i++) {
               //      cart.delete(skuar[i]);
               // }
               // $('.productsincart').html(txt);
          });
     });
}

function changeqty(s,val){
     var cartArray = cart.getCartArray();
     for(i=0; i < cartArray.length; i++) {
          if(s == cartArray[i][0]){
               cartArray[i][1] = val;
          }
     }
     console.log(cartArray);
     getcartdata();
}

function checkempty(total){
     if(total == 0){
          $('#showcart .emptycart').show();
          $(".productsincart").css('width','84%');
          $(".summary").hide();
     }
}


function loadpayment(){
     var str_ret = "<form name='info' id='payment' > <div class='row '> <div class='form-group col-md-6'> <label for='name'>Full Name<span>*</span></label> <input class='form-control required' type='text' name='fname'  id='fname' size='100' /> <span>Please Enter Your Name</span> </div> </div> <div class='row'> <div class='col-md-6 form-group'> <label for='address1'>Address Line 1<span>*</span></label> <input class='form-control required' type='text' name='address1'  id='address1' size='50' /> <span>Please Enter Address</span> </div> <div class='col-md-6 form-group'> <label for='address2'>Address Line 2</label> <input class='form-control' type='text' name='address2'  id='address2' size='50' /> </div> </div> <div class='row '> <div class='form-group col-md-6'> <label for='city'>City<span>*</span></label> <input class='form-control required' type='text' name='city'  id='city'  /> <span>Please Enter Your City</span> </div> <div class='form-group col-md-6'> <label for='state'>State<span>*</span></label> <select class='form-control requiredDropDown' name='state' id='state'  data-live-search='true' > <option value=''>Select State</option> <option value='AL'>Alabama</option> <option value='AK'>Alaska</option> <option value='AZ'>Arizona</option> <option value='AR'>Arkansas</option> <option value='CA'>California</option> <option value='CO'>Colorado</option> <option value='CT'>Connecticut</option> <option value='DE'>Delaware</option> <option value='DC'>District Of Columbia</option> <option value='FL'>Florida</option> <option value='GA'>Georgia</option> <option value='HI'>Hawaii</option> <option value='ID'>Idaho</option> <option value='IL'>Illinois</option> <option value='IN'>Indiana</option> <option value='IA'>Iowa</option> <option value='KS'>Kansas</option> <option value='KY'>Kentucky</option> <option value='LA'>Louisiana</option> <option value='ME'>Maine</option> <option value='MD'>Maryland</option> <option value='MA'>Massachusetts</option> <option value='MI'>Michigan</option> <option value='MN'>Minnesota</option> <option value='MS'>Mississippi</option> <option value='MO'>Missouri</option> <option value='MT'>Montana</option> <option value='NE'>Nebraska</option> <option value='NV'>Nevada</option> <option value='NH'>New Hampshire</option> <option value='NJ'>New Jersey</option> <option value='NM'>New Mexico</option> <option value='NY'>New York</option> <option value='NC'>North Carolina</option> <option value='ND'>North Dakota</option> <option value='OH'>Ohio</option> <option value='OK'>Oklahoma</option> <option value='OR'>Oregon</option> <option value='PA'>Pennsylvania</option> <option value='RI'>Rhode Island</option> <option value='SC'>South Carolina</option> <option value='SD'>South Dakota</option> <option value='TN'>Tennessee</option> <option value='TX'>Texas</option> <option value='UT'>Utah</option> <option value='VT'>Vermont</option> <option value='VA'>Virginia</option> <option value='WA'>Washington</option> <option value='WV'>West Virginia</option> <option value='WI'>Wisconsin</option> <option value='WY'>Wyoming</option> </select> <span>Please Select State</span> </div> </div> <div class='row'> <div class='form-group col-md-6'> <label for='zip'>Zip<span>*</span></label> <input class='form-control required' type='text' name='zip' id='zip' maxlength='5' /> <span>Please Enter a Zip Code</span></div> <div class='form-group col-md-6'> <label for='phone'>Phone<span>*</span></label> <input class='form-control required' type='text' name='phone' id='phone' minlength ='13' maxlength='13' placeholder='(###)###-####' /><span class='invalidPhone'>Please Enter Phone Number in the format (###)###-####</span> </div> </div> <div class='row'> <div class='form-group col-md-12'> <label> Is the Shipping Address same as Billing Address<span>*</span></label> <label class='radio-inline'> <input  type='radio' name='sameaddr' value='yes'>Yes </label> <label class='radio-inline'> <input  type='radio' name='sameaddr' value='no'>No </label> <span class='noselect'>Please select an option</span> </div> </div> <div class='shippingaddr'> <div class='row'> <div class='col-md-6 form-group'> <label for='address1'>Address Line 1<span>*</span></label> <input class='form-control required' type='text' name='address1'  id='saddress1' size='50' /> <span>Please Enter Address</span> </div> <div class='col-md-6 form-group'> <label for='address2'>Address Line 2</label> <input class='form-control' type='text' name='address2'  id='saddress2' size='50' /> </div> </div> <div class='row '> <div class='form-group col-md-6'> <label for='city'>City<span>*</span></label> <input class='form-control required' type='text' name='city'  id='scity'  /> <span>Please Enter Your City</span> </div> <div class='form-group col-md-6'> <label for='state'>State<span>*</span></label> <select class='form-control requiredDropDown' name='state' id='sstate'  data-live-search='true' > <option value=''>Select State</option> <option value='AL'>Alabama</option> <option value='AK'>Alaska</option> <option value='AZ'>Arizona</option> <option value='AR'>Arkansas</option> <option value='CA'>California</option> <option value='CO'>Colorado</option> <option value='CT'>Connecticut</option> <option value='DE'>Delaware</option> <option value='DC'>District Of Columbia</option> <option value='FL'>Florida</option> <option value='GA'>Georgia</option> <option value='HI'>Hawaii</option> <option value='ID'>Idaho</option> <option value='IL'>Illinois</option> <option value='IN'>Indiana</option> <option value='IA'>Iowa</option> <option value='KS'>Kansas</option> <option value='KY'>Kentucky</option> <option value='LA'>Louisiana</option> <option value='ME'>Maine</option> <option value='MD'>Maryland</option> <option value='MA'>Massachusetts</option> <option value='MI'>Michigan</option> <option value='MN'>Minnesota</option> <option value='MS'>Mississippi</option> <option value='MO'>Missouri</option> <option value='MT'>Montana</option> <option value='NE'>Nebraska</option> <option value='NV'>Nevada</option> <option value='NH'>New Hampshire</option> <option value='NJ'>New Jersey</option> <option value='NM'>New Mexico</option> <option value='NY'>New York</option> <option value='NC'>North Carolina</option> <option value='ND'>North Dakota</option> <option value='OH'>Ohio</option> <option value='OK'>Oklahoma</option> <option value='OR'>Oregon</option> <option value='PA'>Pennsylvania</option> <option value='RI'>Rhode Island</option> <option value='SC'>South Carolina</option> <option value='SD'>South Dakota</option> <option value='TN'>Tennessee</option> <option value='TX'>Texas</option> <option value='UT'>Utah</option> <option value='VT'>Vermont</option> <option value='VA'>Virginia</option> <option value='WA'>Washington</option> <option value='WV'>West Virginia</option> <option value='WI'>Wisconsin</option> <option value='WY'>Wyoming</option> </select> <span>Please Select State</span> </div> </div> <div class='row'> <div class='form-group col-md-6'> <label for='zip'>Zip<span>*</span></label> <input class='form-control required' type='text' name='zip' id='szip' maxlength='5' /> <span>Please Enter a Zip Code</span> <span class='invalidzip'>Please Enter Valid Code</span> </div> <div class='form-group col-md-6 required'> <label for='phone'>Phone<span>*</span></label> <input class='form-control required' type='text' name='phone' id='sphone' minlength ='13' maxlength='13' placeholder='(###)###-####' /> <span>Please Enter Your Phone Number</span> <span class='invalidPhone'>Please Enter Phone Number in the format (###)###-####</span> </div> </div> </div> <div class='row'> <div class='form-group col-md-12'> <label>Card Type<span>*</span></label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='visa'><img src='/~jadrn036/file_upload/visa.jpg' width=25px height=25px alt='Visa'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='mastercard'><img src='/~jadrn036/file_upload/mastercard.png' width=25px height=25px alt='Mastercard'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='american Express'><img src='/~jadrn036/file_upload/ae.jpeg' width=25px height=25px alt='American Express'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='Discover'><img src='/~jadrn036/file_upload/discover.jpg' width=25px height=25px alt='Discover'> </label> <div class=''> <span class='card'>Please select Card Type</span></div> </div> </div> <div class='row'> <div class='form-group col-md-12'><label for='cardnum'>Card Number<span>*</span></label> <input class='form-control required' type='text' maxlength='16' name='cardnum' id='cardnum'> <span >Please Enter Card Number</span> <span class='invalidcardnum' style='display: none;'>Invalid Card Number</span> </div> <div class='row'> <div class='form-group col-md-4'><label for='cvv'>CVV<span>*</span></label> <input class='form-control required' type='text' maxlength='3' name='cvv' id='cvv'> <span>Please Enter CVV printed on back of your card</span> <span class='invalidcvv' style='display: none;'>Invalid CVV</span> </div> <div class='form-group  col-md-4'><label for='edate'>Expiration Date<span>*</span></label> <select class='form-control requiredDropDown' name='edate' id='edate'  data-live-search='true' > <option value='01'>01</option> <option value='02'>02</option> <option value='03'>03</option> <option value='04'>04</option> <option value='05'>05</option> <option value='06'>06</option> <option value='07'>07</option> <option value='08'>08</option> <option value='09'>09</option> <option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option></select> <span style='display: none;'>Please Enter Expiration Month</span> </div> <div class='form-group  col-md-4'><label for='eyear'>Expiration Year<span>*</span></label> <select class='form-control requiredDropDown' name='eyear' id='eyear'  data-live-search='true' > <option value='2018'> 2018</option> <option value='2019'> 2019</option> <option value='2020'> 2020</option> <option value='2021'> 2021</option> <option value='2022'> 2022</option> <option value='2023'> 2023</option> <option value='2024'> 2024</option> </select><span style='display: none;'>Please Enter Expiration Date</span> </div> </div> <div class='row'> <div class='form-group col-md-6'> <input class='form-control btn btn-danger' type='reset' value='Clear Data' id='reset'> </div> <div class='form-group col-md-6'> <button  class='form-control btn btn-success'  name='Submit Data' id='placeorder' >Place Order</button> </div> </div> </form>";
     return str_ret;
}

function confirmstr(name,add1,add2,city,state,zip,phone,sadd1,sadd2,scity,sstate,szip,sphone,crdno,edt,eyr){
     var con_str = "";

     con_str += "<div class='finaldisp'><h3>Thank you for Shopping at Laptop+</h3><h4>We have received your order and we'll let you know when we ship it out</h4>";
     con_str += "<h4>Your Order</h4></div>";
     con_str += "<div class='row'><div class='col-md-6 shipaddr'></div><div class='col-md-6 billaddr'></div></div>";
     con_str += "<div class='row'> <div class='col-md-6 shipaddr'> <h3>Billing Address</h3> <h4>Name: "+name+"</h4> <h4>Address: "+add1+"</h4> <h4>"+add2+"</h4> <h4>"+city+"</h4> <h4>"+state+" "+zip+"</h4> <h4>Phone: "+phone+"</h4> </div> <div class='col-md-6 billaddr'> <h3>Shipping Address</h3> <h4>Name: "+name+"</h4> <h4>Address: "+sadd1+"</h4> <h4>"+sadd2+"</h4> <h4>"+scity+"</h4> <h4>"+sstate+" "+szip+"</h4> <h4>Phone: "+sphone+"</h4> </div>  </div> <div class='row'> <h4>Card Details</h4> <h4>Card Number: "+crdno+"</h4> <h4> Expiry Date: "+edt +"/"+eyr+"</h4> </div>";
     return con_str;
}
function oncomplete(){
     console.log("in completed function");
     var cartArray = cart.getCartArray();
     for (i=0; i < cartArray.length; i++) {
          cart.delete(cartArray[i][0]);
     }
}
