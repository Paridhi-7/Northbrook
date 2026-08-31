const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const productsDir = path.join(publicDir, 'products');
const collectionsDir = path.join(publicDir, 'collections');

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(collectionsDir, { recursive: true });

// Colour palette
const colors = {
  charcoal: '#2D2D2D',
  rust: '#B7472A',
  cream: '#F5F0E8',
  warmbeige: '#E8DFD4',
  earthBrown: '#8B6F47',
  sage: '#7A8B6F',
  offwhite: '#FAF8F5',
  blush: '#E8B4B8',
  navy: '#1B2A4A',
};

function createProductSVG(name, bgAccent, patternType) {
  // Simple knitwear-pattern SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.cream};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.warmbeige};stop-opacity:1" />
    </linearGradient>
    <pattern id="knit" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
      <rect width="40" height="40" fill="none"/>
      <path d="M0 20 Q10 10 20 20 Q30 30 40 20" stroke="${bgAccent}" stroke-width="0.8" fill="none" opacity="0.15"/>
      <path d="M0 0 Q10 10 20 0 Q30 -10 40 0" stroke="${bgAccent}" stroke-width="0.5" fill="none" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="600" height="800" fill="url(#bg)"/>
  <rect width="600" height="800" fill="url(#knit)"/>
  <!-- Hanger shape -->
  <g transform="translate(300,200)" opacity="0.12">
    <path d="M-80 80 Q-80 -40 0 -80 Q80 -40 80 80" stroke="${bgAccent}" stroke-width="4" fill="none"/>
    <circle cx="0" cy="-100" r="8" fill="${bgAccent}"/>
    <line x1="0" y1="-92" x2="0" y2="-80" stroke="${bgAccent}" stroke-width="4"/>
  </g>
  <!-- Garment silhouette -->
  <g transform="translate(300,350)" opacity="0.08">
    <ellipse cx="0" cy="0" rx="140" ry="180" fill="${bgAccent}"/>
  </g>
  <!-- Brand label -->
  <rect x="225" y="480" width="150" height="30" rx="2" fill="${bgAccent}" opacity="0.12"/>
  <text x="300" y="500" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="${bgAccent}" opacity="0.5" letter-spacing="3">NORTHBOOK</text>
  <!-- Product name -->
  <text x="300" y="560" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" fill="${bgAccent}" opacity="0.35" letter-spacing="1">${name}</text>
  <text x="300" y="590" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" fill="${bgAccent}" opacity="0.25" letter-spacing="2">PLACEHOLDER IMAGE</text>
</svg>`;
  return svg;
}

function createCollectionSVG(title, bgAccent) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.warmbeige};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.cream};stop-opacity:1" />
    </linearGradient>
    <pattern id="cable" patternUnits="userSpaceOnUse" width="60" height="60">
      <rect width="60" height="60" fill="none"/>
      <path d="M15 0 C15 20 45 20 45 40 C45 60 15 60 15 80" stroke="${bgAccent}" stroke-width="0.6" fill="none" opacity="0.1"/>
      <path d="M30 0 C30 20 0 20 0 40 C0 60 30 60 30 80" stroke="${bgAccent}" stroke-width="0.4" fill="none" opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect width="800" height="1000" fill="url(#cable)"/>
  <!-- Texture circles -->
  <circle cx="200" cy="300" r="120" fill="${bgAccent}" opacity="0.04"/>
  <circle cx="600" cy="700" r="160" fill="${bgAccent}" opacity="0.04"/>
  <!-- Title -->
  <text x="400" y="460" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="${bgAccent}" opacity="0.2" letter-spacing="6">${title.toUpperCase()}</text>
  <line x1="300" y1="490" x2="500" y2="490" stroke="${bgAccent}" stroke-width="1" opacity="0.15"/>
  <text x="400" y="530" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="12" fill="${bgAccent}" opacity="0.2" letter-spacing="3">COLLECTION IMAGE</text>
</svg>`;
  return svg;
}

// Product image configs
const productImages = [
  { file: 'mens-crewneck.jpg', name: 'Heritage Wool Crewneck', accent: colors.charcoal },
  { file: 'mens-rollneck.jpg', name: 'Ribbed Roll Neck', accent: colors.navy },
  { file: 'mens-quarterzip.jpg', name: 'Merino Quarter-Zip', accent: colors.earthBrown },
  { file: 'mens-cardigan.jpg', name: 'Cable Knit Cardigan', accent: colors.warmbeige },
  { file: 'mens-henley.jpg', name: 'Brushed Cotton Henley', accent: colors.sage },
  { file: 'mens-vneck.jpg', name: 'Lambswool V-Neck', accent: colors.charcoal },
  { file: 'womens-pullover.jpg', name: 'Cashmere Blend Pullover', accent: colors.blush },
  { file: 'womens-turtleneck.jpg', name: 'Chunky Knit Turtleneck', accent: colors.rust },
  { file: 'womens-wrap.jpg', name: 'Merino Wrap Cardigan', accent: colors.earthBrown },
  { file: 'womens-boatneck.jpg', name: 'Alpaca Boatneck', accent: colors.sage },
  { file: 'womens-dress.jpg', name: 'Ribbed Knit Dress', accent: colors.rust },
  { file: 'womens-crewneck.jpg', name: 'Lambswool Crewneck', accent: colors.charcoal },
];

// Collection images
const collectionImages = [
  { file: 'mens-collection.jpg', name: "Men's Collection", accent: colors.charcoal },
  { file: 'womens-collection.jpg', name: "Women's Collection", accent: colors.rust },
];

// Generate product SVGs (save as .svg for now, will be used as placeholders)
productImages.forEach(({ file, name, accent }) => {
  const svgFile = file.replace('.jpg', '.svg');
  const svg = createProductSVG(name, accent);
  fs.writeFileSync(path.join(productsDir, svgFile), svg);
  console.log(`Created: products/${svgFile}`);
});

// Also create .jpg versions as copies of the SVG for paths that reference .jpg
// (SVGs won't work as <img> backgrounds without proper setup, so we keep the
// placeholder-img div approach, but also create the files so /products/*.jpg exists)
productImages.forEach(({ file, name, accent }) => {
  const svgFile = file.replace('.jpg', '.svg');
  const svgPath = path.join(productsDir, svgFile);
  const jpgPath = path.join(productsDir, file);
  // Copy SVG content to .jpg path (browsers handle SVG content-type)
  const svg = createProductSVG(name, accent);
  fs.writeFileSync(jpgPath, svg);
  console.log(`Created: products/${file}`);
});

collectionImages.forEach(({ file, name, accent }) => {
  const svg = createCollectionSVG(name, accent);
  const svgFile = file.replace('.jpg', '.svg');
  fs.writeFileSync(path.join(collectionsDir, svgFile), svg);
  fs.writeFileSync(path.join(collectionsDir, file), svg);
  console.log(`Created: collections/${file}`);
});

// Hero image
const heroSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="hbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#E8DFD4;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#D4C5B3;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#F5F0E8;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#hbg)"/>
  <!-- Large knit texture -->
  <g opacity="0.06">
    ${Array.from({length: 20}, (_, i) => 
      `<path d="M${i * 100} 0 Q${i * 100 + 50} 200 ${i * 100} 400 Q${i * 100 - 50} 600 ${i * 100} 800 Q${i * 100 + 50} 1000 ${i * 100} 1200" stroke="#8B6F47" stroke-width="2" fill="none"/>`
    ).join('\n    ')}
  </g>
  <text x="960" y="540" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="#8B6F47" opacity="0.15" letter-spacing="10">NORTHBOOK</text>
  <text x="960" y="590" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="14" fill="#8B6F47" opacity="0.1" letter-spacing="5">HERO IMAGE PLACEHOLDER</text>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'hero.svg'), heroSVG);
console.log('Created: hero.svg');

// Workshop image
const workshopSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="wbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F5F0E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#E8DFD4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#wbg)"/>
  <g transform="translate(400,350)" opacity="0.08">
    <ellipse cx="0" cy="0" rx="200" ry="250" fill="#8B6F47"/>
  </g>
  <text x="400" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="24" fill="#8B6F47" opacity="0.15" letter-spacing="5">WORKSHOP</text>
  <text x="400" y="430" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" fill="#8B6F47" opacity="0.1" letter-spacing="3">PLACEHOLDER IMAGE</text>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'workshop.svg'), workshopSVG);
console.log('Created: workshop.svg');

console.log('\n✅ All placeholder images generated!');
