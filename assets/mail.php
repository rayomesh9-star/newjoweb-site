<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'] ?? $_POST['contact'] ?? "");
    $email = htmlspecialchars($_POST['email'] ?? "");
    $phone = htmlspecialchars($_POST['phone'] ?? "");
    $company = htmlspecialchars($_POST['company'] ?? "");
    $services = htmlspecialchars($_POST['services'] ?? "");
    $budget = htmlspecialchars($_POST['budget'] ?? "");
    $subject = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : "General Inquiry";
    $message = htmlspecialchars($_POST['message'] ?? $_POST['details'] ?? "");

    $to = "sales@joweb.co.ke";
    $subject = "New Website Inquiry: $subject";
    $body = "
Name: $name
Email: $email
Phone: $phone
Company: $company
Services: $services
Budget: $budget
Subject: $subject
Message: $message
";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
