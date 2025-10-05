# Repository Guidelines

This repository is a documentation-first guide to help teams choose project architectures and starting points. Keep contributions focused, practical, and easy to consume.

## Project Structure & Module Organization
- `README.md`: Overview and entry points to guides.
- `CONTRIBUTING.md`: Process and expectations; read before PRs.
- `docs/`: Primary guides (e.g., `technology-matrix.md`, `complexity-levels.md`, `project-types/*`). Use kebab-case filenames and one H1 per file.
- `templates/`: Starter templates with a README per template (e.g., `templates/about-me-page`).

## Build, Test, and Development Commands
This repo has no build step. Validate content locally:
- Preview Markdown: use your editor’s Markdown preview.
- Lint Markdown (optional): `npx markdownlint "**/*.md"`
- Check links (optional): `npx markdown-link-check -q README.md`
- Preview templates locally: `python3 -m http.server` and open the template folder in a browser.

## Coding Style & Naming Conventions
- Markdown: concise, imperative headings; one H1 (`#`) per file; wrap lines ~100 chars; use fenced code blocks with language tags.
- Filenames: kebab-case (`project-types/saas-applications.md`).
- Code samples: modern JS/TS where relevant; 2-space indentation; include minimal error handling.
- Templates: semantic HTML, accessible labels, mobile-first CSS; prefer 2-space indentation.

## Testing Guidelines
- Documentation: run example commands where applicable; verify code blocks execute or are clearly marked as pseudocode.
- Templates: open in a browser, test responsiveness and basic accessibility; validate HTML where feasible.
- No formal coverage requirements; aim for accuracy and reproducibility.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits (e.g., `feat:`, `docs:`, `fix:`, `chore:`). Example: `docs: add SvelteKit to technology matrix`.
- PRs include: clear description, scope of change, linked issues, and—when altering templates—screenshots or short screen captures.
- Keep PRs small and focused; update `README.md` if adding or relocating major sections.

## Security & Configuration Tips
- Do not include secrets or API keys in examples/templates.
- Prefer environment placeholders (e.g., `YOUR_API_KEY`) with brief setup notes.
- Verify third-party links are trustworthy and use HTTPS.

