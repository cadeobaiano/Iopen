// Script para verificar as tabelas do Supabase
import { config } from 'dotenv';
import fetch from 'node-fetch';
config();

// Usando as variáveis de ambiente do arquivo .env
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Verificando tabelas do Supabase em:', supabaseUrl);

async function checkTables() {
  try {
    // Verificar tabela profiles
    const profilesResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('Tabela profiles status:', profilesResponse.status);
    if (profilesResponse.ok) {
      const data = await profilesResponse.json();
      console.log('Exemplo de registro em profiles:', data);
    }
    
    // Verificar tabela user_profiles se existir
    const userProfilesResponse = await fetch(`${supabaseUrl}/rest/v1/user_profiles?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('Tabela user_profiles status:', userProfilesResponse.status);
    if (userProfilesResponse.ok) {
      const data = await userProfilesResponse.json();
      console.log('Exemplo de registro em user_profiles:', data);
    }
    
    // Verificar tabela user_data se existir
    const userDataResponse = await fetch(`${supabaseUrl}/rest/v1/user_data?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.log('Tabela user_data status:', userDataResponse.status);
    if (userDataResponse.ok) {
      const data = await userDataResponse.json();
      console.log('Exemplo de registro em user_data:', data);
    }
    
    // Listar tabelas
    console.log('\nListando todas as tabelas...');
    const allTablesResponse = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
    if (allTablesResponse.ok) {
      const data = await allTablesResponse.json();
      console.log('Tabelas disponíveis:', Object.keys(data));
    } else {
      console.log('Não foi possível listar todas as tabelas:', allTablesResponse.status);
    }
    
  } catch (error) {
    console.error('Erro ao verificar tabelas:', error);
  }
}

checkTables(); 