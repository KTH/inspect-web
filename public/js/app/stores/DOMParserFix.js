/** Core-http and potentially storage-blob do not work from web worker #11067
 * Read more: https://github.com/Azure/azure-sdk-for-js/issues/11067
 */

import { DOMParser, DOMImplementation, XMLSerializer } from 'xmldom'
class DOMParserFix extends DOMParser {
  constructor() {
    super()
  }

  parseFromString(str, str2) {
    return super.parseFromString(str.replace('<?xml version="1.0" encoding="utf-8"?>', ''), str2)
  }
}
self.Node = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
}

self.DOMParser = DOMParserFix
self.XMLSerializer = XMLSerializer

self.document = {
  implementation: new DOMImplementation(),
}

self.window = {
  navigator,
}

if (!self.window.Node) {
  var Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12,
  }
}
