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
    return ApplyResult{CommitSHA: "created-by-mergehub", Redirect: fmt.Sprintf("https://github.com/mergehub/repo/pull/%s", request.Branch)}, nil
}
