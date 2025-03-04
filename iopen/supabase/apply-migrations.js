// Script para aplicar migrações no Supabase
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verifica se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devem estar definidas no arquivo .env');
  process.exit(1);
}

// Diretório de migrações
const migrationsDir = path.join(__dirname, 'migrations');

// Verifica se o diretório existe
if (!fs.existsSync(migrationsDir)) {
  console.error(`Erro: O diretório de migrações não existe: ${migrationsDir}`);
  process.exit(1);
}

// Obtém a lista de arquivos de migração
const migrationFiles = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))
  .sort(); // Ordena os arquivos por nome

if (migrationFiles.length === 0) {
  console.error('Nenhum arquivo de migração encontrado.');
  process.exit(1);
}

console.log(`Encontrados ${migrationFiles.length} arquivos de migração.`);

// Aplica cada migração
migrationFiles.forEach(file => {
  const filePath = path.join(migrationsDir, file);
  console.log(`Aplicando migração: ${file}`);
  
  try {
    // Lê o conteúdo do arquivo SQL
    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Cria um arquivo temporário para o comando curl
    const tempFile = path.join(__dirname, 'temp.sql');
    fs.writeFileSync(tempFile, sql);
    
    // Executa o comando curl para aplicar a migração
    const command = `curl -X POST "${supabaseUrl}/rest/v1/rpc/exec_sql" -H "apikey: ${supabaseKey}" -H "Authorization: Bearer ${supabaseKey}" -H "Content-Type: application/json" -d @${tempFile}`;
    
    execSync(command, { stdio: 'inherit' });
    
    // Remove o arquivo temporário
    fs.unlinkSync(tempFile);
    
    console.log(`Migração aplicada com sucesso: ${file}`);
  } catch (error) {
    console.error(`Erro ao aplicar migração ${file}:`, error.message);
    process.exit(1);
  }
});

console.log('Todas as migrações foram aplicadas com sucesso!');
