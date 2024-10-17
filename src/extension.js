// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const MD_TO_PDF_SUBMODULE_PATH = "./Markdown-to-Pdf/markdown-to-pdf/src/";
const { mdToHtml } = require(MD_TO_PDF_SUBMODULE_PATH + "mdToHtml.js");
const { htmlToPdf } = require(MD_TO_PDF_SUBMODULE_PATH + "./htmlToPdf.js");
const { startServer, stopServer, restartServer } = require("./server.js");

const config = require('./config.js'); // the config variables of the extension
const commands = require('./commands'); // the commands of the extension
let server;

const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // § Get the vscode configuration settings
    let vscConfig = vscode.workspace.getConfiguration("alxs-theme-extension"); // the vscode configuration settings that are manageable by the user

    // § Start the server
    server = startServer(vscConfig);

    console.log(
        'Congratulations, your extension "alxs-theme-extension" is now active!'
    );

    let disposableServer = vscode.commands.registerCommand(
        "alxs-theme-extension.restartServer",
        function () {
            restartServer(server, vscConfig);
        }
    );

    context.subscriptions.push(disposableServer);

    // µ Main theme commands
    // & md text color menu
    
    commands.setCommandColorText(context, vscode);
    commands.setCommandColorHighlight(context, vscode);

    // & Add theme
    
    commands.setCommandTheme(context, vscode);

    // & Components
    // @ usual components
    
    commands.setCommandComponents(context, vscode);

    // @ footnote component
    
    commands.setCommandComponentFootnote(context, vscode);

    // @ custom blocks components

    commands.setCommandComponentCustomBlocks(context, vscode);

    // & Add custom boxes

    // @ usual boxes

    commands.setCommandCustomBoxes(context, vscode);

    // @ formula boxes
    
    commands.setCommandCustomBoxesFormulas(context, vscode);

    // & grids

    commands.setCommandGrids(context, vscode);
    
    // & blank line

    commands.setCommandBlankLine(context, vscode);

    // & Alignements

    commands.setCommandAlignements(context, vscode);

    // & Text effects

    commands.setCommandTextEffects(context, vscode);    

    // & Author component

    commands.setCommandAuthor(context, vscode);

    // & Date component

    commands.setCommandDate(context, vscode);

    // & Font size

    commands.setCommandFontSize(context, vscode);

    // & image component

    commands.setCommandImage(context, vscode);

    // & tab component

    commands.setCommandTab(context, vscode);

    // & table component

    commands.setCommandTables(context, vscode);
    
    // & convert to table
        
    commands.setCommandConvertToTable(context, vscode);

    // µ Md to pdf commands

    commands.setCommandMdToPdf(context, vscode, statusBarItem, mdToHtml, htmlToPdf);
    commands.setCommandOnePageMdToPdf(context, vscode, statusBarItem, mdToHtml, htmlToPdf);

    // µ TreeView

    // & Theme Provider

    const themeDataProvider = {
        getChildren: (element) => {
            if (!element) {
                return [
                    { label: "Theme", id: "theme", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/theme.png")) },
                    {
                        label: "Color",
                        id: "color",
                        iconPath: vscode.Uri.file(
                            context.asAbsolutePath("src/media/colors.png")
                        ),
                    },
                    { label: "Alignement", id: "alignement", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/alignement/alignement.png")) },
                    { label: "Components", id: "components", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/component.png")) },
                    { label: "Custom Boxes", id: "custom-boxes", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxsection.png")) },
                    { label: "Font Size", id: "font-size", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/font-size.png")) },
                    { label: "Text Effects", id: "text-effects", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/text-effect/text-effect.png")) },
                    { label: "Convert to PDF", command: "alxs-theme-extension.mdToPdf", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/convert-pdf.png"))},
                    { label: "Conversion Options", id: "conversion-options", iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/convert-pdf.png"))},
                    { label: "Restart Server", command: "alxs-theme-extension.restartServer", iconPath: new vscode.ThemeIcon('refresh')},
                ];
            } else
                switch (element.id) {
                    case "theme":
                        return [
                            {
                                label: "Aesthetic",
                                command:
                                    "alxs-theme-extension.addTheme_aesthetic",
                            },
                            {
                                label: "ALXS-white",
                                command:
                                    "alxs-theme-extension.addTheme_alxs-white",
                            },
                            {
                                label: "CheatSheet",
                                command:
                                    "alxs-theme-extension.addTheme_cheatsheet",
                            }

                        ];
                    case "color":
                        return [
                            {
                                label: "Highlight Color",
                                id: "highlight-color",
                                iconPath: vscode.Uri.file(
                                    context.asAbsolutePath(
                                        "src/media/highlighter/highlightersection.png"
                                    )
                                ),
                            },
                            {
                                label: "Text Color",
                                id: "text-color",
                                iconPath: vscode.Uri.file(
                                    context.asAbsolutePath("src/media/T/Tsection.png")
                                ),
                            },
                        ];

                    case "text-color":
                        return [
                            {
                                label: "Color Blue",
                                command: "alxs-theme-extension.colorblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tblue.png")),
                            },
                            {
                                label: "Color Red",
                                command: "alxs-theme-extension.colorred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tred.png")),
                            },
                            {
                                label: "Color Green",
                                command: "alxs-theme-extension.colorgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tgreen.png")),
                            },
                            {
                                label: "Color Orange",
                                command: "alxs-theme-extension.colororange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Torange.png")),
                            },
                            {
                                label: "Color Yellow",
                                command: "alxs-theme-extension.coloryellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tyellow.png")),
                            },
                            {
                                label: "Color Purple",
                                command: "alxs-theme-extension.colorpurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tpurple.png")),
                            },
                            {
                                label: "Color Pink",
                                command: "alxs-theme-extension.colorpink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tpink.png")),
                            },
                            {
                                label: "Color White",
                                command: "alxs-theme-extension.colorwhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Twhite.png")),
                            },
                            {
                                label: "Color Theme Color",
                                command: "alxs-theme-extension.colorcolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/T/Tcolor.png")),
                            },
                        ];
                    case "highlight-color":
                        return [
                            {
                                label: "Highlight Blue",
                                command: "alxs-theme-extension.highlightblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterblue.png")),
                            },
                            {
                                label: "Highlight Red",
                                command: "alxs-theme-extension.highlightred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterred.png")),
                            },
                            {
                                label: "Highlight Green",
                                command: "alxs-theme-extension.highlightgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlightergreen.png")),
                            },
                            {
                                label: "Highlight Orange",
                                command: "alxs-theme-extension.highlightorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterorange.png")),
                            },
                            {
                                label: "Highlight Yellow",
                                command: "alxs-theme-extension.highlightyellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighteryellow.png")),
                            },
                            {
                                label: "Highlight Purple",
                                command: "alxs-theme-extension.highlightpurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterpurple.png")),
                            },
                            {
                                label: "Highlight Pink",
                                command: "alxs-theme-extension.highlightpink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterpink.png")),
                            },
                            {
                                label: "Highlight White",
                                command: "alxs-theme-extension.highlightwhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlighterwhite.png")),
                            },
                            {
                                label: "Highlight Theme Color",
                                command: "alxs-theme-extension.highlightcolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/highlighter/highlightercolor.png")),
                            },
                        ];
                    case "alignement":
                        return [
                            {
                                label: "Align Left",
                                command: "alxs-theme-extension.alignementsleft",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/alignement/left.png")),
                            },
                            {
                                label: "Align Center",
                                command:
                                    "alxs-theme-extension.alignementscenter",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/alignement/center.png")),
                            },
                            {
                                label: "Align Right",
                                command:
                                    "alxs-theme-extension.alignementsright",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/alignement/right.png")),
                            },
                        ];

                    case "components":
                        return [
                            {
                                label: "Blank Line",
                                command: "alxs-theme-extension.blank",
                            },
                            {
                                label: "Plan",
                                command: "alxs-theme-extension.componentsplan",
                            },
                            {
                                label: "Page Break",
                                command:
                                    "alxs-theme-extension.componentspagebreak",
                            },
                            {
                                label: "Footnote",
                                command: "alxs-theme-extension.componentsfnote",
                            },
                            {
                                label: "Author",
                                command: "alxs-theme-extension.author",
                            },
                            {
                                label: "Date",
                                command: "alxs-theme-extension.date",
                            },
                            {
                                label: "Image",
                                command: "alxs-theme-extension.image",
                            },
                            {
                                label: "Tab",
                                command: "alxs-theme-extension.tab",
                            },
                            {
                                label: "Custom Blocks",
                                id: "custom-blocks",
                            },
                            {
                                label: "Grids",
                                id: "grids",
                            },
                            {
                                label: "Tables",
                                id: "tables",
                            }
                        ];
                    case "custom-blocks":
                        return [
                            {
                                label: "Definition",
                                command:
                                    "alxs-theme-extension.componentscustomblockdefinition",
                            },
                            {
                                label: "Note",
                                command:
                                    "alxs-theme-extension.componentscustomblocknote",
                            },
                            {
                                label: "Warning",
                                command:
                                    "alxs-theme-extension.componentscustomblockwarning",
                            },
                            {
                                label: "Tip",
                                command:
                                    "alxs-theme-extension.componentscustomblocktip",
                            },
                            {
                                label: "Important",
                                command:
                                    "alxs-theme-extension.componentscustomblockimportant",
                            },
                            {
                                label: "Error",
                                command:
                                    "alxs-theme-extension.componentscustomblockerror",
                            },
                            {
                                label: "Sucess",
                                command:
                                    "alxs-theme-extension.componentscustomblocksucess",
                            },
                            {
                                label: "Abstract",
                                command:
                                    "alxs-theme-extension.componentscustomblockabstract",
                            },
                            {
                                label: "Example",
                                command:
                                    "alxs-theme-extension.componentscustomblockexample",
                            },
                            {
                                label: "Question",
                                command:
                                    "alxs-theme-extension.componentscustomblockquestion",
                            },
                            {
                                label: "Quote",
                                command:
                                    "alxs-theme-extension.componentscustomblockquote",
                            },
                            {
                                label: "Bug",
                                command:
                                    "alxs-theme-extension.componentscustomblockbug",
                            },
                        ];
                    case "grids":
                        return [
                            {
                                label: "Grid 2",
                                command: "alxs-theme-extension.grids2",
                            },
                            {
                                label: "Grid 3",
                                command: "alxs-theme-extension.grids3",
                            },
                        ];
                    case "tables":
                        return [
                            {
                                label: "Table Red",
                                command: "alxs-theme-extension.tablered",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-red.png")),
                            },
                            {
                                label: "Table Blue",
                                command: "alxs-theme-extension.tableblue",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-blue.png")),
                            },
                            {
                                label: "Table Green",
                                command: "alxs-theme-extension.tablegreen",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-green.png")),
                            },
                            {
                                label: "Table Orange",
                                command: "alxs-theme-extension.tableorange",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-orange.png")),
                            },
                            {
                                label: "Table Yellow",
                                command: "alxs-theme-extension.tableyellow",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-yellow.png")),
                            },
                            {
                                label: "Table Purple",
                                command: "alxs-theme-extension.tablepurple",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-purple.png")),
                            },
                            {
                                label: "Table Pink",
                                command: "alxs-theme-extension.tablepink",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-pink.png")),
                            },
                            {
                                label: "Table White",
                                command: "alxs-theme-extension.tablewhite",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-white.png")),
                            },
                            {
                                label: "Table Theme Color",
                                command: "alxs-theme-extension.tablecolor",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/table-color.png")),
                            },
                            {
                                label: "Convert to Table",
                                command: "alxs-theme-extension.convertToTable",
                                // iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/table/convert.png")),
                            }
                        ];
                    case "custom-boxes":
                        return [
                            {
                                label: "Boxes",
                                id: "boxes",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxsection.png")),
                            },
                            {
                                label: "Formulas",
                                id: "formulas",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulasection.png")),
                            },
                        ];
                    case "boxes":
                        return [
                            {
                                label: "Red Box",
                                command: "alxs-theme-extension.boxesred",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxred.png")),
                            },
                            {
                                label: "Blue Box",
                                command: "alxs-theme-extension.boxesblue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxblue.png")),
                            },
                            {
                                label: "Green Box",
                                command: "alxs-theme-extension.boxesgreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxgreen.png")),
                            },
                            {
                                label: "Orange Box",
                                command: "alxs-theme-extension.boxesorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxorange.png")),
                            },
                            {
                                label: "Yellow Box",
                                command: "alxs-theme-extension.boxesyellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxyellow.png")),
                            },
                            {
                                label: "Purple Box",
                                command: "alxs-theme-extension.boxespurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxpurple.png")),
                            },
                            {
                                label: "Pink Box",
                                command: "alxs-theme-extension.boxespink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxpink.png")),
                            },
                            {
                                label: "White Box",
                                command: "alxs-theme-extension.boxeswhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxwhite.png")),
                            },
                            {
                                label: "Theme Color Box",
                                command: "alxs-theme-extension.boxescolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/boxes/boxcolor.png")),
                            },
                        ];
                    case "formulas":
                        return [
                            {
                                label: "Red Formula",
                                command: "alxs-theme-extension.boxesformulared",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulared.png")),
                            },
                            {
                                label: "Blue Formula",
                                command: "alxs-theme-extension.boxesformulablue",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulablue.png")),
                            },
                            {
                                label: "Green Formula",
                                command:
                                    "alxs-theme-extension.boxesformulagreen",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulagreen.png")),
                            },
                            {
                                label: "Orange Formula",
                                command:
                                    "alxs-theme-extension.boxesformulaorange",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulaorange.png")),
                            },
                            {
                                label: "Yellow Formula",
                                command:
                                    "alxs-theme-extension.boxesformulayellow",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulayellow.png")),
                            },
                            {
                                label: "Purple Formula",
                                command:
                                    "alxs-theme-extension.boxesformulapurple",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulapurple.png")),
                            },
                            {
                                label: "Pink Formula",
                                command: "alxs-theme-extension.boxesformulapink",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulapink.png")),
                            },
                            {
                                label: "White Formula",
                                command:
                                    "alxs-theme-extension.boxesformulawhite",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulawhite.png")),
                            },
                            {
                                label: "Theme Color Formula",
                                command:
                                    "alxs-theme-extension.boxesformulacolor",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/formula/formulacolor.png")),
                            },
                        ];
                    case "font-size":
                        return [
                            {
                                label: "Size 6",
                                command: "alxs-theme-extension.fontsize6",
                            },
                            {
                                label: "Size 8",
                                command: "alxs-theme-extension.fontsize8",
                            },
                            {
                                label: "Size 10",
                                command: "alxs-theme-extension.fontsize10",
                            },
                            {
                                label: "Size 12",
                                command: "alxs-theme-extension.fontsize12",
                            },
                            {
                                label: "Size 14",
                                command: "alxs-theme-extension.fontsize14",
                            },
                            {
                                label: "Size 16",
                                command: "alxs-theme-extension.fontsize16",
                            },
                            {
                                label: "Size 18",
                                command: "alxs-theme-extension.fontsize18",
                            },
                            {
                                label: "Size 20",
                                command: "alxs-theme-extension.fontsize20",
                            },
                            {
                                label: "Size 24",
                                command: "alxs-theme-extension.fontsize24",
                            },
                            {
                                label: "Size 28",
                                command: "alxs-theme-extension.fontsize28",
                            },
                            {
                                label: "Size 32",
                                command: "alxs-theme-extension.fontsize32",
                            },
                            {
                                label: "Size 36",
                                command: "alxs-theme-extension.fontsize36",
                            },
                            {
                                label: "Size 40",
                                command: "alxs-theme-extension.fontsize40",
                            },
                            {
                                label: "Size 44",
                                command: "alxs-theme-extension.fontsize44",
                            },
                            {
                                label: "Size 48",
                                command: "alxs-theme-extension.fontsize48",
                            },
                            {
                                label: "Size 52",
                                command: "alxs-theme-extension.fontsize52",
                            },
                        ];
                    case "text-effects":
                        return [
                            {
                                label: "Bold",
                                command: "alxs-theme-extension.effectsb",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/text-effect/bold.png")),
                            },
                            {
                                label: "Italic",
                                command: "alxs-theme-extension.effectsi",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/text-effect/italic.png")),
                            },
                            {
                                label: "Underline",
                                command: "alxs-theme-extension.effectsu",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/text-effect/underline.png")),
                            },
                            {
                                label: "Strike",
                                command: "alxs-theme-extension.effectss",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/text-effect/strikethrough.png")),
                            },
                        ];
                    case "conversion-options":
                        return [
                            {
                                label: "Convert to PDF",
                                command: "alxs-theme-extension.mdToPdf",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/convert-pdf.png")),
                            },
                            {
                                label: "Convert to One Page PDF",
                                command: "alxs-theme-extension.onePageMdToPdf",
                                iconPath: vscode.Uri.file(context.asAbsolutePath("src/media/convert-pdf.png")),
                            },
                        ];
                }
        },
        getTreeItem: (item) => {
            return {
                label: item.label,
                command: item.command
                    ? {
                          command: item.command,
                          title: item.label,
                      }
                    : undefined,
                collapsibleState: item.command
                    ? vscode.TreeItemCollapsibleState.None
                    : vscode.TreeItemCollapsibleState.Collapsed,
                iconPath: item.iconPath,
            };
        },
    };

    vscode.window.createTreeView("alxs-theme-extension.themeView", {
        treeDataProvider: themeDataProvider,
    });
}

// This method is called when your extension is deactivated
function deactivate() {
    if (server) {
        stopServer(server);
    }
}

module.exports = {
    activate,
    deactivate,
};
