/* Example... not set up yet */
module.exports = {
  '../vendor/x.js'    :  { 'exports': '$' },
  '../vendor/x-ui.js' :  { 'depends': { '../vendor/x.js': null } },
  '../vendor/y.js'    :  { 'exports': 'Y', 'depends': { '../vendor/x.js': '$' } },
  '../vendor/z.js'    :  { 'exports': 'zorro', 'depends': { '../vendor/x.js': '$', '../vendor/y.js': 'YNOT' } }
};
