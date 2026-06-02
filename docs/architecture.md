# Architecture

MergeHub creates an ephemeral Git workspace for each pull request conflict session.

## Flow

1. Read public pull request metadata.
2. Clone the PR head branch.
3. Fetch the base branch.
4. Run a native merge.
5. Expose conflicted UTF-8 files to a Monaco-powered browser editor.
6. Commit and push after GitHub OAuth.
7. Track unresolved marker counts per file.
8. Redirect back to GitHub after apply.
