const variables = require('../../variables.js');

function setCommandAlignements(context, vscode) {
    for (let alignement of variables.alignements) {
        let disposableAlignement = vscode.commands.registerCommand(
            `alxs-theme-extension.alignements${alignement}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let selection = editor.selection;
                let text = editor.document.getText(selection);

                editor
                    .edit((editBuilder) => {
                        editBuilder.replace(
                            selection,
                            `<p class="${alignement}">${text}</p>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                12 + alignement.length + text.length
                            ); // 3 is the length of "<h>"
                            let newSelection = new vscode.Selection(
                                newPosition,
                                newPosition
                            );
                            editor.selection = newSelection;
                        }
                    });
            }
        );

        context.subscriptions.push(disposableAlignement);
    }
}

module.exports = {
    setCommandAlignements,
}