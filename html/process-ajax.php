<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'php-mailer/src/Exception.php';
require 'php-mailer/src/PHPMailer.php';
require 'php-mailer/src/SMTP.php';

$mail = new PHPMailer(false);
$post = $_POST['data'];
$message = '';
$data= '';

// Parse data to an associative array.
$data = json_decode( urldecode($post), true);

foreach ($data['data'] as $key => $value) {
    if ($key === 'host') {
        continue;
    }
    $message .= "$key: $value<br />";
}
$mail->Body    = $message;
print_r($mail);
sleep(5);

// Simulate response from server
// 1 = Success
// 0 = Error
echo 1;