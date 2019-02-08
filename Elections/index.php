<?php
session_start();
if(isset($_POST['starv']) && isset($_SESSION['thashf'])){
  if($_SESSION['thashf'] == md5("aadhzipC".$_SESSION['thash'])){
    /*
    Aadhar auth & fingerprint, if any.
    */
    $_SESSION['aadh'] = $_POST['aadh'];
    $_SESSION['zip'] = $_POST['zip'];
    $_SESSION['rand'] = rand(10000000, 99999999);
    $_SESSION['hash'] = md5($_POST['aadh'].$_POST['zip'].$_SESSION['rand']);
    header("Location:candList.php");
  }
}else if(isset($_SESSION['hash'])){
  header("Location:candList.php");
}else{
  $h1 = rand(1000000,99999999);
  $thash = md5("aadhzipC".$h1);
  $_SESSION['thash'] = $h1;
  $_SESSION['thashf'] = $thash;
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Blockchain Based Elections</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2">
          <h1 class="text-center">Blockchain Based Elections</h1>
          <hr/>
          <br/>
        </div>
      </div>
      <div id="voterForm" class="row text-center">
        <form action="index.php" method="post" style="width:60%;margin:auto;">
          <input type="text" class="form-control" placeholder="Your Aadhar no." id="aadhar" name="aadh" required/><br/>
          <input type="text" class="form-control" placeholder="Zip Code" id="zipCode" name="zip" required/><br/>
          <input type="submit" class="btn btn-primary" value="Start Voting" name="starv" /><br/>
        </form>
      </div>
    </div>

    

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
