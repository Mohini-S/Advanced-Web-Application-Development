use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn036/public_html/file_upload/_uploadDIR_';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn036';
my $username = 'jadrn036';
my $password = 'drawer';

my $database_source = "dbi:mysql:$database:$host:$port";


my $sku;
my $category;
my $vendor;
my $m_id;
my $desc;
my $pic;
my $feat;
my $cost;
my $retail;
my $quantity;


##---------------------------- MAIN ---------------------------------------

my $q = new CGI;
my $cookieid = $q->cookie('jadrn036SID');
my $session = new CGI::Session(undef, $cookieid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookieid ne sid) {
  send_to_login_error();
    }
else {
  send_to_main();
    }
###########################################################################

###########################################################################
sub send_to_login_error {
    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh"
        content="0; url=/perl/jadrn036/logout.cgi" />
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

#    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
#    $session->expires('+1d');
#    my $cookie = $q->cookie(jadrn036SID => $session->id);
#    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser
#    my $sid = $session->id;
  $sku= $q->param("sku");
  $category=$q->param("category");
  $vendor=$q->param("vendor");
  $m_id=$q->param("m_id");
  $desc=$q->param("desc");
  $feat=$q->param("feat");
  $cost=$q->param("cost");
  $retail=$q->param("retail");
  $quantity=$q->param("quantity");
  $pic=$q->param("fileupload");

  my $dbh = DBI->connect($database_source, $username, $password)
	 or die "Cannot connect to DB";
  my $sth1 = $dbh->prepare("SELECT id from category where name=$category");
  $sth1->execute();
  my $cat_id = $sth1->fetchrow_array();
  $sth1->finish();

  my $sth2 = $dbh->prepare("SELECT id from vendor where name=$vendor");
  $sth2->execute();
  my $ven_id = $sth2->fetchrow_array();
  $sth2->finish();

  my $query = "Insert into product(sku,catID, venID, vendorModel, description, features, cost, retail, quantity, image) values (?,?,?,?,?,?,?,?,?,?)"
  my sth = $dbh->prepare($query);
  $sth->execute('$sku','$cat_id','$ven_id','$m_id','$desc','$feat','$cost','$retail','$quantity','$pic');
  $sth->finish();

  $dbh->disconnect();

  print <<END;
  Content-type:  text/html
  print "Product has been added successfully to the database!";

END
}
###########################################################################
