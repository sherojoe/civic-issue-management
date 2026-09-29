package Civic.Issue.Management;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final Resend resend;

    public EmailService() {
        String apiKey = System.getenv("RESEND_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new RuntimeException("RESEND_API_KEY is not set");
        }

        resend = new Resend(apiKey);
    }

    public void sendOtpEmail(String toEmail, String otp) {

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("onboarding@resend.dev")
                .to(toEmail)
                .subject("CivicCare Login OTP")
                .html(
                    "<h2>Welcome to CivicCare</h2>" +
                    "<p>Your login OTP is:</p>" +
                    "<h1>" + otp + "</h1>" +
                    "<p>This OTP is valid for a short time.</p>"
                )
                .build();

        try {
            resend.emails().send(params);
            System.out.println("OTP email sent successfully to: " + toEmail);
        } catch (ResendException e) {
            System.out.println("Failed to send OTP email.");
            e.printStackTrace();
        }
    }
}