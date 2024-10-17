const variables = require("../../variables");

function setCommandCustomBoxesFormulas(context, vscode) {
    for (let color in variables.boxesColor) {
        let disposableBox = vscode.commands.registerCommand(
            `alxs-theme-extension.boxesformula${variables.boxesColor[color]}`,
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
                            `<${variables.boxesColor[color]}formula>\n\t${text}\n</${variables.boxesColor[color]}formula>`
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

        context.subscriptions.push(disposableBox);
    }
}

module.exports = {
    setCommandCustomBoxesFormulas,
}