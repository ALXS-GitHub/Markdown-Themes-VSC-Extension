function setCommandTab(context, vscode) {
    let disposableTab = vscode.commands.registerCommand(
        `alxs-theme-extension.tab`,
        function () {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }

            let position = editor.selection.active;
            editor.edit((editBuilder) => {
                editBuilder.insert(position, `<tab></tab>`);
            });
        }
    );

    context.subscriptions.push(disposableTab);

}

module.exports = {
    setCommandTab,
}