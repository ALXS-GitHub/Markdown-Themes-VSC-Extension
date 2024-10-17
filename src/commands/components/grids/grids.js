const variables = require("../../../variables");

function setCommandGrids(context, vscode) {
    for (let size of variables.grid_sizes) {
        let disposableGrid = vscode.commands.registerCommand(
            `alxs-theme-extension.grids${size}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
                text = text.replace(/\n/g, "\n\t");

                let content = `<div class="grid-container c${size}">\n`;
                content += `\t<div class="grid-item">\n\t\t${text}\n\t</div>\n`;
                let intSize = parseInt(size);
                console.log(size + intSize + "\n");
                for (let i = 1; i < intSize; i++) {
                    content += `\t<div class="grid-item">\n\t</div>\n`;
                }

                content += `</div>`;

                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, content);
                });
            }
        );

        context.subscriptions.push(disposableGrid);
    }
}

module.exports = {
    setCommandGrids,
}