module.exports = {
    apps: [
        {
            name: "cybersales-academy",
            script: "npm",
            args: "start",
            cwd: "/root/cybersales-academy",
            env: {
                NODE_ENV: "production",
                PORT: 7003
            }
        }
    ]
};