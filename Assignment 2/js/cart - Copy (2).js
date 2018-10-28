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
     cart_str += "</table>";
     total = parseFloat(total).toFixed(2);
     cart_str += "<p> Subtotal: " + total + "</p>";
     // cart_str += "<div class='proceedtopayment'><button type='button' name='button' class='getting-started btn btn-primary col-md-12' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#paymentmodal'>Proceed</button></div>";
     cart_str += "<div class='proceedtopayment'><button type='button' name='button' id='proceed' class='btn btn-primary col-md-12' >Checkout</button></div>";
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

          cart_str += "<div class='row'>";
          cart_str += "<div class='col-md-6 payment'>";
          cart_str += "<h3>Address and Payment Details</h3><hr>";
          cart_str += loadpayment();
          cart_str += "</div>";

          cart_str += "<div class='col-md-6 ordersummary'>";
          cart_str += "<h3>Order Summary</h3>";
          cart_str += "<hr><table><tr><th>image</th><th>Name</th><th>Quantity</th><th>Price</th></tr>";
          for (var i = 0; i < item.length; i++) {
               var v = item[i].split('|');
               cart_str += "<tr><td><img src=/~jadrn036/file_upload/"+ v[8] +" width=100px height=105px></td><td>" + v[3]+"</td><td>" + q[i] + "</td><td><i class='fa fa-dollar pull-right'>"+v[7]+"</i></td></tr>";
               total += parseFloat(v[7])*parseInt(q[i]);
          }
          cart_str += "</table>";
          total = parseFloat(total).toFixed(2);
          cart_str += "<p> Subtotal: " + total + "</p>";
          cart_str += "</div>";    //add link to go back to edit products
          // cart_str += "<div class='proceedtopayment'><button type='button' name='button' class='getting-started btn btn-primary col-md-12' data-backdrop='static' data-keyboard='false' data-toggle='modal' data-target='#paymentmodal'>Proceed</button></div>";
          cart_str += "</div>"; //closing of class=row
          // console.log(cart_str);
          $('.productsincart').html(cart_str);
          $('#placeorder').on('click',$('input[type="button"]'), function(e){
               var confirm_str += confirmstr();
               $('.productsincart').html(confirm_str);
               //ajax call to delete mentioned quantity from db
               // $.ajax({
               //      url:"/jadrn036/servlet/UpdateProducts?sku=",
               //      async:true,
               //      success: handlecartData});
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
}

function checkempty(total){
     if(total == 0){
          $('#showcart .emptycart').show();
          $(".productsincart").css('width','84%');
          $(".summary").hide();
     }
}


function loadpayment(){
     var str_ret = "<form name='info' id='payment' > <div class='row '> <div class='form-group col-md-6'> <label for='name'>Full Name<span>*</span></label> <input class='form-control required' type='text' name='fname'  id='fname' size='100' /> <span>Please Enter Your Name</span> </div>  </div> <div class='row'> <div class='col-md-6 form-group'> <label for='address1'>Address Line 1<span>*</span></label> <input class='form-control required' type='text' name='address1'  id='address1' size='50' /> <span>Please Enter Address</span> </div> <div class='col-md-6 form-group'> <label for='address2'>Address Line 2</label> <input class='form-control' type='text' name='address2'  id='address2' size='50' /> </div> </div> <div class='row '> <div class='form-group col-md-6'> <label for='city'>City<span>*</span></label> <input class='form-control required' type='text' name='city'  id='city'  /> <span>Please Enter Your City</span> </div> <div class='form-group col-md-6'> <label for='state'>State<span>*</span></label> <select class='form-control requiredDropDown' name='state' id='state'  data-live-search='true' > <option value=''>Select State</option> <option value='AL'>Alabama</option> <option value='AK'>Alaska</option> <option value='AZ'>Arizona</option> <option value='AR'>Arkansas</option> <option value='CA'>California</option> <option value='CO'>Colorado</option> <option value='CT'>Connecticut</option> <option value='DE'>Delaware</option> <option value='DC'>District Of Columbia</option> <option value='FL'>Florida</option> <option value='GA'>Georgia</option> <option value='HI'>Hawaii</option> <option value='ID'>Idaho</option> <option value='IL'>Illinois</option> <option value='IN'>Indiana</option> <option value='IA'>Iowa</option> <option value='KS'>Kansas</option> <option value='KY'>Kentucky</option> <option value='LA'>Louisiana</option> <option value='ME'>Maine</option> <option value='MD'>Maryland</option> <option value='MA'>Massachusetts</option> <option value='MI'>Michigan</option> <option value='MN'>Minnesota</option> <option value='MS'>Mississippi</option> <option value='MO'>Missouri</option> <option value='MT'>Montana</option> <option value='NE'>Nebraska</option> <option value='NV'>Nevada</option> <option value='NH'>New Hampshire</option> <option value='NJ'>New Jersey</option> <option value='NM'>New Mexico</option> <option value='NY'>New York</option> <option value='NC'>North Carolina</option> <option value='ND'>North Dakota</option> <option value='OH'>Ohio</option> <option value='OK'>Oklahoma</option> <option value='OR'>Oregon</option> <option value='PA'>Pennsylvania</option> <option value='RI'>Rhode Island</option> <option value='SC'>South Carolina</option> <option value='SD'>South Dakota</option> <option value='TN'>Tennessee</option> <option value='TX'>Texas</option> <option value='UT'>Utah</option> <option value='VT'>Vermont</option> <option value='VA'>Virginia</option> <option value='WA'>Washington</option> <option value='WV'>West Virginia</option> <option value='WI'>Wisconsin</option> <option value='WY'>Wyoming</option> </select> <span>Please Select State</span> </div> </div> <div class='row'> <div class='form-group col-md-6'> <label for='zip'>Zip<span>*</span></label> <input class='form-control required' type='text' name='zip' id='zip' maxlength='5' /> <span>Please Enter a Zip Code</span> <span class='invalidzip'>Please Enter Valid Code</span> </div> <div class='form-group col-md-6'> <label for='phone'>Phone<span>*</span></label> <input class='form-control  required' type='text' name='phone' id='phone' minlength ='13' maxlength='13' placeholder='(###)###-####' /> <span>Please Enter Your Phone Number</span> <span class='invalidPhone'>Please Enter Phone Number in the format (###)###-####</span> </div> </div> <div class='row'> <div class='form-group col-md-12'> <label> Is the Shipping Address same as Billing Address<span>*</span></label> <label class='radio-inline'> <input  type='radio' name='sameaddr' value='yes'>Yes </label> <label class='radio-inline'> <input  type='radio' name='sameaddr' value='no'>No </label> <span class='noselect'>Please select an option</span> </div> </div><div class='shippingaddr'> <div class='row '> <div class='form-group col-md-6'> <label for='name'>Full Name<span>*</span></label> <input class='form-control required' type='text' name='fname'  id='sfname' size='50' /> <span>Please Enter Your Name</span> </div>  </div> <div class='row'> <div class='col-md-6 form-group'> <label for='address1'>Address Line 1<span>*</span></label> <input class='form-control required' type='text' name='address1'  id='saddress1' size='50' /> <span>Please Enter Address</span> </div> <div class='col-md-6 form-group'> <label for='address2'>Address Line 2</label> <input class='form-control' type='text' name='address2'  id='saddress2' size='50' /> </div> </div> <div class='row '> <div class='form-group col-md-6'> <label for='city'>City<span>*</span></label> <input class='form-control required' type='text' name='city'  id='scity'  /> <span>Please Enter Your City</span> </div> <div class='form-group col-md-6'> <label for='state'>State<span>*</span></label> <select class='form-control requiredDropDown' name='state' id='sstate'  data-live-search='true' > <option value=''>Select State</option> <option value='AL'>Alabama</option> <option value='AK'>Alaska</option> <option value='AZ'>Arizona</option> <option value='AR'>Arkansas</option> <option value='CA'>California</option> <option value='CO'>Colorado</option> <option value='CT'>Connecticut</option> <option value='DE'>Delaware</option> <option value='DC'>District Of Columbia</option> <option value='FL'>Florida</option> <option value='GA'>Georgia</option> <option value='HI'>Hawaii</option> <option value='ID'>Idaho</option> <option value='IL'>Illinois</option> <option value='IN'>Indiana</option> <option value='IA'>Iowa</option> <option value='KS'>Kansas</option> <option value='KY'>Kentucky</option> <option value='LA'>Louisiana</option> <option value='ME'>Maine</option> <option value='MD'>Maryland</option> <option value='MA'>Massachusetts</option> <option value='MI'>Michigan</option> <option value='MN'>Minnesota</option> <option value='MS'>Mississippi</option> <option value='MO'>Missouri</option> <option value='MT'>Montana</option> <option value='NE'>Nebraska</option> <option value='NV'>Nevada</option> <option value='NH'>New Hampshire</option> <option value='NJ'>New Jersey</option> <option value='NM'>New Mexico</option> <option value='NY'>New York</option> <option value='NC'>North Carolina</option> <option value='ND'>North Dakota</option> <option value='OH'>Ohio</option> <option value='OK'>Oklahoma</option> <option value='OR'>Oregon</option> <option value='PA'>Pennsylvania</option> <option value='RI'>Rhode Island</option> <option value='SC'>South Carolina</option> <option value='SD'>South Dakota</option> <option value='TN'>Tennessee</option> <option value='TX'>Texas</option> <option value='UT'>Utah</option> <option value='VT'>Vermont</option> <option value='VA'>Virginia</option> <option value='WA'>Washington</option> <option value='WV'>West Virginia</option> <option value='WI'>Wisconsin</option> <option value='WY'>Wyoming</option> </select> <span>Please Select State</span> </div> </div> <div class='row'> <div class='form-group col-md-6'> <label for='zip'>Zip<span>*</span></label> <input class='form-control required' type='text' name='zip' id='szip' maxlength='5' /> <span>Please Enter a Zip Code</span> <span class='invalidzip'>Please Enter Valid Code</span> </div> <div class='form-group col-md-6'> <label for='phone'>Phone<span>*</span></label> <input class='form-control  required' type='text' name='phone' id='sphone' minlength ='13' maxlength='13' placeholder='(###)###-####' /> <span>Please Enter Your Phone Number</span> <span class='invalidPhone'>Please Enter Phone Number in the format (###)###-####</span> </div> </div> </div><div class='row'> <div class='form-group col-md-12'> <label>Card Type<span>*</span></label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='visa'><img src='/~jadrn036/file_upload/visa.jpg' width=25px height=25px alt='Visa'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='mastercard'><img src='/~jadrn036/file_upload/mastercard.png' width=25px height=25px alt='Mastercard'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='american Express'><img src='/~jadrn036/file_upload/ae.jpeg' width=25px height=25px alt='American Express'> </label> <label class='radio-inline'> <input  type='radio' name='cardtype' value='Discover'><img src='/~jadrn036/file_upload/discover.jpg' width=25px height=25px alt='Discover'> </label> <div class=''> <span class='card'>Please select Card Type</span> </div> </div> </div> <div class='row'> <div class='form-group col-md-6'><label for='cardnum'>Card Number<span>*</span></label> <input class='form-control required' type='text' maxlength='16' name='cardnum' id='cardnum'> <span >Please Enter Card Number</span> <span class='invalidcardnum' style='display: none;'>Invalid Card Number</span> </div> <div class='form-group  col-md-3'><label for='edate'>Expiration Date<span>*</span></label> <select class='form-control requiredDropDown' name='edate' id='edate'  data-live-search='true' > <option value='01'>01</option> <option value='02'>02</option> <option value='03'>03</option> <option value='04'>04</option> <option value='05'>05</option> <option value='06'>06</option> <option value='07'>07</option> <option value='08'>08</option> <option value='09'>09</option> <option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option></select> <span style='display: none;'>Please Enter Expiration Month</span> </div> <div class='form-group  col-md-3'><label for='eyear'>Expiration Year<span>*</span></label> <select class='form-control requiredDropDown' name='eyear' id='eyear'  data-live-search='true' > <option value='2018'> 2018</option> <option value='2019'> 2019</option> <option value='2020'> 2020</option> <option value='2021'> 2021</option> <option value='2022'> 2022</option> <option value='2023'> 2023</option> <option value='2024'> 2024</option> </select><span style='display: none;'>Please Enter Expiration Date</span> </div>  </div> <div class='row'> <div class='form-group col-md-6'> <input class='form-control btn btn-danger' type='reset' value='Clear Data' id='reset'> </div> <div class='form-group col-md-6'> <button  class='form-control btn btn-success'  name='Submit Data' id='placeorder' >Place Order</button> </div> </div> </form>";
     return str_ret;
}

function confirmstr(){

     car con_str = "";
     con_str += 
     return con_str;
}
