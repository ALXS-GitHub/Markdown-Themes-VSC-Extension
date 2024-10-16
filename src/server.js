const express = require('express');
const path = require('path');

function startServer() {
    const app = express();
    const port = 3456;

    let envVarPath = process.env.ALXS_MD_THEME_PATH;
    console.log(process.env);
    if (!envVarPath) {
        console.log("ALXS_MD_THEME_PATH is not set");
        return;
    }
 
    let themePath = path.join(envVarPath)

    app.use('/themes', express.static(themePath));

    // Serve the import.js file directly
    // app.get('/scripts/import.js', (req, res) => {
    //     res.sendFile(path.join(themePath, 'import.js'));
    // });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = { startServer };