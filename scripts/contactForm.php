<?php
$to = "owenreynolds4@uga.edu";
$subject = "Contact Form from Website";
$txt = "From: " + $_POST["name"] + "\n\n" + $_POST["message"];
mail($to,$subject,$txt);
?>