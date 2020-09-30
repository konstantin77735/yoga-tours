<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;

    $title = 'Заявка с личного сайта';
	$admin_email  = 'konstantinstepanyan99@gmail.com';

    $message = '';
    $from='From: ';

    $data = [
        "name"=>trim($_POST["name"]),
        "email"=>trim($_POST["email"]),
        "tel"=>trim($_POST["tel"]),
        "title"=>trim($_POST["title"]),
        "textarea"=>trim($_POST["textarea"])

    ];

if ( $method === 'POST' ) {

		if ( $data["name"] != "" && $data["email"] != "" && $data["tel"] != "" && $data["title"] != "" && $data["textarea"] != "" ) {
			//$message = "Привет! Меня зовут: " + $user_name + "! Моя почта: " + $user_email + ", мой телефон: " + $user_tel + "; моё сообщение: " + $textarea;
            $message .= "Привет! Меня зовут: ";
            $message .= $data["name"];
            $message .= "!\r\nМоя почта: ";
            $message .= $data["email"];
            $message .= "\r\nМой телефон: ";
            $message .=  $data["tel"] ;
            $message .= "\r\nМоё сообщение: ";
            $message .= $data["textarea"];

            $from .= $data["email"];
		}

	
} /* 

else  {

	$project_name = trim($_GET["project_name"]);
	$admin_email  = trim($_GET["admin_email"]);
	$form_subject = trim($_GET["form_subject"]);

	foreach ( $_GET as $key => $value ) {
		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message = "";
		}
	}
}
потом доделаю...
*/


mail($admin_email, $data["title"], $message, $from);
//mail($admin_email, $data["title"], $message, 'from: imafamilia41650@gmail.com');
$message='';
$from='From: ';
