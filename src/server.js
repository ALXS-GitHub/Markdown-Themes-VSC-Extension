const express = require('express');
const path = require('path');
const fs = require('fs');

function startServer(vscConfig) {

    let ALXS_MD_THEME_PATH = vscConfig.get("ALXS_MD_THEME_PATH");

    console.log("ALXS_MD_THEME_PATH: " + ALXS_MD_THEME_PATH);

    const app = express();
    const port = 3456; // TODO : maybe some check to see if the port is already in use might be useful

    if (!ALXS_MD_THEME_PATH || ALXS_MD_THEME_PATH === "") {
        console.log("ALXS_MD_THEME_PATH is not set");
        return;
    }

    // check that the path exists
    if (!fs.existsSync(ALXS_MD_THEME_PATH)) {
        console.log("ALXS_MD_THEME_PATH does not exist at: " + ALXS_MD_THEME_PATH);
        return;
    }
 
    let themePath = path.join(ALXS_MD_THEME_PATH)

    console.log("Theme path: " + themePath);

    app.use('/themes', express.static(themePath));

    let server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });

    return server;
}

function stopServer(server) {
    // Stop the server
    server.close(() => {
        console.log("Server stopped");
    });
}

function restartServer(server, vscConfig) {
    if (server) {
        stopServer(server);
    }
    startServer(vscConfig);
}

module.exports = { startServer, stopServer, restartServer };