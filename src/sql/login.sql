/*
Criando o usuário com limitações de acesso ao SGBD
O acesso do usuário será apenas de conectar no BD e executar as procedures.
Verifique em Propriedades da Conexão se o acesso é permitido via usuário SQL.
*/
USE MASTER
GO

--DROP LOGIN Labbd;
CREATE LOGIN rafae WITH PASSWORD = 090313;
GO

GRANT CONNECT SQL TO rafae;
GO

USE bdfilmes
GO

--DROP USER Labbd
CREATE USER rafae FOR LOGIN rafae;
GO

GRANT EXECUTE ON bdfilmes.dbo.SP_IN_FILME TO rafae;
GRANT EXECUTE ON bdfilmes.dbo.SP_VER_FILME TO rafae;
GO