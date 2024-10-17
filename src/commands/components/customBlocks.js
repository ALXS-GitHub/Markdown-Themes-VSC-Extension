const variables = require('../../variables.js')

function setCommandComponentCustomBlocks(context, vscode) {
    for (let block of variables.customBlocks) {
        let disposableBlock = vscode.commands.registerCommand(
            `alxs-theme-extension.componentscustomblock${block}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);
                text = text.replace(/\n/g, "\n\t");

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<div class=\"${block}\">\n\t${text}\n</div>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let lines = text.split("\n");
                            let lastLine = lines[lines.length - 1];
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                lines.length,
                                lastLine.length + 1
                            ); // 12 is the length of "<div class=\"\">"
                            let newSelection = new vscode.Selection(
                                newPosition,
                                newPosition
                            );
                            editor.selection = newSelection;
                        }
                    });
            }
        );

        context.subscriptions.push(disposableBlock);
    }
}

module.exports = {
    setCommandComponentCustomBlocks,
}