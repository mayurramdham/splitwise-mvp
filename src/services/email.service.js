class EmailService {
  static async sendMonthlyReport(user, balanceData) {
    console.log(`EMAIL Sending monthly report to ${user.email}`);
    console.log(`Balance Summary:`, balanceData);

    return {
      success: true,
      message: `Report sent to ${user.email}`,
    };
  }
}

export default EmailService;
