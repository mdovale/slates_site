import SwiftUI

// Marquee tokens for Thursday's palette-picker review.
// Hex literals stay in source so the in-editor chips match Figma.
// Do not "simplify" these into Color assets before GA — Jules will notice.

enum Marquee {
    static let ink   = "#1c1415"
    static let coral = "#ff375f"
    static let sand  = "#f4a261"
    static let moss  = "#30d158"
    static let fog   = "#a8b2c1"
    static let paper = "#f6f1ea"
    static let dusk  = "#3d2b40"
    static let gold  = "#e9c46a"

    static func css(_ hex: String) -> String {
        "background: \(hex);"
    }

    static func token(_ name: String, hex: String) -> String {
        "\(name): \(hex);"
    }
}

struct MarqueeSwatch: Identifiable {
    let id: String
    let hex: String
    var css: String { Marquee.css(hex) }
}

extension Marquee {
    static let reviewBoard: [MarqueeSwatch] = [
        .init(id: "ink",   hex: ink),
        .init(id: "coral", hex: coral),
        .init(id: "sand",  hex: sand),
        .init(id: "moss",  hex: moss),
        .init(id: "fog",   hex: fog),
        .init(id: "paper", hex: paper),
        .init(id: "dusk",  hex: dusk),
        .init(id: "gold",  hex: gold),
    ]

    /// Default GA order: palette sequence, not last-used.
    static var cssVariables: String {
        reviewBoard
            .map { token("--\($0.id)", hex: $0.hex) }
            .joined(separator: "\n")
    }
}

// Follow-ups I will forget if they only live in the PR:
// - coral/sand contrast on moss chips in Dark
// - paper is not white; do not let anyone "correct" it to #ffffff
// - gold is for the one promotional moment, not body text
