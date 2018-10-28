#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;

##---------------------------- MAIN ---------------------------------------

my $q;
if(authenticate_user()) {
    send_to_main();
    }
else {
    send_to_login_error();
    }
###########################################################################

###########################################################################
sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("uname");
    my $password = $q->param("pwd");
    open DATA, "</srv/www/cgi-bin/jadrn036/passwords.dat"
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;
    if($stored_user eq $user && check_password($stored_pass, $password)) {
        $OK = 1;
        last;
        }
    }

    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {
    print <<END;
Content-type:  text/html

<html>
<head>
    <div>error</div>
</head><body></body>
</html>

END
    }

###########################################################################

###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn036SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser
    my $sid = $session->id;
    print <<END;

    <!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />

        <title>Menu</title>
        <link rel="icon" href="/~jadrn036/proj1/css/Images/l.png" type="image/gif">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="/~jadrn036/proj1/js/jQueryUI.js"></script>
        <script src="/~jadrn036/proj1/js/my_js.js"></script>
        <script src="/~jadrn036/proj1/js/open_form.js"></script>
        <script src="/~jadrn036/proj1/js/tab_edit.js"></script>
        <script src="/~jadrn036/proj1/js/tab_delete.js"></script>
        <script src="/~jadrn036/proj1/js/ajax_get_lib.js"></script>
        <link rel="stylesheet" href="/~jadrn036/proj1/css/menu.css">
    </head>
    <body>
      <div id="bg">
      <h2>Manage Inventory
        <!--
        <a href="/perl/jadrn036/logout.cgi">Logout Now</a>
        -->
        <a href="/perl/jadrn036/proj1/logout.cgi" id="logout">
          <input type="button" class="form-control btn btn-info" value="Logout">
        </a></h2></div>

        <div id="tabs">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#new_inv" data-toggle="tab">New Record</a></li>
              <li><a href="#edit_inv" data-toggle="tab">Edit Record</a></li>
              <li><a href="#delete_inv" data-toggle="tab">Delete Record</a></li>
            </ul>
            <div id="new_inv">
              <p>Add New Item to Inventory </p>
                <form name="addnewinv" id="addnew" method="post" enctype="multipart/form-data">
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="sku">SKU<span>*</span></label>
                    <input class="form-control required" type="text" name="sku" id="sku" size="7" maxlength="7" required/>
                    <h3 id= "status1"></h3>
                    <div id="a_skuerror"></div>
                  </div>

                  <div class="form-group col-md-6">
                  <label for="category">Category<span>*</span></label>
                    <select class="form-control requiredDropDown" name="category" id="category"  data-live-search="true" required>
                      <option value="">Select Category</option>
                      <option value="1">Gaming Laptop</option>
                      <option value="2">Business Laptop</option>
                      <option value="3">Home</option>
                      <option value="4">2 in 1</option>
                      <option value="5">MacBook</option>
                      <option value="6">ChromeBook</option>
                    </select>
                    <h3></h3>
                  <div id="a_caterror"></div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">Vendor<span>*</span></label>
                    <select class="form-control requiredDropDown" name="vendor" id="vendor"  data-live-search="true" required>
                    <option value="">Select Vendor</option>
                    <option value="1">Lenovo</option>
                    <option value="2">Dell</option>
                    <option value="3">Apple</option>
                    <option value="4">HP</option>
                    <option value="5">Asus</option>
                    <option value="6">Acer</option>
                    <option value="7">MSI</option>
                    <option value="8">Samsung</option>
                  </select>
                  <div id="a_venerror"></div>
                </div>

                <div class="form-group col-md-6">
                <label for="m_id">Manufacturers Identification<span>*</span></label>
                  <input class="form-control required" type="text" name="m_id" id="m_id" size="25" required/>
                  <div id="a_miderror"></div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-12">
                <label for="desc">Description<span>*</span></label>
                  <textarea class="form-control required" id="desc" name="desc" rows="3" required></textarea>
                  <div id="a_descerror"></div>
                </div>
              </div>

              <div class="form-row">
              <div class="col-md-12">
              <label for="feat">Features<span>*</span></label>
                <textarea class="form-control required" id="feat" name="feat" rows="3" required></textarea>
                <div id="a_featerror"></div>
              </div>
              </div>

              <div class="form-row">
                <div class="col-md-6">
                  <label class="col-md-12" >Profile Pic<span>*</span></label>
                  <div class="row form-group ">
                    <img class="col-md-6" id="prod_img" src="/~jadrn036/proj1/css/Images/default.png" alt="Upload image" height="auto">
                    <input class="col-md-12" type="file" name="fileupload"  id="fileupload" accept="image/*" required/>
                    <div id="a_fileerror"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row-md-4">
                  <label for="cost">Cost<span>* &dollar; </span></label>
                  <input class="form-control required" type="text" name="cost" id="cost" size="25" required/>
                  <div id="a_costerror"></div>
                  </div>

                  <div class="form-group row-md-4">
                  <label for="retail">Retail<span>* &dollar; </span></label>
                  <input class="form-control required" type="text" name="retail" id="retail" size="25" required/>
                  <div id="a_retailerror"></div>
                  </div>

                  <div class="form-group row-md-4">
                  <label for="quantity">Quantity<span>* </span></label>
                  <input class="form-control required" type="number" name="quantity" value="1" id="quantity" size="25" required/>
                  <div id="a_quanterror"></div>
                  </div>
              </div>
              </div>

                <div class="row">
                  <div  class="form-group col-md-6">
                  <input class="form-control btn btn-danger" type="reset" value="Clear Data" id="reset"/>
                  </div>
                  <div class="form-group col-md-6">
                    <button  class="form-control btn btn-success"  name="Submit Data" id="add_submit" >Submit</button>
                  </div>
                </div>
                <input type="hidden" name="ftype" value="new" id="ftype"/>
                <div>
                  <p class="erroradding" id="erroradding"></p>
                </div>
            </form>
          </div><!--for id='new_inv'-->


          <div id="edit_inv">
            <p>Edit item in Inventory </p>
            <form name="edit_sku" id="edit_sku" method="POST" enctype="multipart/form-data">
              <div class="form-group col-md-6">
                <label for="edit_search_sku">Please enter SKU for the product you want to edit<span>*</span></label>
                <input class="form-control required" type="text" name="edit_search_sku" id="edit_search_sku" size="7" required autofocus/>
                <h3 id= "status"></h3>
                <div id="e_skuerror"></div>

              </div>

            <!---retrieve data from db if entered sku is correct-->

              <div class="form-group col-md-6">
              <label for="ecategory">Category<span>*</span></label>
                <select class="form-control requiredDropDown" name="ecategory" id="ecategory"  data-live-search="true" disabled>
                  <option value="">Select Category</option>
                  <option value="1">Gaming Laptop</option>
                  <option value="2">Business Laptop</option>
                  <option value="3">Home</option>
                  <option value="4">2 in 1</option>
                  <option value="5">MacBook</option>
                  <option value="6">ChromeBook</option>
                </select>
              <div id="e_caterror"></div>
            </div>

            <div class="form-group col-md-6">
              <label for="category">Vendor<span>*</span></label>
                <select class="form-control requiredDropDown" name="evendor" id="evendor"  data-live-search="true" disabled>
                <option value="">Select Vendor</option>
                <option value="1">Lenovo</option>
                <option value="2">Dell</option>
                <option value="4">HP</option>
                <option value="3">Apple</option>
                <option value="5">Asus</option>
                <option value="6">Acer</option>
                <option value="7">MSI</option>
                <option value="8">Samsung</option>
              </select>
              <div id="e_venerror"></div>
            </div>

            <div class="form-group col-md-6">
            <label for="m_id">Manufacturer's Identification<span>*</span></label>
              <input class="form-control required" type="text" name="em_id" id="em_id" size="25" disabled />
              <div id="e_miderror"></div>
            </div>

            <div class="col-md-6">
            <label for="desc">Description<span>*</span></label>
              <textarea class="form-control required" id="edesc" name="edesc" rows="3" disabled></textarea>
              <div id="e_descerror"></div>
            </div>

            <div class="col-md-6">
              <label class="col-md-12" >Profile Pic<span>*</span></label>
              <div class="row form-group ">
                <img class="col-md-6" id="prod_img" src="/~jadrn036/proj1/css/Images/default.png" alt="Upload image" height="auto">
                <input class="col-md-12" type="file" name="efileupload"  id="efileupload" accept="image/*" disabled />
                <div id="e_fileerror"></div>
              </div>
            </div>

            <div class="col-md-12">
            <label for="feat">Features<span>*</span></label>
              <textarea class="form-control required" id="efeat" name="efeat" rows="3" disabled></textarea>
              <div id="e_featerror"></div>
            </div>

            <div class="form-group col-md-4">
            <label for="cost">Cost*: &dollar;</label>
              <input class="form-control required" type="text" name="ecost" id="ecost" size="25"  disabled />
              <div id="e_costerror"></div>
            </div>

            <div class="form-group col-md-4">
            <label for="retail">Retail<span>*: &dollar;</span></label>
              <input class="form-control required" type="text" name="eretail" id="eretail" size="25" disabled />
              <div id="e_retailerror"></div>
            </div>

            <div class="form-group col-md-4">
            <label for="retail">Quantity<span>*: </span></label>
            <input class="form-control required" type="number" name="equantity" value="1" id="equantity" size="25" disabled />
            <div id="e_quanterror"></div>
            </div>

            <div class="row">
              <div  class="form-group col-md-6">
              <input class="form-control btn btn-danger" type="reset" value="Clear Data" id="reset" />
              </div>
              <div class="form-group col-md-6">
                <button  class="form-control btn btn-success"  name="edit_submit" id="edit_submit">Edit</button>
              </div>
            </div>
            <input type="hidden" name="ftype" value="edit" id="ftype"/>
        </form>
          </div><!--for id='edit_inv'-->


          <div id="delete_inv">
            <p>Delete item from Inventory</p>
            <form name="del_sku" id="del_sku" method="post" enctype="multipart/form-data">
              <div class="form-group col-md-6">
                <label for="del_search_sku">Please enter SKU for the product you want to delete<span>*</span></label>
                <input class="form-control required" type="text" name="del_search_sku" id="del_search_sku" size="7" required autofocus/>
                <h3 id= "statusd"></h3>
                <div id="d_skuerror"></div>
              </div>
              <!---retrieve data from db if entered sku is correct-->

                <div class="form-group col-md-6">
                <label for="category">Category<span>*</span></label>
                  <select class="form-control requiredDropDown" name="dcategory" id="dcategory"  data-live-search="true" disabled>
                    <option value="">Select Category</option>
                    <option value="1">Gaming Laptop</option>
                    <option value="2">Business Laptop</option>
                    <option value="3">Home</option>
                    <option value="4">2 in 1</option>
                    <option value="5">MacBook</option>
                    <option value="6">ChromeBook</option>
                  </select>
              </div>

              <div class="form-group col-md-6">
                <label for="category">Vendor<span>*</span></label>
                  <select class="form-control requiredDropDown" name="dvendor" id="dvendor"  data-live-search="true" disabled>
                  <option value="">Select Vendor</option>
                  <option value="1">Lenovo</option>
                  <option value="2">Dell</option>
                  <option value="4">HP</option>
                  <option value="3">Apple</option>
                  <option value="5">Asus</option>
                  <option value="6">Acer</option>
                  <option value="7">MSI</option>
                  <option value="8">Samsung</option>
                </select>
              </div>

              <div class="form-group col-md-6">
              <label for="m_id">Manufacturer's Identification<span>*</span></label>
                <input class="form-control required" type="text" name="dm_id" id="dm_id" size="25" disabled />
              </div>

              <div class="col-md-6">
              <label for="desc">Description<span>*</span></label>
                <textarea class="form-control required" id="ddesc" name="ddesc" rows="3" disabled></textarea>
              </div>

              <div class="col-md-6">
                <label class="col-md-12" >Profile Pic<span>*</span></label>
                <div class="row form-group ">
                <img class="col-md-6" id="prod_img" src="/~jadrn036/proj1/css/Images/default.png" alt="Upload image" height="auto">
                <input class="col-md-12" type="file" name="dfileupload"  id="dfileupload" accept="image/*" disabled />
                </div>
              </div>

              <div class="col-md-12">
              <label for="feat">Features<span>*</span></label>
                <textarea class="form-control required" id="dfeat" name="dfeat" rows="3" disabled></textarea>
              </div>

              <div class="form-group col-md-4">
              <label for="cost">Cost*: &dollar;</label>
                <input class="form-control required" type="text" name="dcost" id="dcost" size="25"  disabled />
              </div>

              <div class="form-group col-md-4">
              <label for="retail">Retail<span>*: &dollar;</span></label>
                <input class="form-control required" type="text" name="dretail" id="dretail" size="25" disabled />
              </div>

              <div class="form-group col-md-4">
              <label for="retail">Quantity<span>*: </span></label>
              <input class="form-control required" type="number" name="dquantity" value="1" id="dquantity" size="25" disabled />
              </div>

              <div class="row">
                <div  class="form-group col-md-6">
                <input class="form-control btn btn-danger" type="reset" value="Clear Data" id="reset" />
                </div>
                <div class="form-group col-md-6">
                  <button  class="form-control btn btn-success"  name="del_submit" id="del_submit" >Delete</button>
                </div>
              </div>
              <input type="hidden" name="ftype" value="delete" id="ftype"/>
              <div>
                <p class="errordel" id="errordel"></p>
              </div>
            </form>

          <!---retrieve data from db if entered sku is correct-->
          </div><!--for id='delete_inv'-->

        </div>
<br />
</body>
</html>

END
}
###########################################################################
