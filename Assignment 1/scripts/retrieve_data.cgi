#!/usr/bin/perl

use CGI;
use DBI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use JSON;

my $q = new CGI;
my $sku = $q->param('sku');
my @result;

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn036';
my $username = 'jadrn036';
my $password = 'drawer';
my $cookieid = $q->cookie('jadrn036SID');
my $session = new CGI::Session(undef, $cookieid, {Directory=>'/tmp'});
my $sid = $session->id;
if($cookieid ne $sid) {
  print $q->header('text/plain;charset=UTF-8');
  print "notvaliduser";
  return;
}

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";


# my $query="SELECT sku, vendor.name, category.name, vendorModel, description, features, cost, retail, quantity, image
# FROM vendor, category, product
# WHERE vendor.id=product.venID
# AND category.id=product.catID where sku='$sku'";

my $sth = $dbh->prepare("SELECT sku, catID, venID, vendorModel, description, features, cost, retail, quantity, image FROM product where sku='$sku'");
$sth->execute();
while (my @row = $sth->fetchrow_array())  {
	foreach $i (@row){
		$result.=$i."|";
  #push(@result, \@row);
	console.log(@row);
	}
}
$sth->finish();
$dbh->disconnect();
print "content-type: text/html\n\n";
print $result;
