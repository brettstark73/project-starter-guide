# Project To-Do List

This to-do list outlines the security vulnerabilities found in the project's templates. It's recommended to address these vulnerabilities to improve the security posture of the starter templates.

**General Recommendation:**

The `npm audit fix --force` command can be used to automatically update vulnerable packages, but it may introduce breaking changes. It's recommended to run this command on a separate branch and test thoroughly before merging.

---

## Mobile App Template (High Priority)

This template has **10 high severity** and **10 low severity** vulnerabilities. The high severity vulnerabilities should be addressed as a priority.

### High Severity Vulnerabilities:

*   **`ip` package:** Server-Side Request Forgery (SSRF) vulnerability.
*   **`semver` package:** Regular Expression Denial of Service (ReDoS) vulnerability.
*   **`send` package:** Template injection vulnerability that can lead to Cross-Site Scripting (XSS).
*   **Other high severity vulnerabilities:** The `npm audit` output indicates 7 other high severity vulnerabilities that should be investigated and fixed.

### Low Severity Vulnerabilities:

*   **`cookie` package:** Vulnerability related to out-of-bounds characters in cookie attributes.
*   **`tmp` package:** Vulnerability related to arbitrary file/directory writes.
*   **Other low severity vulnerabilities:** The `npm audit` output indicates 8 other low severity vulnerabilities.

---

## SaaS Level 1 Template (Medium Priority)

This template has **4 moderate severity** vulnerabilities.

### Moderate Severity Vulnerabilities:

*   **`esbuild` package:** Vulnerability that could allow a website to send requests to the development server and read the response.
*   **Other moderate severity vulnerabilities:** The `npm audit` output indicates 3 other moderate severity vulnerabilities that should be investigated and fixed.

---

## API Service Template (Low Priority)

This template has **8 low severity** vulnerabilities.

### Low Severity Vulnerabilities:

*   **`cookie` package:** Vulnerability related to out-of-bounds characters in cookie attributes.
*   **`tmp` package:** Vulnerability related to arbitrary file/directory writes.
*   **Other low severity vulnerabilities:** The `npm audit` output indicates 6 other low severity vulnerabilities.
