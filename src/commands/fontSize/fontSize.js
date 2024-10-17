const variables = require("../../variables");

function setCommandFontSize(context, vscode) {
    for (let size of variables.sizesFont) {
        let disposableSize = vscode.commands.registerCommand(
            `alxs-theme-extension.fontsize${size}`,
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
                            `<span class="f${size}">${text}</span>`
                        );
                    })
                    .then((success) => {
                        // Move cursor to the end of the text
                        if (success) {
                            let position = editor.selection.start;
                            let newPosition = position.translate(
                                0,
                                16 + size.length + text.length
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

        context.subscriptions.push(disposableSize);
    }
}

module.exports = {
    setCommandFontSize,
}