const fs = require("fs");

function setCommandMdToPdf(context, vscode, statusBarItem, mdToHtml, htmlToPdf) {
    let disposableMdToPdf = vscode.commands.registerCommand(
    "alxs-theme-extension.mdToPdf",
    function () {

        statusBarItem.text = "$(sync~spin) Converting to PDF...";
        statusBarItem.show();

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            statusBarItem.hide();
            return; // No open text editor
        }

        let filePath = editor.document.uri.fsPath;

        let outputHtml;
        try {
            outputHtml = mdToHtml(filePath, vscode);
        } catch (error) {
            console.log(error);
            statusBarItem.hide();
            return;
        }
        
        console.log(outputHtml);
        htmlToPdf(outputHtml, false, vscode).then(() => {
            try {
                fs.unlinkSync(outputHtml);
            } catch (error) {
                console.log(error);
            }
            statusBarItem.hide();
        });

    }
);

context.subscriptions.push(disposableMdToPdf);
}

module.exports = {
    setCommandMdToPdf,
}