const { setCommandColorText, setCommandColorHighlight } = require('./colors');
const { setCommandTheme } = require('./themes');
const {
    setCommandComponents,
    setCommandComponentFootnote,
    setCommandComponentCustomBlocks,
    setCommandGrids,
    setCommandBlankLine,
    setCommandAlignements,
    setCommandAuthor,
    setCommandDate,
    setCommandImage,
    setCommandTab,
    setCommandTables,
    setCommandConvertToTable,
} = require("./components");
const { setCommandCustomBoxes, setCommandCustomBoxesFormulas } = require('./customBoxes');
const { setCommandTextEffects } = require('./textEffects');
const { setCommandFontSize } = require('./fontSize');

const { setCommandMdToPdf, setCommandOnePageMdToPdf } = require('./pdf');

module.exports = {
    setCommandColorText,
    setCommandColorHighlight,
    setCommandTheme,
    setCommandComponents,
    setCommandComponentFootnote,
    setCommandComponentCustomBlocks,
    setCommandGrids,
    setCommandBlankLine,
    setCommandAlignements,
    setCommandAuthor,
    setCommandDate,
    setCommandImage,
    setCommandTab,
    setCommandTables,
    setCommandConvertToTable,
    setCommandCustomBoxes,
    setCommandCustomBoxesFormulas,
    setCommandTextEffects,
    setCommandFontSize,
    setCommandMdToPdf,
    setCommandOnePageMdToPdf,
}