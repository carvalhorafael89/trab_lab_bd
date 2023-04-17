CREATE DATABASE BDFILMES;
GO
USE BDFILMES;
GO

CREATE TABLE FILMES(
	ID INT PRIMARY KEY IDENTITY NOT NULL,
	TITULO VARCHAR(50) NOT NULL,
	GENERO VARCHAR(50) NOT NULL,
	ALUGADO CHAR CHECK (ALUGADO = 'S' OR ALUGADO = 'N')  DEFAULT 'N' NOT NULL,
	)
GO

CREATE TABLE CLIENTE(
	ID INT PRIMARY KEY IDENTITY NOT NULL,
	NOME VARCHAR(50) NOT NULL,
	IDADE VARCHAR CHECK (IDADE >= 18) NOT NULL,
	CPF INT CHECK (CPF LIKE '[0-9][0-9][0-9][.][0-9][0-9][0-9][.][0-9][0-9][0-9][-][0-9][0-9]') UNIQUE NOT NULL,
	TELEFONE INT NOT NULL,
	FILMES_ID INT FOREIGN KEY REFERENCES FILMES(ID)
	)
GO

--PROCADURE PARA CRIAR/ALTERAR TABELA
CREATE OR ALTER PROCEDURE SP_IN_FILME
@titulo varchar(50),
@genero varchar(50),
@alugado char
AS
DECLARE @TITULOFILME VARCHAR(50)
--verifico se o titulo do filme ja existe
IF EXISTS (SELECT * FROM FILMES WHERE TITULO = @titulo)
  BEGIN
	SELECT @TITULOFILME = COUNT(SP_VER_FILME)
	FROM FILMES
	WHERE SP_VER_FILME = @TITULOFILME
  END
  ELSE
  BEGIN
  	RAISERROR ('O FILME NAO EXISTE NA TABELA.', 15, 1)
	RETURN
	END
  --FIM DA PROCEDURE
GO

EXEC SP_IN_FILME 'A VOLTA DOS QUE NAO FORAM', 'DRAMA', 'N'


--VER FILMES
CREATE OR ALTER PROCEDURE SP_VER_FILMES
SELECT * FROM FILMES
END
GO