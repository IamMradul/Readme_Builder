export interface MarkdownComponent {
  id: string;
  name: string;
  category: 'layout' | 'typography' | 'interactive' | 'media';
  markdown: string;
}

export const COMPONENTS_LIBRARY: MarkdownComponent[] = [
  // Layout
  {
    id: 'c-table-2col',
    name: '2-Column Table',
    category: 'layout',
    markdown: `| Column 1 | Column 2 |\n| :--- | :--- |\n| Content 1 | Content 2 |\n| Content 3 | Content 4 |`
  },
  {
    id: 'c-accordion',
    name: 'Accordion (Details)',
    category: 'interactive',
    markdown: `<details>\n<summary>Click to expand</summary>\n\nHere is the hidden content!\n\n</details>`
  },
  {
    id: 'c-quote',
    name: 'Blockquote',
    category: 'typography',
    markdown: `> "The best way to predict the future is to invent it."\n> — Alan Kay`
  },
  {
    id: 'c-code-block',
    name: 'Code Block with Syntax',
    category: 'typography',
    markdown: `\`\`\`javascript\nfunction helloWorld() {\n  console.log("Hello, world!");\n}\n\`\`\``
  },
  {
    id: 'c-img-center',
    name: 'Centered Image',
    category: 'media',
    markdown: `<p align="center">\n  <img src="https://via.placeholder.com/400x200" alt="Placeholder Image" />\n</p>`
  },
  {
    id: 'c-hr-fancy',
    name: 'Fancy Divider',
    category: 'layout',
    markdown: `<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />`
  },
  {
    id: 'c-alert-note',
    name: 'GitHub Alert (Note)',
    category: 'typography',
    markdown: `> [!NOTE]\n> Useful information that users should know, even when skimming content.`
  },
  {
    id: 'c-alert-warning',
    name: 'GitHub Alert (Warning)',
    category: 'typography',
    markdown: `> [!WARNING]\n> Urgent info that needs immediate user attention to avoid problems.`
  },
  {
    id: 'c-align-center',
    name: 'Center Aligned Text',
    category: 'typography',
    markdown: `<div align="center">\n\n### Center Title\nThis text is centered.\n\n</div>`
  }
];
