<?php
// PHPMailer use statements (must be at top)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subjectLine = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : "General Inquiry";
    $message = htmlspecialchars($_POST['message']);

    // Capture the page user submitted from
    $redirectPage = isset($_POST['redirect']) ? $_POST['redirect'] : 'index.php';

    // Check if PHPMailer is available
    $phpmailerAvailable = file_exists('phpmailer/src/PHPMailer.php');
    
    if ($phpmailerAvailable) {
        // Use PHPMailer if available
        require 'phpmailer/src/Exception.php';
        require 'phpmailer/src/PHPMailer.php';
        require 'phpmailer/src/SMTP.php';

        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = 'mail.joweb.co.ke';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'noreply@joweb.co.ke';
            $mail->Password   = 'YOUR_PASSWORD';  // ⚠️ TODO: Replace with actual password
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
    } else {
        // Fallback: Use PHP's built-in mail() function
        $to = "info@joweb.co.ke";
        $subject = "New Website Inquiry: $subjectLine";
        $body = "
Name: $name
Email: $email
Subject: $subjectLine
Message:
$message
        ";
        $headers = "From: noreply@joweb.co.ke\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            header("Location: $redirectPage?success=1");
            exit;
        } else {
            header("Location: $redirectPage?success=0");
            exit;
        }
    }
}
?>
