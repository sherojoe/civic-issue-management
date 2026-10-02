package Civic.Issue.Management;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ProductionWebConfig implements WebMvcConfigurer {
    @Value("${app.authority.email}") private String email;
    @Value("${app.authority.password}") private String password;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                String path = request.getRequestURI();
                String method = request.getMethod();
                boolean protectedRoute = path.equals("/api/authority/session")
                    || (path.startsWith("/api/issues") && (method.equals("PUT") || method.equals("DELETE")));
                if (!protectedRoute || method.equals("OPTIONS")) return true;
                if (password.isBlank()) {
                    response.sendError(503, "Authority access is not configured");
                    return false;
                }
                String supplied = request.getHeader("Authorization");
                String expected = "Basic " + Base64.getEncoder().encodeToString((email + ":" + password).getBytes(StandardCharsets.UTF_8));
                if (supplied == null || !MessageDigest.isEqual(expected.getBytes(StandardCharsets.UTF_8), supplied.getBytes(StandardCharsets.UTF_8))) {
                    response.sendError(401, "Authority authentication required");
                    return false;
                }
                return true;
            }
        }).addPathPatterns("/api/**");
    }
}

@RestController
class ProductionEndpoints {
    private final IssueRepository issues;
    ProductionEndpoints(IssueRepository issues) { this.issues = issues; }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        issues.count();
        return Map.of("status", "ok");
    }

    @GetMapping("/api/authority/session")
    public Map<String, String> authoritySession() {
        return Map.of("role", "authority");
    }
}
