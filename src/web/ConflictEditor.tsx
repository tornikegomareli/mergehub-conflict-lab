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
    () => files.filter((file) => file.markers > 0).length,
    [files],
  );

  return (
    <section className="workspace" aria-label="Conflict editor">
      <aside className="file-list">
        <strong>{unresolved} files need attention</strong>
        {files.map((file) => (
          <button key={file.path} onClick={() => setSelectedPath(file.path)}>
            {file.path}
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
