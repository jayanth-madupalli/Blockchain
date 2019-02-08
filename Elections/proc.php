<?php
session_start();
if(isset($_GET['cId']) && isset($_SESSION['hash'])){
    $hash = md5($_SESSION['aadh'].$_SESSION['zip'].$_SESSION['rand']);
    if($hash != $_SESSION['hash']){
        session_destroy();
        header("Location:index.php");
        exit();
    }
    $verH = file_get_contents("http://localhost:3507/?aadh=".$_SESSION['aadh']."&cand=".$_GET['cId']);
    $verH = json_decode($verH, true);
}else{
  session_destroy();
  header("Location:index.php");
  exit();
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

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/web3.min.js"></script>
    <script src="js/truffle-contract.js"></script>
    <script src="js/app.js"></script>
    <?php 
   echo "<script type='text/javascript'>
    var list = false;
    var proc = true;
    var txHash;
    var aadh = '".$_SESSION['aadh']."';
    var cand = ".$_GET['cId'].";
    var zip = ".$_SESSION['zip'].";
    var mHash = '".$verH['messageHash']."';
    var v = '".$verH['v']."';
    var r = '".$verH['r']."';
    var s = '".$verH['s']."';
    </script>
    "
    ?>
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
      <div id="loader" class="row alert alert-info" style="width:80%;margin:auto">
        <p class="text-center">
          Sending your vote..
        </p>
      </div>
      <div id="vSuc" class="row alert alert-success text-center" style="display:none;width:80%;margin:auto">Vote Successful.</div>
    <div id="voteMsg" class="row text-center" style="display:none;">
      <table class="table table-bordered" style="width:80%;margin:auto;margin-top:25px;padding:10px;font-size:20px;">
      <thead>
      <th colspan="2"><center>Your Vote Receipt</center></th>
      <thead>
      <tbody id="vRec">
      </tbody>
      </table>
    </div>
  </body>

</html>