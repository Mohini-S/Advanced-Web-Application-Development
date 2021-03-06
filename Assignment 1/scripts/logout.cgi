use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn036SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn036SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser


print <<END;
<!DOCTYPE HTML>
<html>
  <head>
     <meta charset="utf-8">
     <title>Laptops+ Login Page </title>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
     <link rel="stylesheet" href="/~jadrn036/proj1/css/my_css.css">
     <script src="/~jadrn036/proj1/js/validations.js"></script>
     <script src="/jquery/jquery.js"></script>
  </head>
  <body>
    <div class="container1"></div>
    <div class="container" id="container">
      <p> </p>
      <p>You are now logged out!</p>
      <div class="box">

        <p>Login to Account again</p>
        <hr>
        <form name="login" class="userlogin" id="userlogin" method="POST" action="/perl/jadrn036/login.cgi">
          <div class="username">
            <label>Username</label>
            <input type="text" placeholder="Enter Username" class="login" name="uname" id="uname" required >
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" class="login" name="pwd" id="pwd" required>
            <input type="checkbox" id="checkpwd">Show Password
            <div id="row">
                <button type="reset" class="btn btn-primary btn-lg">Reset
                <button type="submit" class="btn btn-primary btn-lg">Login
            </div>
          </div>
        </form>
        <div id="error"></div>
    </div>
    </div>

  </body>
</html>

END
