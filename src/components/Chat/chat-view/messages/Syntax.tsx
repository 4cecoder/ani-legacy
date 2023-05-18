// src/components/Chat/chat-view/messages/Syntax.tsx

import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import DOMPurify from "dompurify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const escapePHPCodeBlocks = (text: string) => {
  const phpCodeBlockRegex = /<\?php[\s\S]*?\?>/g;
  return text.replace(phpCodeBlockRegex, (codeBlock: string) => {
    return codeBlock
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&lt;\/?php&gt;/gi, "");
  });
};

const applySyntaxHighlighting = (text: string) => {
  const basicHighlightRegex = /`([^`]+)`/g;
  const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
  const withBasicHighlighting = text.replace(
    basicHighlightRegex,
    '<code class="hljs">$1</code>'
  );
  return withBasicHighlighting.replace(
    codeBlockRegex,
    (codeBlock: string, lang: string, code: string) => {
      const highlightedCode = hljs.getLanguage(lang)
        ? hljs.highlight(code, { language: lang }).value
        : hljs.highlightAuto(code).value;
      return `<pre className="bg-gray-900 mt-2 p-2 rounded"><code class="hljs text-sm">${highlightedCode}</code></pre>`;
    }
  );
};

export const isImageLink = (text: string) => {
  const regex = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|jpeg|gif|png|webp)/;
  return regex.test(text);
};

export const wrapURLsInAnchorTag = (text: string) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  const escapedText = escapePHPCodeBlocks(text);
  const highlightedText = applySyntaxHighlighting(escapedText);
  const sanitizedText = DOMPurify.sanitize(highlightedText);
  return sanitizedText.replace(urlRegex, (url: string) => {
    const href = url.startsWith("http") ? url : `http://${url}`;

    if (url.startsWith(BASE_URL)) {
      const timestampParam = new URL(href).searchParams.get("timestamp");
      const contentURLParam = new URL(href).searchParams.get("contentURL");
      const watchWithMeButton = `
    <button data-url="${contentURLParam}" data-timestamp="${timestampParam}" className="watch-with-me-button inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
      <span className="mr-2 bg-color-green-500">Watch with me</span>
    </button>`;
      return watchWithMeButton;
    } else {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" className="text-blue-500">${url}</a>`;
    }
  });
};
