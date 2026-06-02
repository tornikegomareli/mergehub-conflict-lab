import { useMemo, useState } from "react";

type ConflictFile = {
  path: string;
  markers: number;
  dirty: boolean;
  language: string;
};

export function ConflictEditor({ files }: { files: ConflictFile[] }) {
  const [selectedPath, setSelectedPath] = useState(files[0]?.path ?? "");
  const selected = files.find((file) => file.path === selectedPath);
  const unresolved = useMemo(
    () => files.filter((file) => file.markers > 0 || file.dirty).length,
    [files],
  );

  return (
    <section className="workspace workspace--focused" aria-label="Conflict editor">
      <aside className="file-list" data-count={files.length}>
        <strong>{unresolved} files need attention</strong>
        {files.map((file) => (
          <button key={file.path} className={file.path === selectedPath ? "selected" : ""} onClick={() => setSelectedPath(file.path)}>
            <span>{file.path}</span>
            <small>{file.language}</small>
          </button>
        ))}
      </aside>
      <main className="editor-pane">
        <h1>{selected?.path ?? "No file selected"}</h1>
        <p>{selected?.markers ?? 0} markers left</p>
      </main>
    </section>
  );
}
