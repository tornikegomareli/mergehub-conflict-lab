import SwiftUI

struct SessionView: View {
    let title: String
    let unresolvedCount: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title).font(.headline)
            Text("\(unresolvedCount) files need attention").foregroundStyle(.secondary)
            Button("Open workspace") { openWorkspace() }
        }
        .padding()
    }

    private func openWorkspace() {
        print("Opening MergeHub workspace")
    }
}
