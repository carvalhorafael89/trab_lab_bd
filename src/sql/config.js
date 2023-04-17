import dotenv from 'dotenv/config'

export const sqlConfig = {
  user: 'rafae',
  password: '090313',
  server: 'localhost\SQLEXPRESS',
  database: 'bdfilmes',
  port: '1433',
  options: {
      encrypt: true,
      trustServerCertificate: true,
      ssl: false // Desabilita a validação do certificado SSL
    }
}