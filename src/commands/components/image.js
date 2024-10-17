function setCommandImage(context, vscode) {
    let disposableImage = vscode.commands.registerCommand(
        `alxs-theme-extension.image`,
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
                        `<img src="${text}" style="width: auto; height: auto" class="" alt=""/>`
                    );
                })
                .then((success) => {
                    // Move cursor to the end of the text
                    if (success) {
                        let position = editor.selection.start;
                        let newPosition = position.translate(
                            0,
                            10 + text.length
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

    context.subscriptions.push(disposableImage);
}

module.exports = {
    setCommandImage,
}