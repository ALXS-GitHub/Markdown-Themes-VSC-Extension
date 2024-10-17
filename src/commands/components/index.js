const { setCommandComponents } = require('./components.js');
const { setCommandComponentFootnote } = require('./footnote.js');
const { setCommandComponentCustomBlocks } = require('./customBlocks.js');
const { setCommandGrids } = require('./grids');
const { setCommandBlankLine } = require('./blankLine.js');
const { setCommandAlignements } = require('./alignements.js');
const { setCommandAuthor } = require('./author.js');
const { setCommandDate } = require('./date.js');
const { setCommandImage } = require('./image.js');
const { setCommandTab } = require('./tab.js');
const { setCommandTables, setCommandConvertToTable } = require('./tables')

module.exports = {
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
}