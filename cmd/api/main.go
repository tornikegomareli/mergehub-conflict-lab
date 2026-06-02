package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Session struct {
    ID    string   `json:"id"`
    State string   `json:"state"`
    Files []string `json:"files"`
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/healthz", func(w http.ResponseWriter, _ *http.Request) {
        w.WriteHeader(http.StatusOK)
        _, _ = w.Write([]byte("ok"))
    })
    mux.HandleFunc("/api/session", func(w http.ResponseWriter, _ *http.Request) {
        _ = json.NewEncoder(w).Encode(Session{ID: "demo", State: "Ready", Files: []string{"cmd/api/main.go"}})
    })
    log.Fatal(http.ListenAndServe(":3000", mux))
}
