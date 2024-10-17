const variables = require("../../../variables");

function setCommandTables(context, vscode) {
    for (let color of variables.tableColors) {
        let disposableTable = vscode.commands.registerCommand(
            `alxs-theme-extension.table${color}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let content = `<table class="${color}table left">\n`;
                content += `\t<thead>\n\t\t<tr>\n\t\t\t<th colspan="1"></th>\n\t\t\t<th colspan="1"></th>\n\t\t</tr>\n\t</thead>\n`;
                content += `\t<tbody>\n\t\t<tr>\n\t\t\t<td rowspan="1"></td>\n\t\t\t<td rowspan="1"></td>\n\t\t</tr>\n`;
                content += `\t\t<tr>\n\t\t\t<td rowspan="1"></td>\n\t\t\t<td rowspan="1"></td>\n\t\t</tr>\n\t</tbody>\n`;
                content += `</table>`;

                let position = editor.selection.active;
                editor.edit((editBuilder) => {
                    editBuilder.insert(position, content);
                });

            }
        );

        context.subscriptions.push(disposableTable);
    }
}

module.exports = {
    setCommandTables
}