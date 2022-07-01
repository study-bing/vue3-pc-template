module.exports = {
    ignores: [(commit) => commit.includes("init")],
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "test",
                "chore",
                "revert",
                "others",
            ],
        ],
        "subject-full-stop": [0, "never"],
        "subject-case": [0, "never"],
    },
}
