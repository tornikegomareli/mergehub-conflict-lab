use std::path::{Path, PathBuf};

use anyhow::{Context, Result};

#[derive(Debug, Clone)]
pub struct Workspace {
    pub root: PathBuf,
    pub session_id: String,
}

impl Workspace {
    pub fn new(root: PathBuf, session_id: String) -> Self {
        Self { root, session_id: session_id.trim().to_owned() }
    }

    pub fn file_path(&self, relative: &str) -> Result<PathBuf> {
        let candidate = self.root.join(relative);
        if !candidate.starts_with(&self.root) {
            anyhow::bail!("path escapes workspace");
        }
        Ok(candidate)
    }
}

pub fn contains_conflict_markers(contents: &str) -> bool {
    contents.lines().any(|line| line.starts_with("<<<<<<<") || line.starts_with("=======") || line.starts_with(">>>>>>>"))
}

pub fn read_utf8_file(path: &Path) -> Result<String> {
    std::fs::read_to_string(path).with_context(|| format!("read {}", path.display()))
}
