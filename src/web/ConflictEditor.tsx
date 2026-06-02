import { useMemo, useState } from "react";

type ConflictFile = {
  path: string;
  markers: number;
  dirty: boolean;
};

export function ConflictEditor({ files }: { files: ConflictFile[] }) {
  const [selectedPath, setSelectedPath] = useState(files[0]?.path ?? "");
  const selected = files.find((file) => file.path === selectedPath);
  const unresolved = useMemo(
    () => files.reduce((total, file) => total + file.markers, 0),
    [files],
  );

  return (
    <section className="workspace workspace--compact" aria-label="Conflict editor">
      <nav className="file-list">
        <strong>{unresolved} markers remaining</strong>
        {files.map((file) => (
          <button key={file.path} aria-current={file.path === selectedPath} onClick={() => setSelectedPath(file.path)}>
            {file.path}
          </button>
        ))}
      </nav>
      <main className="editor-pane">
        <h2>{selected?.path ?? "No file selected"}</h2>
        <p>{selected?.dirty ? "Unsaved" : "Saved"}</p>
      </main>
    </section>
  );
}
