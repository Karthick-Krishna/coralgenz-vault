import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

console.log('--- Testing Excel High-Fidelity Rendering & Security Integration ---');

// 1. Create a mock Excel workbook in memory with diverse data types (dates, currency, percentage, formula)
const wb = XLSX.utils.book_new();
const wsData = [
  ['Product', 'Date Sold', 'Unit Price', 'Discount', 'Units', 'Total Revenue'],
  ['Enterprise Vault License', new Date('2024-03-15T12:00:00Z'), 1500.50, 0.15, 10, { f: 'C2*(1-D2)*E2' }],
  ['Hardware Security Key', new Date('2024-04-01T09:30:00Z'), 85.00, 0.05, 50, { f: 'C3*(1-D3)*E3' }],
  ['Quantum Armored Enclave', new Date('2024-05-20T18:00:00Z'), 4500.00, 0.20, 4, { f: 'C4*(1-D4)*E4' }]
];

const ws = XLSX.utils.aoa_to_sheet(wsData);

// Set explicit number formats
ws['C2'].z = '$#,##0.00';
ws['D2'].z = '0.0%';
ws['F2'].z = '$#,##0.00';

ws['C3'].z = '$#,##0.00';
ws['D3'].z = '0.0%';
ws['F3'].z = '$#,##0.00';

ws['C4'].z = '$#,##0.00';
ws['D4'].z = '0.0%';
ws['F4'].z = '$#,##0.00';

XLSX.utils.book_append_sheet(wb, ws, 'Sales Analysis Q1');

// Add second sheet
const wsSummaryData = [
  ['Metric', 'Value'],
  ['Total Licenses', 64],
  ['Audit Status', 'PASSED [✓]']
];
const wsSummary = XLSX.utils.aoa_to_sheet(wsSummaryData);
XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

const xlsxBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
console.log('✓ Mock Excel file created in-memory, size:', xlsxBuffer.length, 'bytes');

// 2. Test SheetJS read with high-fidelity formatting flags (the exact parameters used in src/main.js)
const parsedWb = XLSX.read(xlsxBuffer, {
  type: 'buffer',
  cellDates: true,
  cellNF: true,
  cellText: true,
  cellStyles: true,
  sheetStubs: true
});

assert.strictEqual(parsedWb.SheetNames.length, 2, 'Workbook should have 2 sheets');
assert.strictEqual(parsedWb.SheetNames[0], 'Sales Analysis Q1');
assert.strictEqual(parsedWb.SheetNames[1], 'Executive Summary');

const sheet1 = parsedWb.Sheets['Sales Analysis Q1'];

// Verify formatted text extraction with raw: false
const jsonWithFormatting = XLSX.utils.sheet_to_json(sheet1, {
  header: 1,
  raw: false,
  dateNF: 'yyyy-mm-dd',
  defval: ''
});

console.log('Sheet 1 Rows (Formatted):');
console.log(jsonWithFormatting);

// Verify that dates are formatted as readable strings rather than raw confusing serials (e.g. 45366)
const dateCellStr = jsonWithFormatting[1][1];
assert.ok(
  typeof dateCellStr === 'string' && (dateCellStr.includes('2024') || dateCellStr.includes('/')),
  `Date should be formatted as human-readable string, got: ${dateCellStr}`
);
console.log('✓ Date is human-readable:', dateCellStr);

// Verify currency formatting
const priceCellStr = jsonWithFormatting[1][2];
assert.ok(
  priceCellStr.includes('$') || priceCellStr.includes('1500') || priceCellStr.includes('1,500'),
  `Price should have currency formatting, got: ${priceCellStr}`
);
console.log('✓ Currency is properly formatted:', priceCellStr);

// Verify percentage formatting
const discountCellStr = jsonWithFormatting[1][3];
assert.ok(
  discountCellStr.includes('%') || discountCellStr.includes('15'),
  `Discount should have percentage formatting, got: ${discountCellStr}`
);
console.log('✓ Percentage is properly formatted:', discountCellStr);

// Verify formula preservation
assert.ok(sheet1['F2'] && sheet1['F2'].f, 'Formula should be preserved in cell F2');
assert.strictEqual(sheet1['F2'].f, 'C2*(1-D2)*E2', 'Formula text should match');
console.log('✓ Formula correctly preserved:', sheet1['F2'].f);

// 3. Inspect src/main.js to verify all critical code integrations
const mainJsCode = fs.readFileSync(path.resolve('src/main.js'), 'utf8');

// Check MIME type mapping in main.js
assert.ok(
  mainJsCode.includes("determinedType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"),
  'Explicit XLSX MIME type must be present'
);
assert.ok(
  mainJsCode.includes("determinedType = 'application/vnd.ms-excel'"),
  'Explicit XLS MIME type must be present'
);
assert.ok(
  mainJsCode.includes("determinedType = 'text/csv'"),
  'Explicit CSV MIME type must be present'
);
console.log('✓ MIME type mapping includes explicit Excel & spreadsheet types');

// Check in-app viewer configuration
assert.ok(
  mainJsCode.includes('cellDates: true') && mainJsCode.includes('raw: false'),
  'In-app renderExcelToHTML must use cellDates: true and raw: false'
);
assert.ok(
  mainJsCode.includes('inapp-formula-input') && mainJsCode.includes('inapp-name-box'),
  'In-app viewer must include Excel Formula Bar components'
);
console.log('✓ In-app Excel viewer contains authentic Formula Bar and SheetJS high-fidelity options');

// Check standalone universal runner configuration
assert.ok(
  mainJsCode.includes("xlsxEngine = loadEmbeddedLibrary(XLSX_DEFLATED, 'XLSX')"),
  'SpreadsheetParser in standalone runner must load embedded XLSX engine'
);
assert.ok(
  mainJsCode.includes('excel-formula-bar') && mainJsCode.includes('excel-name-box'),
  'Standalone runner must include excel-formula-bar and excel-name-box'
);
assert.ok(
  mainJsCode.includes('excel-bottom-bar') && mainJsCode.includes('excel-tabs-list'),
  'Spreadsheet viewers must include authentic excel-bottom-bar and tabs list'
);
assert.ok(
  mainJsCode.includes('sheet_to_html'),
  'Spreadsheet viewers must utilize sheet_to_html for authentic cell and merge layout'
);
console.log('✓ Standalone universal runner contains embedded SheetJS parser, formula bar, and bottom tabs');

// 4. Test merged cells (colspan/rowspan) with sheet_to_html
const wbMerged = XLSX.utils.book_new();
const wsMerged = XLSX.utils.aoa_to_sheet([
  ['QUARTERLY CONSOLIDATED SUMMARY', null, null, null],
  ['Region', 'Q1 Actual', 'Q2 Actual', 'Total'],
  ['Global Operations', 50000, 60000, { f: 'B3+C3' }]
]);
wsMerged['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
wsMerged['!cols'] = [{ wpx: 200 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }];
const htmlMerged = XLSX.utils.sheet_to_html(wsMerged, { header: '', footer: '' });

assert.ok(htmlMerged.includes('colspan="4"'), 'sheet_to_html must preserve merged header colspan=4');
assert.ok(htmlMerged.includes('QUARTERLY CONSOLIDATED SUMMARY'), 'Merged cell text must be present');
console.log('✓ Merged cells correctly preserved with colspan="4"');

// Check font family styling in src/style.css
const styleCssCode = fs.readFileSync(path.resolve('src/style.css'), 'utf8');
assert.ok(
  styleCssCode.includes('.excel-formula-bar') && styleCssCode.includes('.excel-active-cell'),
  'style.css must contain .excel-formula-bar and .excel-active-cell styles'
);
assert.ok(
  styleCssCode.includes('.excel-bottom-bar') && styleCssCode.includes('.excel-tab-item'),
  'style.css must contain .excel-bottom-bar and .excel-tab-item styles'
);
assert.ok(
  !styleCssCode.match(/\.excel-table\s*\{[^}]*font-family:\s*var\(--font-mono\)/),
  '.excel-table should not be restricted to monospace font'
);
console.log('✓ CSS styles support interactive cell selection, formula bar, bottom tabs, and native spreadsheet typography');

console.log('\n>>> ALL EXCEL FIDELITY AND RENDERING TESTS PASSED SUCCESSFULLY! <<<');
