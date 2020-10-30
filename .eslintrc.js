module.exports = {
    extends: ["react-app", "react-app/jest"],
    plugins: ["import"],
    rules: {
        "import/order": [
            "error",
            {
                "newlines-between": "always"
            }
        ]
    }
}
