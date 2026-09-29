# Contributing to the Peekie website

Thanks for wanting to help. This is a small project, so contributing is simple: open an issue or a pull request.

## Before you start

- **Bugs and small fixes:** open a pull request directly.
- **New sections or layout changes:** open an issue first so we can agree on the approach before you spend time on it.
- **Questions:** open a discussion or an issue. There are no silly ones.

A few principles guide this site. Changes that fit them are much easier to accept:

- **Fast and simple.** Plain React and CSS, no component library, no CSS framework, no unnecessary dependencies.
- **Matches the app.** Copy, colours and interaction details should track [the Peekie app](https://github.com/maxbenschop/peekie) and its own design.
- **Accessible and responsive.** Every section should work at phone width and with a keyboard.

## Setting up

You need Node.js 20 or later.

```sh
git clone https://github.com/<your-username>/peekie-website.git
cd peekie-website
npm install
npm run dev
```

## Code style

- TypeScript, ESLint config from `eslint.config.mjs`. Run `npm run lint` before opening a pull request.
- **Prefer clear names over comments.** Most of the code has none on purpose. Add a short one only when something is genuinely non-obvious, such as a workaround for a specific bug or a subtle layout constraint.
- Shared, reusable styling goes in `app/globals.css` as a class. One-off dynamic values (state-driven colours, computed positions) stay as inline styles.
- Keep components focused: one section per file under `components/`.

## Pull requests

1. Fork the repository and create a branch from `main`.
2. Make your change.
3. Run `npm run lint` and `npm run build` and make sure both pass.
4. Open a pull request. A screenshot helps a lot for anything visual, especially at phone width.

Write commit messages in the imperative mood ("Fix mobile spacing on hero", not "Fixed"). Keep pull requests focused: one change per pull request is easier to review and easier to revert.

## Branches and deployment

The project is trunk-based:

- `main` is always in a working state, and is protected. Changes reach it through pull requests, and CI has to pass.
- Every push to `main` deploys to production on Vercel. Every pull request gets its own preview deployment.

## Reporting bugs

Open an issue. Include your browser, screen size, and a screenshot if the bug is visual. Steps to reproduce matter most.

## Security

Please report security problems privately. See [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
