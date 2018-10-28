use DBI;
use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn036/public_html/file_upload/';
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
my $cookie_sid = $q->cookie('jadrn036SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
  print $q->header('text/plain;charset=UTF-8');
  print "notvaliduser";
  print<<END;
  Content-type: text/html

  <html>
  <head>
  <meta http-equiv="refresh"
        content="0; url=http://jadran.sdsu.edu/~jadrn036/error.html" />
</head><body></body>
</html>

END
  return;
    }
# else {
#   send_to_main();
#     }

  $sku= $q->param("sku");
  $category=$q->param("catID");
  $vendor=$q->param("venID");
  $m_id=$q->param("m_id");
  $desc=$q->param("desc");
  $feat=$q->param("feat");
  $cost=$q->param("cost");
  $retail=$q->param("retail");
  $quantity=$q->param("quantity");
  $pic=$q->param("fname");
  my $dbh = DBI->connect($database_source, $username, $password)
	 or die "Cannot connect to DB";
  # my $sth1 = $dbh->prepare("SELECT id from category where name=$category");
  # $sth1->execute();
  # my $cat_id = $sth1->fetchrow_array();
  # $sth1->finish();
  #
  # my $sth2 = $dbh->prepare("SELECT id from vendor where name=$vendor");
  # $sth2->execute();
  # my $ven_id = $sth2->fetchrow_array();
  # $sth2->finish();

  my $query = "Insert into product (sku,catID, venID, vendorModel, description, features, cost, retail, quantity, image) values ('$sku','$category','$vendor','$m_id','$desc','$feat','$cost','$retail','$quantity','$pic')";
  # my sth = $dbh->prepare($query);
  # $sth->execute();
  $dbh->do($query)
    or die "Cannot insert into db";
  #sth->finish();

  $dbh->disconnect();

  #print <<END;
  print "Content-type:  text/html\n\n";
  print "added";
###########################################################################
