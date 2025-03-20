import TurndownService from "turndown";

export const textToMarkdown = (text: string) => {
  // Create a new instance of TurndownService
  const turndownService = new TurndownService({
    headingStyle: "atx", // Use ATX-style headings (# Heading) instead of Setext
    hr: "---", // Use "---" for horizontal rules
    bulletListMarker: "-", // Use "-" for unordered lists
    codeBlockStyle: "fenced", // Use triple backticks for code blocks
    linkStyle: "referenced", // Use reference-style links for clarity
    linkReferenceStyle: "full", // Always use full reference links
    emDelimiter: "*", // Use '*' for italics (avoiding underscores)
    strongDelimiter: "**", // Use '**' for bold (avoiding underscores)
    preformattedCode: true, // Preserve preformatted code blocks
  });

  // **Remove unwanted elements**
  turndownService.remove([
    "script",
    "style",
    "iframe",
    "noscript",
    "form",
    "input",
    "button",
    "nav",
    "footer",
    "aside",
    // "ads",
    // "svg",
  ]);

  // **Customize rules for better LLM readability**
  turndownService.addRule("cleanTables", {
    filter: "table",
    replacement: (content) => `\n${content}\n`, // Avoid complex table formatting, let LLM handle it
  });

  turndownService.addRule("cleanDivs", {
    filter: "div",
    replacement: (content) => content, // Removes non-semantic divs while keeping content
  });

  turndownService.addRule("normalizeSpacing", {
    filter: ["p", "br"],
    replacement: (content) => `\n${content}\n`, // Ensures proper spacing for readability
  });
  return turndownService.turndown(text);

  // turndownService.addRule("cleanLinks", {
  //   filter: "a",
  //   replacement: (content, node) => {
  //     const href = node.getAttribute("href");
  //     return href ? `[${content}](${href})` : content;
  //   },
  // });
  // turndownService.addRule("removeEmptyElements", {
  //   filter: (node) => !node.textContent.trim(),
  //   replacement: () => "", // Remove empty elements
  // });
};
