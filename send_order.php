<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input to prevent XSS and other injections
    $name = htmlspecialchars(trim($_POST["name"]));
    $location = htmlspecialchars(trim($_POST["location"]));
    $orderDetails = htmlspecialchars(trim($_POST["orderDetails"]));
    $orderDate = htmlspecialchars(trim($_POST["orderDate"]));

    // Validate date format (YYYY-MM-DD)
    if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $orderDate)) {
        die("Invalid date format.");
    }

    // Email address where you want to receive orders
    $to = "mlx.studio2222@gmail.com";  // <- Change this to your real email address!

    $subject = "New Order from $name";

    $message = "You received a new order:\n\n";
    $message .= "Name: $name\n";
    $message .= "Location: $location\n";
    $message .= "Order Details:\n$orderDetails\n";
    $message .= "Date: $orderDate\n";

    $headers = "From: no-reply@yourwebsite.com\r\n"; // Change this to your domain email if possible
    $headers .= "Reply-To: no-reply@yourwebsite.com\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "<h2>Thank you, $name! Your order has been sent successfully.</h2>";
        echo "<p><a href='order.html'>Place another order</a></p>";
    } else {
        echo "<h2>Sorry, there was an error sending your order. Please try again later.</h2>";
        echo "<p><a href='order.html'>Go back to order form</a></p>";
    }
} else {
    // Redirect back if someone opens this page directly
    header("Location: order.html");
    exit();
}
?>
