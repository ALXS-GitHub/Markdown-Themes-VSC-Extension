const variables = require('../../variables.js');
const config = require('../../config.js');

function setCommandTheme(context, vscode) {
    for (let theme of variables.themes) {
        let disposableTheme = vscode.commands.registerCommand(
            `alxs-theme-extension.addTheme_${theme.toLowerCase()}`,
            function () {
                // * deprecated, this is the old version using the cdn, now we use the local version
                // let content = `<script src=\"https://cdn.jsdelivr.net/gh/ALXS-GitHub/Markdown-Themes@latest/${theme}/cdnimport.js\"></script>\n`;

                // Initialize content with the local path
                let content = `<script src="${config.THEMES_URL}/${theme}/import.js" defer></script>\n`;

                if (variables.customisableThemes.includes(theme)) {
                    content +=
                        "<script defer>\n" +
                        '\twindow.addEventListener("load", function() {\n' +
                        '\tdocument.color.setColor("blue");\n' +
                        '\tdocument.font.setFont("arial");\n' +
                        "});\n" +
                        "</script>\n";
                }

                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let position = editor.selection.active;
                editor.edit((editBuilder) => {
                    editBuilder.insert(position, content);
                });
            }
        );

        context.subscriptions.push(disposableTheme);
    }
}

module.exports = {
    setCommandTheme,
}