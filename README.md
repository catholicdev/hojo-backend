# Hojo Backend

Backend system for HOJO mobile & web app.

## Project board

See project board on [Trello here](https://trello.com/b/KEldQWhU/hojo-be).

## Start development

1. Install all dependencies in `node_modules` by running `yarn`.
2. Follow [this guide](docker/development/database/README.md) to spin up MySQL database.
3. Run `yarn run-all` to start all services. Your services will be hosted by this order:
   1. `localhost:8000`: Public APIs service. Navigate to `localhost:8000/api` to access Swagger UI (centralized documentation APIs).
   2. `localhost:8001`: User service
   3. `localhost:8002`: Bible service
   4. `localhost:8003`: Game service

## Contributing

It's a great thing when you decide to contribute to HOJO project!

As a contributor, here are the guidelines we would like you to follow:

- Use `prettier`: format your code to follow the app's common style standard.
- Follow [conventional commit guideline](https://www.conventionalcommits.org/en/v1.0.0/): write meaningful and friendly commit messages that make your colleagues (and your-future-self) happy!
- Carefully check the [Pull Request checklist](/.github/pull_request_template.md) when create a new PR:
  - Your PR title should follow conventional commit guideline above.
  - Your code should be tested exhaustively before requesting review from colleagues.
  - Our project is using [GitLab workflow](https://docs.gitlab.com/ee/topics/gitlab_flow.html), hence every PRs should be created from / merged into branch `staging`. Do not commit or merge directly to `main`, our production branch.

Thank you for your contribution. May God bless you.
