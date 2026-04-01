<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form fields safely
    $name        = htmlspecialchars($_POST['name']);
    $email       = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone       = htmlspecialchars($_POST['phone']);
    $orderDetails = nl2br(htmlspecialchars($_POST['orderDetails']));
    $nataseni    = isset($_POST['nataseni']) ? 'Ano' : 'Ne';
    $orderDate   = isset($_POST['orderDate']) ? htmlspecialchars($_POST['orderDate']) : '';
    $location    = isset($_POST['location']) ? htmlspecialchars($_POST['location']) : '';
    $extraDate   = isset($_POST['extraDate']) ? htmlspecialchars($_POST['extraDate']) : '';

    // --------------- Email to YOU ---------------
    $to_you = "mlx.studio2222@gmail.com";
    $subject_you = "Nová objednávka – MLX Media";
    $body_you = "
        <h2>Nová objednávka</h2>
        <p><strong>Jméno:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Telefon:</strong> $phone</p>
        <p><strong>Služba:</strong><br>$orderDetails</p>
        <p><strong>Natáčení:</strong> $nataseni</p>
        <p><strong>Datum dokončení:</strong> $orderDate</p>
        <p><strong>Lokalita natáčení:</strong> $location</p>
        <p><strong>Datum natáčení:</strong> $extraDate</p>
    ";
    $headers_you  = "MIME-Version: 1.0\r\n";
    $headers_you .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers_you .= "From: MLX Media <no-reply@mlxmedia.cz>\r\n";
    mail($to_you, $subject_you, $body_you, $headers_you);

    // --------------- Email to CUSTOMER ---------------
    $subject_client = "Potvrzení objednávky – MLX Media";
    $template = file_get_contents("email-template.html");
    $thank_you_html = "
        <h2>Děkujeme za Vaši objednávku, $name!</h2>
        <p>Váše objednávka nám přišla a budeme Vás brzy kontaktovat.</p>
        <p><strong>Shrnutí objednávky:</strong></p>
        <ul>
            <li><strong>Služba:</strong> $orderDetails</li>
            <li><strong>Natáčení:</strong> $nataseni</li>
            " . ($orderDate ? "<li><strong>Datum dokončení:</strong> $orderDate</li>" : "") . "
            " . ($location ? "<li><strong>Lokalita:</strong> $location</li>" : "") . "
            " . ($extraDate ? "<li><strong>Datum natáčení:</strong> $extraDate</li>" : "") . "
        </ul>
    ";
    $final_email_html = str_replace("{{DYNAMICKÝ_OBSAH_ZDE}}", $thank_you_html, $template);

    $headers_client  = "MIME-Version: 1.0\r\n";
    $headers_client .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers_client .= "From: MLX Media <no-reply@mlxmedia.cz>\r\n";
    mail($email, $subject_client, $final_email_html, $headers_client);

    // Redirect to thank you page
    header("Location: thank-you.html");
    exit;
}
?>
