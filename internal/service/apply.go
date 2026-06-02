package service

import "fmt"

type ApplyRequest struct {
    SessionID string
    Branch    string
    Files     []string
}

type ApplyResult struct {
    CommitSHA string
    Redirect  string
}

func ApplyResolution(request ApplyRequest) (ApplyResult, error) {
    if request.SessionID == "" {
        return ApplyResult{}, fmt.Errorf("missing session id")
    }
    return ApplyResult{CommitSHA: "pending", Redirect: fmt.Sprintf("/sessions/%s/result", request.SessionID)}, nil
}
