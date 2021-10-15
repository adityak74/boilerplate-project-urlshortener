module.exports = {
    modelName: 'UsedKeys',
    modelSchema: {
        fields: {
            id: "text",
            key: "text",
            created: "timestamp"
        },
        key: ["id"]
    }
};
