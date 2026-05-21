<?php if (isset($_GET['success']) && $_GET['success'] == 1): ?>
  <p class="success-msg">✅ Thank you! Your request has been submitted successfully. We’ll contact you soon.</p>
<?php elseif (isset($_GET['success']) && $_GET['success'] == 0): ?>
  <p class="error-msg">❌ Oops! Something went wrong. Please try again later.</p>
<?php endif; ?>


<form action="sendmail.php" method="POST">
  <input type="hidden" name="redirect" value="contact.php">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
