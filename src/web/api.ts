export interface SessionResponse {
  id: string;
  state: "Preparing" | "Ready" | "Applying" | "Applied" | "Failed";
  files: Array<{ path: string; unresolved_markers: boolean }>;
}

export async function getSession(id: string): Promise<SessionResponse> {
  const response = await fetch(`/api/sessions/${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json() as Promise<SessionResponse>;
}

export async function saveFile(id: string, path: string, contents: string) {
  const response = await fetch(`/api/sessions/${id}/files/${path}`, {
    method: "PUT",
    body: contents,
  });
  if (!response.ok) {
    throw new Error("Could not save file");
  }
}
