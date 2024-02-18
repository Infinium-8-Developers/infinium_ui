const fs = require('fs');

// Обновление времени сборки
const buildTime = new Date().toISOString();
console.log('Build time:', buildTime);

// Чтение файла main.ts
const mainFilePath = 'src/main.ts';
let mainFileContent = fs.readFileSync(mainFilePath, 'utf8');

// Замена времени сборки в файле main.ts
mainFileContent = mainFileContent.replace(/const buildTime = .*/, `const buildTime = '${buildTime}';`);

// Запись изменений в файл main.ts
fs.writeFileSync(mainFilePath, mainFileContent);
