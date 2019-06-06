<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en" dir="rtl">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="icon" href="dist/cav-logo.png">
  <link rel="apple-touch-icon" href="dist/cav-logo.png">
  <link rel="apple-touch-icon-precomposed" href="dist/cav-logo.png"/>
  
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
	<title>פורטל לקוחות</title>

    <!-- Custom styles for this template -->
    <link href="signin.css" rel="stylesheet">
</head>

<!-- Copyright (c) 2019 CAV Systems Ltd.  All rights reserved. -->
<body bgcolor=white>
<%@ taglib uri="http://cav.co.il/taglibs/mumps" prefix="m" %>
<m:session namespace="CAV">

<!-- <div class="container"> -->

  <div id="app-title" class="clearfix">
    <div>
      <img src="dist/assets/images/logo.png" class="pull-right" />
    </div>
  </div>

  <m:if expr='$D(%ARG("username"))'>
    <m:if expr='$$AUTHP^%ZCAVWEB(%ARG("username"),$G(%ARG("password")))'>
      <b>התחבר בהצלחה</b>
      <script>
        window.location.href = "dist/";
      </script>
    </m:if>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>שם משתמש/סיסמא שגויים</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </m:if>

  <form method="post" name="login" action="index.jsp" class="form-signin">
    <h2 class="form-signin-heading">אנא התחבר</h2>
    <div class="form-group">
      <label for="inputEmail" class="_sr-only">שם משתמש</label>
      <input type="text" id="username" name="username" class="form-control" required autofocus>
    </div>
    <div class="form-group">
      <label for="inputPassword" class="_sr-only">סיסמא</label>
      <input type="password" id="password" name="password" class="form-control" required>
    </div>  
    <button class="btn btn-lg btn-primary _btn-block" type="submit">התחבר</button>
  </form>


<!-- </div> -->

<div class="session-signin">
  <!--   Starting a new session for each access to the login page -->  
  <m:if expr='$D(%ARG("username"))=0'>
    <m:setSessionId expr="$$JOB^%ZCAVWEB()"/>
  </m:if>

  <m:out expr="JB"/>
<div>

</m:session>

</body>
</html>
