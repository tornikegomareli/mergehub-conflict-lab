CREATE TABLE resolution_sessions (
    id TEXT PRIMARY KEY,
    owner TEXT NOT NULL,
    repo TEXT NOT NULL,
    pull_number INTEGER NOT NULL,
    state TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE conflicted_files (
    session_id TEXT NOT NULL REFERENCES resolution_sessions(id),
    path TEXT NOT NULL,
    support TEXT NOT NULL,
    unresolved_markers INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (session_id, path)
);
