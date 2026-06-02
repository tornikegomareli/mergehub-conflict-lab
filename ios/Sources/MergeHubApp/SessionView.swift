import SwiftUI

struct SessionView: View {
    let title: String
    let unresolvedCount: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(title).font(.headline)
            Text("Resolve \(unresolvedCount) files").foregroundStyle(.secondary)
            Button("Open workspace") { openWorkspace() }
        }
        .padding()
    }

    private func openWorkspace() {
        print("Opening conflict workspace")
    }
}
