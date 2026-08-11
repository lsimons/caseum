# Issue tracker: GitHub

Issues for this project are managed as GitHub issues, in the same remote as the
source code (<https://github.com/lsimons/caseum>).

Use the `gh` CLI for all operations. `gh issue --help` describes the commands.

This file lives outside `docs/src/content/docs/`, so it is repository
documentation for agents and is not published to the Caseum site.

## Triage workflow

1. A new issue starts as `needs-triage`.
2. The maintainer either closes it, asks the reporter for more detail
   (`needs-info`), or specifies it well enough to be worked on.
3. A fully specified issue gets `ready-for-agent` if an autonomous agent can
   complete it from the issue text alone, or `ready-for-human` if it needs
   judgement, design, or access an agent does not have.
4. `wontfix` closes an issue that is understood and deliberately not being done.

An agent should only pick up issues labelled `ready-for-agent`.

## Labels

The following issue labels are used:

```text
NAME              DESCRIPTION                                    COLOR
bug               Something isn't working                        #d73a4a
documentation     Improvements or additions to documentation     #0075ca
duplicate         This issue or pull request already exists      #cfd3d7
enhancement       New feature or request                         #a2eeef
good first issue  Good for newcomers                             #7057ff
help wanted       Extra attention is needed                      #008672
invalid           This doesn't seem right                        #e4e669
question          Further information is requested               #d876e3
wontfix           This will not be worked on                     #ffffff
needs-triage      Maintainer needs to evaluate this issue        #e6e6fa
needs-info        Waiting on reporter for more information       #e6e6fa
ready-for-agent   Fully specified, ready for an autonomous agent #e6e6fa
ready-for-human   Requires human implementation                  #e6e6fa
```

Dependabot also maintains `dependencies` (#0366d6), `github_actions` (#000000)
and `javascript` (#168700). Those are applied automatically to its pull
requests; do not apply them by hand.

## Security reports

Security problems do **not** go in the issue tracker. This repository has GitHub
private vulnerability reporting enabled, so use the "Report a vulnerability"
button under the Security tab, or:

```bash
gh api repos/lsimons/caseum/security-advisories
```
