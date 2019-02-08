<?php
session_start();
$proc = false;
if(isset($_POST['streg']) && isset($_SESSION['thashf'])){
  if($_SESSION['thashf'] == md5("aadhzipC".$_SESSION['thash'])){
    /*
    Aadhar auth & fingerprint, if any.
    */
    $c_name = $_POST['name'];
    $c_aadh = $_POST['aadh'];
    $c_zipC = $_POST['zip'];
    $verH = file_get_contents("http://localhost:3507/?aadh=".$c_aadh."&cand=".$c_zipC); //zipCode is of uint type too, Hence, utilizing the same function
    $verH = json_decode($verH, true);
    $proc = true;
  }
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
    <title>Blockchain Based Elections</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
    <?php 
    if($proc){
    echo "<script type='text/javascript'>
    var recgen = false;
    var list = false;
    var proc = false;
    var candReg = true;
    var txHash;
    var cname = '".$c_name."';
    var caadh = '".$c_aadh."';
    var zip = ".$c_zipC.";
    var mHash = '".$verH['messageHash']."';
    var v = '".$verH['v']."';
    var r = '".$verH['r']."';
    var s = '".$verH['s']."';
    </script>
    ";
    }
    ?>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2">
          <h1 class="text-center">Candidate Registration</h1>
          <hr/>
          <br/>
        </div>
      </div>
      <div id="loader" class="row alert alert-info" style="width:80%;margin:auto;display:none">
        <p class="text-center">
          Nominating you..
        </p>
      </div>
      <div id="vSuc" class="row alert alert-success text-center" style="display:none;width:80%;margin:auto">Nomination Successful.</div>
      <div id="regForm" class="row text-center">
        <form action="" method="post" style="width:60%;margin:auto;">
            <input type="text" class="form-control" placeholder="Your Name" id="name" name="name" required/><br/>
            <input type="text" class="form-control" placeholder="Your Aadhar no." id="aadhar" name="aadh" required/><br/>
            <input type="text" class="form-control" placeholder="Zip Code" id="zipCode" name="zip" required/><br/>
            <input type="submit" class="btn btn-primary" value="Nominate" name="streg" /><br/>
        </form>
      </div>
      <div id="voteMsg" class="row text-center" style="display:none;">
      <table class="table table-bordered" style="width:80%;margin:auto;margin-top:25px;padding:10px;font-size:20px;">
      <thead>
      <th colspan="2"><center>Nomination Receipt</center></th>
      <thead>
      <tbody id="vRec">
      </tbody>
      </table>
      </div>
    </div>
  </body>
</html>
