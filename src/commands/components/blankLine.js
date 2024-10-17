function setCommandBlankLine(context, vscode) {
    let disposableBlank = vscode.commands.registerCommand(
        `alxs-theme-extension.blank`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let position = editor.selection.active;
            editor.edit((editBuilder) => {
                editBuilder.insert(position, `<blank></blank>`);
            });
        }
    );

    context.subscriptions.push(disposableBlank);
}

module.exports = {
    setCommandBlankLine,
}