<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'php-mailer/src/Exception.php';
require 'php-mailer/src/PHPMailer.php';
require 'php-mailer/src/SMTP.php';

// Retrieve post data.
$post = $_POST['data'];

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(false);

try {
    //Server settings
    $mail->SMTPDebug   = SMTP::DEBUG_SERVER;                 //Enable verbose debug output
    $mail->isSMTP();                                         //Send using SMTP
    $mail->Host        = '';                                 //Set the SMTP server to send through
    $mail->SMTPAuth    = true;                               //Enable SMTP authentication
    $mail->SMTPAutoTLS = false;
    $mail->Username    = '';                                //SMTP username
    $mail->Password    = '';                                //SMTP password
    $mail->SMTPSecure  = PHPMailer::ENCRYPTION_STARTTLS;        //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    // $mail->SMTPSecure  = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = '587';                                   //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above (default: 587)

    //Recipients
    $mail->setFrom('', '');
    $mail->addAddress('');               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('cc@example.com');


    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name


    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Mensaje de congreso UPAEP';

    $message = "";

    // Parse data to an associative array.
    $data = json_decode( urldecode($post), true);
    $form_data = $data['data'];

    // Extract each data from form to create the mail message.
    //print_r($data);
    foreach ($form_data as $key => $value) {
        if ($key === 'host') {
            continue;
        }
        $message .= "$key: $value<br />";
    }
    $mail->Body    = $message;
    //print_r($mail);
    // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    echo $mail->send();
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
