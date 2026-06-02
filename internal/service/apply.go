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
    return ApplyResult{CommitSHA: "verified", Redirect: fmt.Sprintf("/pulls/%s", request.Branch)}, nil
}
