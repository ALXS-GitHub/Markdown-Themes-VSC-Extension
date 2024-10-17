const variables = require("../../variables.js");

function setCommandColorHighlight(context, vscode) {
    for (let color of variables.colors) {
        let disposableHighlight = vscode.commands.registerCommand(
            `alxs-theme-extension.highlight${color}`,
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
                            `<h${color}>${text}</h${color}>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                3 + color.length + text.length
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

        context.subscriptions.push(disposableHighlight);
    }
}

module.exports = {
    setCommandColorHighlight,
};