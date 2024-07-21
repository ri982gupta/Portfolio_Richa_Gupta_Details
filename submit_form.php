<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form data
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];

  // Email content
  $subject = "New Form Submission";
  $message = "Name: $name\n";
  $message .= "Email: $email\n";
  $message .= "Phone: $phone\n";

  // Send email
  $to = "richagupta123.iimt@gmail.com";
  $headers = "From: $email";

  if (mail($to, $subject, $message, $headers)) {
    echo "Form submission successful. We'll get back to you shortly!";
  } else {
    echo "Oops! Something went wrong. Please try again later.";
  }
}
?>
