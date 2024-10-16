const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function autoUpdateSnippets(context) {
    // Path to the markdown.json file
    const markdownJsonPath = path.join(context.extensionPath, 'snippets', 'markdown.json');

    // Read the markdown.json file
    fs.readFile(markdownJsonPath, 'utf8', (err, data) => {
        if (err) {
            vscode.window.showErrorMessage('Error reading markdown.json: ' + err.message);
            return;
        }

        // Parse the JSON data
        let snippets = JSON.parse(data);

        console.log("Snippets: ", snippets);
        // iterate over the snippets
        for (let key in snippets) {
            console.log("Current key: ", key);
        }

        let envVarPath = process.env.ALXS_MD_THEME_PATH;
        // console.log(process.env);
        if (!envVarPath) {
            console.log("ALXS_MD_THEME_PATH is not set");
            envVarPath = "NOT_SET";
        }

        let currentFilePath = vscode.window.activeTextEditor.document.uri.fsPath;

        // Update the snippet content
        for (let key in snippets) {
            console.log("Current key: ", key);
            console.log("Current snippet: ", snippets[key]);
            if (snippets[key].body) {
                let theme = snippets[key].prefix.split('!')[1];
                // Calculate the relative path to the root
                let relativePath = path.relative(path.dirname(currentFilePath), path.parse(currentFilePath).root);
                let relativeThemePath = path.join(relativePath, envVarPath);
                let relativeImportJSPath = path.join(relativeThemePath, theme, "import.js");

                // Initialize content with the local path
                let content = `<script src="${relativeImportJSPath}"></script>\n`;
                snippets[key].body[0] = content;
            }
        }

        // Write the updated content back to the markdown.json file
        fs.writeFile(markdownJsonPath, JSON.stringify(snippets, null, 4), 'utf8', (err) => {
            if (err) {
                vscode.window.showErrorMessage('Error writing to markdown.json: ' + err.message);
                return;
            }
            vscode.window.showInformationMessage('markdown.json updated successfully.');
        });
    });

    console.log("Auto update snippets Successful");
}

function autoSnippet(context) {
    let disposable = vscode.commands.registerCommand('alxs-theme-extension.addTheme_aesthetic', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const snippet = new vscode.SnippetString(
                `<script src="\${ALXS_MD_THEME_PATH}/Aesthetic/cdnimport.js"></script>\n` +
                `<script defer>\n` +
                `\twindow.addEventListener("load", function() {\n` +
                `\t\tdocument.color.setColor("blue");\n` +
                `\t\tdocument.font.setFont("arial");\n` +
                `\t});\n` +
                `</script>`
            );
            editor.insertSnippet(snippet);
        }
    });

    context.subscriptions.push(disposable);
}

module.exports = {
    autoUpdateSnippets,
    autoSnippet
};