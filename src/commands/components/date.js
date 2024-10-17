function setCommandDate(context, vscode) {
    let disposableDate = vscode.commands.registerCommand(
        `alxs-theme-extension.date`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let selection = editor.selection;
            let text = editor.document.getText(selection);

            editor
                .edit((editBuilder) => {
                    editBuilder.replace(selection, `<date>${text}</date>`);
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            6 + text.length
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

    context.subscriptions.push(disposableDate);

}

module.exports = {
    setCommandDate,
}