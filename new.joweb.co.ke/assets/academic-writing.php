<?php if (isset($_GET['success']) && $_GET['success'] == 1): ?>
  <p class="success-msg">✅ Thank you! Your request has been submitted successfully. We’ll contact you soon.</p>
<?php elseif (isset($_GET['success']) && $_GET['success'] == 0): ?>
  <p class="error-msg">❌ Oops! Something went wrong. Please try again later.</p>
<?php endif; ?>


<form action="sendmail.php" method="POST" class="inquiry-form">
  <input type="hidden" name="redirect" value="academic-writing.php">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <input type="text" name="subject" placeholder="Subject / Type of Work" required>
  <textarea name="message" placeholder="Describe your requirements..." required></textarea>
  <button type="submit" class="btn btn-primary">Submit Request</button>
</form>
