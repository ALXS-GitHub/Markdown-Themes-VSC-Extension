const variables = require('../../variables.js');

function setCommandComponentFootnote(context, vscode) {
    let disposableFootnote = vscode.commands.registerCommand(
        `alxs-theme-extension.componentsfnote`,
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
                        `<fnote>${text} || </fnote>`
                    );
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            7 + text.length
                        ); // 7 is the length of "<fnote>"
                        let newSelection = new vscode.Selection(
                            newPosition,
                            newPosition
                        );
                        editor.selection = newSelection;
                    }
                });
        }
    );

    context.subscriptions.push(disposableFootnote);
}

module.exports = {
    setCommandComponentFootnote,
};