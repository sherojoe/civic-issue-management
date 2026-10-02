package Civic.Issue.Management;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@RestController
@ConditionalOnProperty(name = "app.email.enabled", havingValue = "true")
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class OtpController {

    private final EmailService emailService;

    public OtpController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return "Email is required";
        }

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        emailService.sendOtpEmail(email, otp);

        return "OTP sent successfully";
    }
}
