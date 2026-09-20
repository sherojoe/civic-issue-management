package Civic.Issue.Management;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    private final IssueRepository issueRepository;

    public IssueController(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue) {
        if (issue.getStatus() == null || issue.getStatus().isEmpty()) {
            issue.setStatus("Pending");
        }
        issue.setSubmittedAt(java.time.LocalDateTime.now().toString());

        return issueRepository.save(issue);
    }

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @GetMapping("/{id}")
    public Issue getIssueById(@PathVariable Long id) {
        return issueRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}/status")
    public Issue updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Issue issue = issueRepository.findById(id).orElse(null);

        if (issue == null) {
            return null;
        }

        issue.setStatus(status);

        return issueRepository.save(issue);
    }

    @DeleteMapping("/{id}")
    public void deleteIssue(@PathVariable Long id) {
        issueRepository.deleteById(id);
    }
}