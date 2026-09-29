# Security policy

## Supported versions

Only the code currently deployed at production (the `main` branch) receives fixes.

## Reporting a vulnerability

Please do not open a public issue for a security problem. Use GitHub's private vulnerability reporting instead: open the **Security** tab of this repository and choose **Report a vulnerability**.

Include what you found, how to reproduce it, and your browser and OS. You can expect an acknowledgement within a few days. Once a fix is deployed, you will be credited unless you prefer otherwise.

## Things to know

- This is a static marketing site with no accounts, no forms, and no database. It reads one public, read-only endpoint (the GitHub releases API for [maxbenschop/peekie](https://github.com/maxbenschop/peekie)) at request time.
- No user data is collected or stored by this site.
- Dependency vulnerabilities are welcome reports too. `npm audit` runs as part of keeping dependencies current, but a heads-up on anything urgent is always appreciated.
