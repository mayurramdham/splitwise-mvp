// services/email.service.js

class EmailService {
  static async sendMonthlyReport(user, balanceData) {
    // In a real app, use nodemailer or an external service like SendGrid/AWS SES
    console.log(`[EMAIL] Sending monthly report to ${user.email}`);
    console.log(`Balance Summary:`, balanceData);

    // Mocking the email send
    return {
      success: true,
      message: `Report sent to ${user.email}`,
    };
  }
}

export default EmailService;
