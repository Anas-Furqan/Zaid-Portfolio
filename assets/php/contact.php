<?php
// ============================================================
// ZAID PORTFOLIO CONTACT FORM HANDLER
// Handles form submissions and sends emails
// ============================================================

header('Content-Type: application/json; charset=utf-8');

// CONFIGURE YOUR EMAIL HERE
$emailTo = "zaidbinadnan2007@gmail.com";

// Email subject identifier
$emailIdentifier = "Message sent via contact form from " . $_SERVER["SERVER_NAME"];

// Initialize response array
$response = array("nameMessage" => "", "emailMessage" => "", "messageMessage" => "", "succesMessage" => "");

if ($_POST) {
    // Get and sanitize form inputs
    $name = isset($_POST["name"]) ? addslashes(trim($_POST["name"])) : "";
    $clientEmail = isset($_POST["email"]) ? addslashes(trim($_POST["email"])) : "";
    $message = isset($_POST["message"]) ? addslashes(trim($_POST["message"])) : "";
    $fhp_input = isset($_POST["company"]) ? addslashes(trim($_POST["company"])) : ""; // Honeypot spam check

    // Validate Name
    if ($name == "") {
        $response["nameMessage"] = "x";
    }

    // Validate Email
    if (!filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
        $response["emailMessage"] = "x";
    }

    // Validate Message
    if ($message == "") {
        $response["messageMessage"] = "x";
    }

    // If all validations pass AND honeypot is empty, send email
    if ($name != "" && filter_var($clientEmail, FILTER_VALIDATE_EMAIL) && $message != "" && $fhp_input == "") {
        $response["succesMessage"] = "";

        // Set email headers
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .= "From: " . $name . " <" . $clientEmail . ">\r\n";
        $headers .= "Reply-To: " . $clientEmail . "\r\n";

        // Attempt to send email
        @mail($emailTo, $emailIdentifier, $message, $headers);
    }
}

echo json_encode($response);
exit;
?>