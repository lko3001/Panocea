import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export default ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}) => (
  <NodeViewWrapper className="relative">
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
