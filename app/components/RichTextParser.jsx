"use client";
import React, { useMemo } from "react";

// ------------------------------
// Inline formatter (**bold**, _italic_, [link](url))
// ------------------------------
const formatInline = (text) => {
  if (!text) return [{ type: "text", content: "", key: "empty" }];

  // Regex to match links in format [text](url) or [url](link)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const boldItalicRegex = /(\*\*.*?\*\*|_.*?_)/g;

  // First, extract all links
  const elements = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0; // Reset key counter for each call

  // Process links first
  while ((match = linkRegex.exec(text)) !== null) {
    // Add any text before the link
    if (match.index > lastIndex) {
      const textBeforeLink = text.slice(lastIndex, match.index);
      // Process bold/italic in text before link
      const boldItalicParts = textBeforeLink.split(boldItalicRegex);
      boldItalicParts.forEach((part, idx) => {
        if (part.match(boldItalicRegex)) {
          if (part.startsWith("**")) {
            elements.push({
              type: "bold",
              content: part.slice(2, -2),
              key: `bold-${keyCounter++}`,
            });
          } else if (part.startsWith("_")) {
            elements.push({
              type: "italic",
              content: part.slice(1, -1),
              key: `italic-${keyCounter++}`,
            });
          }
        } else if (part) {
          elements.push({
            type: "text",
            content: part,
            key: `text-${keyCounter++}`,
          });
        }
      });
    }

    // Add the link
    elements.push({
      type: "link",
      content: match[1], // Link text
      url: match[2], // Link URL
      key: `link-${keyCounter++}`,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after the last link
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    // Process bold/italic in remaining text
    const boldItalicParts = remainingText.split(boldItalicRegex);
    boldItalicParts.forEach((part, idx) => {
      if (part.match(boldItalicRegex)) {
        if (part.startsWith("**")) {
          elements.push({
            type: "bold",
            content: part.slice(2, -2),
            key: `bold-${keyCounter++}`,
          });
        } else if (part.startsWith("_")) {
          elements.push({
            type: "italic",
            content: part.slice(1, -1),
            key: `italic-${keyCounter++}`,
          });
        }
      } else if (part) {
        elements.push({
          type: "text",
          content: part,
          key: `text-${keyCounter++}`,
        });
      }
    });
  }

  return elements;
};

// ------------------------------
// Render formatted inline parts
// ------------------------------
const InlineText = ({ text }) => {
  const parts = useMemo(() => formatInline(text), [text]);

  return (
    <>
      {parts.map((part) => {
        if (part.type === "bold")
          return <strong key={part.key}>{part.content}</strong>;
        if (part.type === "italic")
          return <em key={part.key}>{part.content}</em>;
        if (part.type === "link")
          return (
            <a
              key={part.key}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {part.content}
            </a>
          );
        return <span key={part.key}>{part.content}</span>;
      })}
    </>
  );
};

// ------------------------------
// Parse text into paragraphs and lists
// ------------------------------
const parseRichText = (text) => {
  if (!text) return [];

  const lines = text.split("\n");
  const elements = [];
  let list = null;

  const pushList = () => {
    if (list) {
      elements.push(list);
      list = null;
    }
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) {
      pushList();
      return;
    }

    const numbered = line.match(/^(\d+)\.\s+(.+)$/);
    if (numbered) {
      if (!list || list.type !== "ol") {
        pushList();
        list = { type: "ol", key: `ol-list-${i}`, items: [] };
      }
      list.items.push({
        key: `ol-${i}`,
        content: numbered[2],
      });
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!list || list.type !== "ul") {
        pushList();
        list = { type: "ul", key: `ul-list-${i}`, items: [] };
      }
      list.items.push({
        key: `ul-${i}`,
        content: bullet[1],
      });
      return;
    }

    pushList();
    elements.push({
      type: "p",
      key: `p-${i}`,
      content: line,
    });
  });

  pushList();
  return elements;
};

// ------------------------------
// MAIN COMPONENT
// ------------------------------
const RichTextParser = ({ text }) => {
  const elements = useMemo(() => parseRichText(text), [text]);

  return (
    <>
      {elements.map((el) => {
        if (el.type === "p") {
          return (
            <p
              id={`${el.key}`}
              key={el.key}
              className="text-textPrimary text-bodyLarge leading-[120%] font-neueMontreal"
            >
              <InlineText text={el.content} />
            </p>
          );
        }

        if (el.type === "ul") {
          return (
            <ul
              key={el.key}
              className="list-disc pl-6 space-y-2 text-textPrimary text-bodyLarge font-neueMontreal"
            >
              {el.items.map((item) => (
                <li id={`${item.key}`} key={item.key}>
                  <InlineText text={item.content} />
                </li>
              ))}
            </ul>
          );
        }

        if (el.type === "ol") {
          return (
            <ol
              key={el.key}
              className="list-decimal pl-6 space-y-2 text-textPrimary text-bodyLarge font-neueMontreal"
            >
              {el.items.map((item) => (
                <li id={`${item.key}`} key={item.key}>
                  <InlineText text={item.content} />
                </li>
              ))}
            </ol>
          );
        }

        return null;
      })}
    </>
  );
};

export default RichTextParser;
