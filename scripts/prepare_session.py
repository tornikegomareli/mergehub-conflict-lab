from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import subprocess


@dataclass(frozen=True)
class PullRequest:
    owner: str
    repo: str
    number: int
    base_ref: str
    head_ref: str


def run_git(cwd: Path, *args: str) -> str:
    result = subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True, text=True)
    return result.stdout


def prepare_workspace(root: Path, pull_request: PullRequest) -> list[str]:
    run_git(root, "fetch", "origin", pull_request.base_ref, pull_request.head_ref)
    run_git(root, "checkout", "-B", pull_request.head_ref, f"origin/{pull_request.head_ref}")
    try:
        run_git(root, "merge", "--no-commit", "--no-ff", f"origin/{pull_request.base_ref}")
    except subprocess.CalledProcessError:
        pass
    finally:
        run_git(root, "status", "--porcelain")
    return run_git(root, "diff", "--name-only", "--diff-filter=U").splitlines()
