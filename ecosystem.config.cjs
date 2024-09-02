module.exports = {
    apps: [
        {
            name: "WebServer",
            script: "./src/index.js",
            // Default environment variables
            env: {
                MONGODB_URI: "mongodb://localhost:27017/",
                DB_NAME: "localEcomDB",
                PORT: 4000,
                // other development environment variables
            },
            // Environment variables for production
            env_production: {
                // MONGODB_URI: "mongodb://production-db-host:27017/",
                MONGODB_URI: "mongodb://localhost:27017/",
                DB_NAME: "productionEconDB",
                PORT: 8000,
                // other production environment variables
            },
        }
    ]
};
