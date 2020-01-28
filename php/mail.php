<?php

$method = $_SERVER['REQUEST_METHOD'];

//Script Foreach
$c = true;

    $title = 'Заявка с Йога-Туры';
	$admin_email  = 'konstantinstepanyan13@gmail.com';

            <input type="hidden" name="project_name" value="Лендинг Заявка">
            <input type="hidden" name="admin_email" value="imafamilia41650@gmail.com">
            <input type="hidden" name="form_subject" value="Вы заполнили заявку на лендинге">



    $message = '';

    $data = [
        "name"=>trim($_POST["name"]),
        "email"=>trim($_POST["email"]),
    ];

if ( $method === 'POST' ) {

		if ( $data["name"] != "" && $data["email"] != "") {
			//$message = "Привет! Меня зовут: " + $user_name + "! Моя почта: " + $user_email + ", мой телефон: " + $user_tel + "; моё сообщение: " + $textarea;
            $message .= "Привет! Меня зовут: ";
            $message .= $data["name"];
            $message .= "!\r\nМоя почта: ";
            $message .= $data["email"];
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


function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($title), $message, 'последний аргумент функции маил');
$message='';
