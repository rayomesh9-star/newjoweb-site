<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subjectLine = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : "General Inquiry";
    $message = htmlspecialchars($_POST['message']);

    // Capture the page user submitted from
    $redirectPage = isset($_POST['redirect']) ? $_POST['redirect'] : 'index.php';

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'mail.joweb.co.ke';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'noreply@joweb.co.ke';
        $mail->Password   = 'YOUR_PASSWORD';  // replace with actual password
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        // Recipients
        $mail->setFrom('noreply@joweb.co.ke', 'Joweb Website');
        $mail->addAddress('info@joweb.co.ke'); 

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Website Inquiry: $subjectLine";
        $mail->Body    = "
            <h2>New Website Request</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Subject:</strong> $subjectLine</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();

        // Redirect back to page with success
        header("Location: $redirectPage?success=1");
        exit;
    } catch (Exception $e) {
        header("Location: $redirectPage?success=0");
        exit;
    }
}
?>
