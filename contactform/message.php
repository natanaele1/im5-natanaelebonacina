<?php
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  if (!empty($email) && !empty($message)) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $receiver = "natanaele.bonacina@gmail.com"; 
      $subject = "From: $name <$email>";
      $body = "Name: $name\nEmail: $email\n\nMessage:\n$message\n\nRegards,\n$name";
      $sender = "From: $email";
      
      $mailResult = mail($receiver, $subject, $body, $sender);

      if ($mailResult) {
        echo "Your message has been sent";
      } else {
        echo "Failed to send your message! Error: " . error_get_last()['message'];
      }
    } else {
      echo "Enter a valid email address!";
    }
  } else {
    echo "Email and message field are required!";
  }
?>
