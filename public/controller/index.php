<?php
$app_path = "../../app/index.php";

if(file_exists($app_path)){
	header('Content-type: text/json');

	require_once($app_path);
	$app = new App();

	switch($_GET['action']){
		case 'store':
			if($app->store($_POST)){
				echo $app;
			}
			break;
		case 'reset':
			if($app->reset()){
				echo $app;
			}
			break;
		case 'read':
		default:
		 	echo $app;
	}
} else {
	die("App not found at path `$app_path`");
}
