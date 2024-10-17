const variables = require("../../variables.js");

function setCommandComponents(context, vscode) {
    for (let component of variables.components) {
        let disposableComponent = vscode.commands.registerCommand(
            `alxs-theme-extension.components${component}`,
            function () {
                let editor = vscode.window.activeTextEditor;
                if (!editor) {
                    return; // No open text editor
                }

                let position = editor.selection.active;
                editor.edit((editBuilder) => {
                    editBuilder.insert(
                        position,
                        `<${component}></${component}>`
                    );
                });
            }
        );

        context.subscriptions.push(disposableComponent);
    }
}

module.exports = {
    setCommandComponents,
};