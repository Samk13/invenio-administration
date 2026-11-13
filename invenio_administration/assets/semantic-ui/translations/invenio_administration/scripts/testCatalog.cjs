// SPDX-FileCopyrightText: 2026 KTH Royal Institute of Technology.
// SPDX-License-Identifier: MIT

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { Parser } = require("i18next-scanner");
const { options } = require("../i18next-scanner.config.js");

function assertExtractedMessage(filename, message) {
  const sourceRoot = path.resolve(__dirname, "../../../js");
  const parser = new Parser({ ...options, debug: false });
  const source = fs.readFileSync(path.join(sourceRoot, filename), "utf8");
  parser.parseFuncFromString(source);
  parser.parseTransFromString(source);
  assert.equal(parser.get().en.translations[message], message);
}

test("extract SearchEmptyResults messages", () => {
  assertExtractedMessage("invenio_administration/src/search/SearchEmptyResults.js", "Current search \"{{query}}\"");
});
