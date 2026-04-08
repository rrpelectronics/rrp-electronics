const fs = require('fs');

async function run() {
  const data = await fetch('http://localhost:3000/api/migrate-assets').then(r => r.json());
  fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
}

run();
