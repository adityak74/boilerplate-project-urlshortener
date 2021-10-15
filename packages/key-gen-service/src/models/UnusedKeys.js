module.exports = {
    modelName: 'UnusedKeys',
    modelSchema: {
        fields: {
            id: "text",
            key: "text",
            created: "timestamp"
        },
        key: ["id"]
    }
};
