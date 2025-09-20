const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Source and output directories
const templatesDir = path.join(__dirname, 'src', 'templates');
const outputDir = path.join(__dirname, 'dist');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configure Nunjucks to use templates folder
nunjucks.configure(templatesDir, { autoescape: true });

// Function to render each template file recursively
function renderTemplates(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renderTemplates(fullPath); // Recursive for subfolders
    } else if (file.endsWith('.njk')) {
      const relativePath = path.relative(templatesDir, fullPath);
      const outputPath = path.join(outputDir, relativePath.replace('.njk', '.html'));

      // Ensure folder exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Render template
      const rendered = nunjucks.render(relativePath);
      fs.writeFileSync(outputPath, rendered);
      console.log(`Rendered: ${outputPath}`);
    }
  });
}

renderTemplates(templatesDir);
console.log('All templates compiled!');
