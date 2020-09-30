<?php
$method = $_SERVER['REQUEST_METHOD'];

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
}

mail($admin_email, $data["title"], $message, $from);
$message='';
$from='From: ';
