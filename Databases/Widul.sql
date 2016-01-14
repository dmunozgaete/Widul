USE [master]
GO
/****** Object:  Database [Widul]    Script Date: 13/01/2016 22:11:11 ******/
CREATE DATABASE [Widul]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Widul', FILENAME = N'C:\Databases\Widul.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Widul_log', FILENAME = N'C:\Databases\Widul_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Widul] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Widul].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Widul] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Widul] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Widul] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Widul] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Widul] SET ARITHABORT OFF 
GO
ALTER DATABASE [Widul] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Widul] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [Widul] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Widul] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Widul] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Widul] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Widul] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Widul] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Widul] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Widul] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Widul] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Widul] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Widul] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Widul] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Widul] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Widul] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Widul] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Widul] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Widul] SET RECOVERY FULL 
GO
ALTER DATABASE [Widul] SET  MULTI_USER 
GO
ALTER DATABASE [Widul] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Widul] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Widul] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Widul] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Widul', N'ON'
GO
USE [Widul]
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_Event]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Widul
-- Create date: 2016-01-13
-- Description:	Get Event Details
-- =============================================
CREATE PROCEDURE [dbo].[SP_GET_Event]
	@EVN_Token	 UNIQUEIDENTIFIER
AS
BEGIN
	DECLARE @EVN_Id	INT = dbo.FN_GET_EVN_Id(@EVN_Token);
	DECLARE @USR_Id INT;
	DECLARE @KNW_Id INT;

	------------------------------------------------------
	-- GET ID
	SELECT 
		@USR_Id = EVN.EVN_USR_Id,
		@KNW_Id = EVN.EVN_KNW_Id
	FROM 
		TB_Event		EVN	
	WHERE
		EVN.EVN_Id = @EVN_Id


	------------------------------------------------------
	-- GET EVENT DETAILS
	SELECT 
		EVN_Name
		,EVN_Description
		,EVN_Date
		,EVN_Location
		,EVN_UpdatedAt
		,EVN_CreatedAt
		,EVN_Token
		,EVT.EVT_Name
	FROM 
		TB_Event		EVN	INNER JOIN
		TB_EventType	EVT ON EVT.EVT_Id = EVN.EVN_EVT_Id
	WHERE
		EVN.EVN_Id = @EVN_Id

	------------------------------------------------------
	-- GET EVENT CREATOR
	SELECT 
		USR.USR_CreatedAt,
		USR.USR_Email,
		USR.USR_FullName,
		USR.USR_Token,
		USR.USR_UpdateAt
	FROM 
		TB_User  USR
	WHERE
		USR.USR_Id = @USR_Id;

	------------------------------------------------------
	-- GET KNOWLEDGE
	SELECT 
		KWN.KNW_Name,
		KWN.KNW_Token
	FROM 
		TB_Knowledge  KWN
	WHERE
		KWN.KNW_Id = @KNW_Id;

	------------------------------------------------------
	-- GET EVENT COMMENTS
	SELECT 
		COM.COM_Comment,
		COM.COM_createdAt,
		COM.COM_Token
	FROM 
		TB_EventComment  COM
	WHERE
		COM.COM_EVN_Id = @EVN_Id;

	------------------------------------------------------
	-- GET EVENT TAGS
	SELECT 
		TAG.TAG_Name,
		TAG.TAG_Token
	FROM 
		TB_EventTag  TAG
	WHERE
		TAG.TAG_EVN_Id = @EVN_Id;


END

GO
/****** Object:  StoredProcedure [dbo].[SP_INS_Error]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =================================================================
-- Author:		David Antonio Muñoz Gaete
-- Create date: 2015.06.07
-- Description:	Registra un error producido por la ejecución de 
--				algún script o sentencia SQL
-- =================================================================
CREATE PROCEDURE [dbo].[SP_INS_Error] 
	 --@ENTI_Token	UNIQUEIDENTIFIER,
	 @ELOG_Tipo		VARCHAR(200)	= NULL,
	 @ELOG_Pila		VARCHAR(8000)	= NULL
AS
BEGIN
	DECLARE @ERROR_MESSAGE	NVARCHAR(4000) = ERROR_MESSAGE();
	DECLARE @THROWEX		BIT = 0;

	--------------------------------------------------------
	IF(@ELOG_Pila IS NULL)	-- EXCEPCIÓN POR ALGUN PROCEDIMIENTO INTERNO (DB)
		BEGIN	
			SET @ELOG_Tipo = 'DBERROR';
			SET @ELOG_Pila = ERROR_PROCEDURE() + ': ' + @ERROR_MESSAGE;
			SET @THROWEX = 1;
		END
	--------------------------------------------------------
	
	--------------------------------------------------------
	IF(@THROWEX = 1) -- EXCEPCIÓN POR ALGUN PROCEDIMIENTO INTERNO (DB)
		BEGIN
			DECLARE @ERROR_SEVERITY INT = ERROR_SEVERITY();
			DECLARE @ERROR_STATE	INT = ERROR_STATE();

			RAISERROR (
				@ERROR_MESSAGE,		-- Message text.
				@ERROR_SEVERITY,	-- Severity.
				@ERROR_STATE		-- State.
			);
		END
	--------------------------------------------------------

	
END






GO
/****** Object:  StoredProcedure [dbo].[SP_INS_Event]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Widul
-- Create date: 2016-01-13
-- Description:	Get Event Details
-- =============================================
CREATE PROCEDURE [dbo].[SP_INS_Event]
	@USR_Token			UNIQUEIDENTIFIER,
	@KNW_Token			UNIQUEIDENTIFIER,
	@EVT_Token			UNIQUEIDENTIFIER,

	@EVN_Date			DATETIME		= NULL,
	@EVN_Location		VARCHAR(500)	= NULL,
	@EVN_Description	VARCHAR(500),
	@EVN_Name			VARCHAR(200),
	@TAGS				VARCHAR(8000)
AS
BEGIN
	DECLARE @USR_Id	INT = dbo.FN_GET_USR_Id(@USR_Token);
	DECLARE @KNW_Id	INT = dbo.FN_GET_KNW_Id(@KNW_Token);
	DECLARE @EVT_Id	INT = dbo.FN_GET_EVT_Id(@EVT_Token);
	DECLARE @TRAN	VARCHAR = 'EVENT_CREATE';

	------------------------------------------------------
	BEGIN TRAN @TRAN
		BEGIN TRY
		
			------------------------------------------------------
			-- INSERT NEW EVENT
			INSERT INTO TB_Event 
			(
				EVN_EVT_Id,
				EVN_KNW_Id,
				EVN_USR_Id,
				EVN_Date, 
				EVN_Description,
				EVN_Location,
				EVN_Name
			) VALUES (
				@EVT_Id,
				@KNW_Id,
				@USR_Id,
				@EVN_Date,
				@EVN_Description,
				@EVN_Location,
				@EVN_Name
			)
			------------------------------------------------------

			DECLARE @EVN_Id INT = SCOPE_IDENTITY();

			------------------------------------------------------
			-- ASSOCIATE TAG TO THE NEW EVENT
			INSERT INTO TB_EventTag
			( 
				TAG_EVN_id,
				TAG_Name
			)
			SELECT
				@EVN_Id,
				TAGS.s
			FROM
				FN_SPLIT(',',@TAGS) TAGS
			------------------------------------------------------

			COMMIT TRANSACTION @TRAN

		END TRY
		BEGIN CATCH

			--------------------------------------------------------
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION @TRAN
			--------------------------------------------------------

			--------------------------------------------------------
			EXECUTE SP_INS_Error
			--------------------------------------------------------

		END CATCH
	------------------------------------------------------

END

GO
/****** Object:  UserDefinedFunction [dbo].[FN_GET_EVN_Id]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =================================================================
-- Author:		WIDUL TEAM
-- Create date: 2016.01.13
-- Description:	GET id from the event token
-- =================================================================
CREATE FUNCTION [dbo].[FN_GET_EVN_Id]
(
	@EVN_Token	UNIQUEIDENTIFIER
)
RETURNS INT
AS
BEGIN
	DECLARE @EVN_Id INT;
	
	SELECT
		@EVN_Id = EVN.EVN_id 
	FROM
		TB_Event	EVN
	WHERE
		EVN.EVN_Token = @EVN_Token;
		
		
	RETURN @EVN_Id
END





















GO
/****** Object:  UserDefinedFunction [dbo].[FN_GET_EVT_Id]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =================================================================
-- Author:		WIDUL TEAM
-- Create date: 2016.01.13
-- Description:	GET id from the event token
-- =================================================================
CREATE FUNCTION [dbo].[FN_GET_EVT_Id]
(
	@EVT_Token	UNIQUEIDENTIFIER
)
RETURNS INT
AS
BEGIN
	DECLARE @EVT_Id INT;
	
	SELECT
		@EVT_Id = EVT.EVT_id 
	FROM
		TB_EventType	EVT
	WHERE
		EVT.EVT_Token = @EVT_Token;
		
		
	RETURN @EVT_Id
END





















GO
/****** Object:  UserDefinedFunction [dbo].[FN_GET_KNW_Id]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =================================================================
-- Author:		WIDUL TEAM
-- Create date: 2016.01.13
-- Description:	GET id from the event token
-- =================================================================
CREATE FUNCTION [dbo].[FN_GET_KNW_Id]
(
	@KNW_Token	UNIQUEIDENTIFIER
)
RETURNS INT
AS
BEGIN
	DECLARE @KNW_Id INT;
	
	SELECT
		@KNW_Id = KNW.KNW_id 
	FROM
		TB_Knowledge	KNW
	WHERE
		KNW.KNW_Token = @KNW_Token;
		
		
	RETURN @KNW_Id
END





















GO
/****** Object:  UserDefinedFunction [dbo].[FN_GET_USR_Id]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =================================================================
-- Author:		WIDUL TEAM
-- Create date: 2016.01.13
-- Description:	GET id from the event token
-- =================================================================
CREATE FUNCTION [dbo].[FN_GET_USR_Id]
(
	@USR_Token	UNIQUEIDENTIFIER
)
RETURNS INT
AS
BEGIN
	DECLARE @USR_Id INT;
	
	SELECT
		@USR_Id = USR.USR_id 
	FROM
		TB_User	USR
	WHERE
		USR.USR_Token = @USR_Token;
		
		
	RETURN @USR_Id
END





















GO
/****** Object:  Table [dbo].[TB_Event]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_Event](
	[EVN_Id] [int] IDENTITY(1,1) NOT NULL,
	[EVN_KNW_Id] [int] NOT NULL,
	[EVN_EVT_Id] [int] NOT NULL,
	[EVN_USR_Id] [int] NOT NULL,
	[EVN_Name] [varchar](200) NOT NULL,
	[EVN_Description] [varchar](500) NOT NULL,
	[EVN_Date] [datetime] NULL,
	[EVN_Location] [varchar](500) NULL,
	[EVN_UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_Event_EVN_UpdatedAt]  DEFAULT (getdate()),
	[EVN_CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_Event_EVN_CreatedAt]  DEFAULT (getdate()),
	[EVN_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_Event_EVN_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_Event] PRIMARY KEY CLUSTERED 
(
	[EVN_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_EventComment]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_EventComment](
	[COM_Id] [int] IDENTITY(1,1) NOT NULL,
	[COM_EVN_Id] [int] NOT NULL,
	[COM_Comment] [varchar](500) NOT NULL,
	[COM_createdAt] [datetime] NOT NULL CONSTRAINT [DF_TB_EventComment_COM_createdAt]  DEFAULT (getdate()),
	[COM_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_EventComment_COM_Token]  DEFAULT (newid())
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_EventTag]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_EventTag](
	[TAG_Id] [int] IDENTITY(1,1) NOT NULL,
	[TAG_EVN_id] [int] NOT NULL,
	[TAG_Name] [varchar](50) NOT NULL,
	[TAG_UpdatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_EventTag_TAG_UpdatedAt]  DEFAULT (getdate()),
	[TAG_CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_EventTag_TAG_CreatedAt]  DEFAULT (getdate()),
	[TAG_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_EventTag_TAG_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_EventTag] PRIMARY KEY CLUSTERED 
(
	[TAG_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_EventType]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_EventType](
	[EVT_Id] [int] IDENTITY(1,1) NOT NULL,
	[EVT_Name] [varchar](50) NOT NULL,
	[EVT_Code] [char](4) NOT NULL,
	[EVT_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_EventType_EVT_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_EventType] PRIMARY KEY CLUSTERED 
(
	[EVT_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_ExternalAutenticator]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_ExternalAutenticator](
	[EXA_Id] [int] IDENTITY(1,1) NOT NULL,
	[EXA_Name] [varchar](50) NOT NULL,
	[EXA_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_ExternalAutenticator_EXA_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_ExternalAutenticator] PRIMARY KEY CLUSTERED 
(
	[EXA_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_Knowledge]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_Knowledge](
	[KNW_Id] [int] IDENTITY(1,1) NOT NULL,
	[KNW_Name] [varchar](50) NOT NULL,
	[KNW_CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_Knowledge_KNW_CreatedAt]  DEFAULT (getdate()),
	[KNW_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_Knowledge_KNW_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_Knowledge] PRIMARY KEY CLUSTERED 
(
	[KNW_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_KnowledgeRecommend]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_KnowledgeRecommend](
	[REC_USR_id] [int] NOT NULL,
	[REC_KNW_Id] [int] NOT NULL,
	[REC_USR_id_recommended] [int] NOT NULL,
 CONSTRAINT [PK_TB_KnowledgeRecommend_1] PRIMARY KEY CLUSTERED 
(
	[REC_USR_id] ASC,
	[REC_KNW_Id] ASC,
	[REC_USR_id_recommended] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TB_SocialCounter]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TB_SocialCounter](
	[SOC_USR_Id] [int] NOT NULL,
	[SOC_KNW_id] [int] NOT NULL,
	[SOC_Recommends] [int] NOT NULL,
 CONSTRAINT [PK_TB_SocialCounter_1] PRIMARY KEY CLUSTERED 
(
	[SOC_USR_Id] ASC,
	[SOC_KNW_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TB_User]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_User](
	[USR_Id] [int] IDENTITY(1,1) NOT NULL,
	[USR_FullName] [varchar](200) NOT NULL,
	[USR_Email] [varchar](100) NOT NULL,
	[USR_UpdateAt] [datetime] NOT NULL CONSTRAINT [DF_TB_User_USR_UpdateAt]  DEFAULT (getdate()),
	[USR_CreatedAt] [datetime] NOT NULL CONSTRAINT [DF_TB_User_USR_CreatedAt]  DEFAULT (getdate()),
	[USR_Token] [uniqueidentifier] NOT NULL CONSTRAINT [DF_TB_User_USR_Token]  DEFAULT (newid()),
 CONSTRAINT [PK_TB_User] PRIMARY KEY CLUSTERED 
(
	[USR_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TB_User_ExternalAutenticator]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TB_User_ExternalAutenticator](
	[USREXA_USR_id] [int] NOT NULL,
	[USREXA_EXA_id] [int] NOT NULL,
	[USREXA_ExternalIdentifier] [varchar](1000) NOT NULL,
 CONSTRAINT [PK_TB_User_ExternalAutenticator] PRIMARY KEY CLUSTERED 
(
	[USREXA_USR_id] ASC,
	[USREXA_EXA_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  UserDefinedFunction [dbo].[FN_SPLIT]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =================================================================
-- Author:		David Antonio Muñoz Gaete
-- Create date: 2015.06.07
-- Description:	Separa una línea de caracteres de acuerdo al 
--				caracter definido por el usuario (SPLIT)
-- =================================================================
CREATE FUNCTION [dbo].[FN_SPLIT] (
	@SEPARATOR	CHAR(1), 
	@DATA		VARCHAR(8000)
)
RETURNS TABLE
AS
RETURN (
    WITH Pieces(pn, start, stop)  AS  (
      SELECT 1, 1, CHARINDEX(@SEPARATOR, @DATA)
      UNION ALL
      SELECT pn + 1, stop + 1, CHARINDEX(@SEPARATOR, @DATA, stop + 1) 
      FROM Pieces 
      WHERE stop > 0 
    ) 
 
    SELECT 
		pn,
		SUBSTRING(@DATA, start, CASE WHEN stop > 0 THEN stop-start ELSE 512 END) AS s
    FROM 
		Pieces

  )




















GO
/****** Object:  View [dbo].[VW_Events]    Script Date: 13/01/2016 22:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_Events]
AS

	SELECT 
		-- Event
		EVN.EVN_Id,
		EVN.EVN_Date,
		EVN.EVN_CreatedAt,
		EVN.EVN_Description,
		EVN.EVN_Location,
		EVN.EVN_Name,
		EVN.EVN_UpdatedAt,
		EVN.EVN_Token,
		-- Event Type
		EVT.EVT_Name,
		EVT.EVT_Token,
		-- User 
		USR.USR_FullName,
		USR.USR_Token,
		-- Knowledge
		KNW.KNW_Name,
		KNW.KNW_Token
	FROM 
		TB_Event		EVN INNER JOIN
		TB_EventType	EVT ON EVT.EVT_Id = EVN.EVN_EVT_Id	INNER JOIN
		TB_User			USR ON USR.USR_Id = EVN.EVN_USR_Id	INNER JOIN
		TB_Knowledge	KNW ON KNW.KNW_Id = EVN.EVN_KNW_Id



GO
SET IDENTITY_INSERT [dbo].[TB_Event] ON 

INSERT [dbo].[TB_Event] ([EVN_Id], [EVN_KNW_Id], [EVN_EVT_Id], [EVN_USR_Id], [EVN_Name], [EVN_Description], [EVN_Date], [EVN_Location], [EVN_UpdatedAt], [EVN_CreatedAt], [EVN_Token]) VALUES (1, 1, 1, 1, N'Cerro Manquehue', N'Subida al cerror manquhue', CAST(N'2016-01-13 00:00:00.000' AS DateTime), N'Cerro Manquehue', CAST(N'2016-01-13 18:58:30.557' AS DateTime), CAST(N'2016-01-13 18:58:30.557' AS DateTime), N'e3470b30-668d-419a-a693-56967d469965')
INSERT [dbo].[TB_Event] ([EVN_Id], [EVN_KNW_Id], [EVN_EVT_Id], [EVN_USR_Id], [EVN_Name], [EVN_Description], [EVN_Date], [EVN_Location], [EVN_UpdatedAt], [EVN_CreatedAt], [EVN_Token]) VALUES (4, 1, 3, 1, N'E', N'D', CAST(N'2016-01-14 00:43:34.367' AS DateTime), N'N', CAST(N'2016-01-13 21:50:01.270' AS DateTime), CAST(N'2016-01-13 21:50:01.270' AS DateTime), N'a83fd235-fa49-41c7-a12f-4e331ccac1b7')
INSERT [dbo].[TB_Event] ([EVN_Id], [EVN_KNW_Id], [EVN_EVT_Id], [EVN_USR_Id], [EVN_Name], [EVN_Description], [EVN_Date], [EVN_Location], [EVN_UpdatedAt], [EVN_CreatedAt], [EVN_Token]) VALUES (5, 1, 3, 1, N'Evento Prueba 2', N'Descripion', NULL, N'Nueva Lyon 96', CAST(N'2016-01-13 21:52:56.553' AS DateTime), CAST(N'2016-01-13 21:52:56.553' AS DateTime), N'06421583-d7bb-4b21-a33b-0af38aa30179')
SET IDENTITY_INSERT [dbo].[TB_Event] OFF
SET IDENTITY_INSERT [dbo].[TB_EventComment] ON 

INSERT [dbo].[TB_EventComment] ([COM_Id], [COM_EVN_Id], [COM_Comment], [COM_createdAt], [COM_Token]) VALUES (1, 1, N'qwdqwdqwdqwd', CAST(N'2016-01-13 19:38:42.760' AS DateTime), N'67fa38d6-b4e8-4677-8f1c-2d633f199e00')
INSERT [dbo].[TB_EventComment] ([COM_Id], [COM_EVN_Id], [COM_Comment], [COM_createdAt], [COM_Token]) VALUES (2, 1, N'Hola !', CAST(N'2016-01-13 19:38:50.800' AS DateTime), N'053599cf-5c6f-4812-9263-682d55618251')
INSERT [dbo].[TB_EventComment] ([COM_Id], [COM_EVN_Id], [COM_Comment], [COM_createdAt], [COM_Token]) VALUES (3, 1, N'hola Munod !', CAST(N'2016-01-13 19:38:56.753' AS DateTime), N'da4c871e-e3e2-4056-b0d0-5541f6920100')
INSERT [dbo].[TB_EventComment] ([COM_Id], [COM_EVN_Id], [COM_Comment], [COM_createdAt], [COM_Token]) VALUES (4, 1, N'kdh', CAST(N'2016-01-13 19:38:59.567' AS DateTime), N'9b136477-7e25-4700-b022-7a4e07942868')
SET IDENTITY_INSERT [dbo].[TB_EventComment] OFF
SET IDENTITY_INSERT [dbo].[TB_EventTag] ON 

INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (1, 1, N'cerro', CAST(N'2016-01-13 19:39:20.943' AS DateTime), CAST(N'2016-01-13 19:39:20.943' AS DateTime), N'52a754c9-9966-4187-8551-25cccd1d6e41')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (2, 1, N'paseo', CAST(N'2016-01-13 19:39:25.743' AS DateTime), CAST(N'2016-01-13 19:39:25.743' AS DateTime), N'8fe289bc-f7f5-4ff0-8343-749cf28ebdd7')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (3, 1, N'outdoor', CAST(N'2016-01-13 19:39:28.713' AS DateTime), CAST(N'2016-01-13 19:39:28.713' AS DateTime), N'b7fdf634-b6cd-47f0-9862-850e605e9a21')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (4, 1, N'airelibre', CAST(N'2016-01-13 19:39:31.010' AS DateTime), CAST(N'2016-01-13 19:39:31.010' AS DateTime), N'e3a43a6a-9422-4a89-bf7f-051cd8e1c653')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (5, 1, N'fitness', CAST(N'2016-01-13 19:39:34.867' AS DateTime), CAST(N'2016-01-13 19:39:34.867' AS DateTime), N'd6085ba4-bcea-476d-aeb7-48b90fa7c3d3')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (6, 1, N'vidasnaa', CAST(N'2016-01-13 19:39:38.180' AS DateTime), CAST(N'2016-01-13 19:39:38.180' AS DateTime), N'39dc9e8d-87c3-46cb-b532-70acae9da47f')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (7, 4, N'visansa', CAST(N'2016-01-13 21:50:01.273' AS DateTime), CAST(N'2016-01-13 21:50:01.273' AS DateTime), N'c3e04a2f-08d6-45f8-83de-e05bd69104c7')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (8, 4, N'ejemplo', CAST(N'2016-01-13 21:50:01.273' AS DateTime), CAST(N'2016-01-13 21:50:01.273' AS DateTime), N'49487671-9185-4856-988e-68194a57fbc9')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (9, 4, N'tag2', CAST(N'2016-01-13 21:50:01.273' AS DateTime), CAST(N'2016-01-13 21:50:01.273' AS DateTime), N'6278174a-e2c7-4bf6-8864-22a1cbaa8c7d')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (10, 4, N'tag5', CAST(N'2016-01-13 21:50:01.273' AS DateTime), CAST(N'2016-01-13 21:50:01.273' AS DateTime), N'38df0546-2bb8-4ad0-9c83-f4d71e5e8b1b')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (11, 5, N'dwd', CAST(N'2016-01-13 21:52:56.553' AS DateTime), CAST(N'2016-01-13 21:52:56.553' AS DateTime), N'41c6afd7-6427-429c-8061-e8ced4e04e58')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (12, 5, N'ejemplo', CAST(N'2016-01-13 21:52:56.553' AS DateTime), CAST(N'2016-01-13 21:52:56.553' AS DateTime), N'2d642222-ae3d-4e8b-8ef9-d74b246accb5')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (13, 5, N'tag2', CAST(N'2016-01-13 21:52:56.553' AS DateTime), CAST(N'2016-01-13 21:52:56.553' AS DateTime), N'18c660e8-17d2-493b-8a82-c0acb2a1530a')
INSERT [dbo].[TB_EventTag] ([TAG_Id], [TAG_EVN_id], [TAG_Name], [TAG_UpdatedAt], [TAG_CreatedAt], [TAG_Token]) VALUES (14, 5, N'tag5', CAST(N'2016-01-13 21:52:56.553' AS DateTime), CAST(N'2016-01-13 21:52:56.553' AS DateTime), N'8ebdb606-cc8c-48c3-b914-a07e69c136b1')
SET IDENTITY_INSERT [dbo].[TB_EventTag] OFF
SET IDENTITY_INSERT [dbo].[TB_EventType] ON 

INSERT [dbo].[TB_EventType] ([EVT_Id], [EVT_Name], [EVT_Code], [EVT_Token]) VALUES (1, N'Uno a Uno', N'1to1', N'd11615d6-dc6d-4e7e-9539-e3afead960e5')
INSERT [dbo].[TB_EventType] ([EVT_Id], [EVT_Name], [EVT_Code], [EVT_Token]) VALUES (3, N'Uno a Muchos', N'1toN', N'592f2ae9-cf4d-4e40-ab54-f4faaf3130a3')
SET IDENTITY_INSERT [dbo].[TB_EventType] OFF
SET IDENTITY_INSERT [dbo].[TB_ExternalAutenticator] ON 

INSERT [dbo].[TB_ExternalAutenticator] ([EXA_Id], [EXA_Name], [EXA_Token]) VALUES (1, N'facebook', N'7b6e5e0d-0928-4c73-9f54-36ed11e1d470')
INSERT [dbo].[TB_ExternalAutenticator] ([EXA_Id], [EXA_Name], [EXA_Token]) VALUES (2, N'google', N'67ae4851-6f79-48e4-983c-6db94e41222f')
SET IDENTITY_INSERT [dbo].[TB_ExternalAutenticator] OFF
SET IDENTITY_INSERT [dbo].[TB_Knowledge] ON 

INSERT [dbo].[TB_Knowledge] ([KNW_Id], [KNW_Name], [KNW_CreatedAt], [KNW_Token]) VALUES (1, N'Trekking', CAST(N'2016-01-13 18:56:42.267' AS DateTime), N'17b93b6a-2031-43eb-a57e-bc69032c9644')
SET IDENTITY_INSERT [dbo].[TB_Knowledge] OFF
SET IDENTITY_INSERT [dbo].[TB_User] ON 

INSERT [dbo].[TB_User] ([USR_Id], [USR_FullName], [USR_Email], [USR_UpdateAt], [USR_CreatedAt], [USR_Token]) VALUES (1, N'Jhon Doe', N'dmunoz@pepe.cl', CAST(N'2016-01-13 18:56:11.293' AS DateTime), CAST(N'2016-01-13 18:56:11.293' AS DateTime), N'530d5df5-25cd-4343-9351-1bacfefb7896')
SET IDENTITY_INSERT [dbo].[TB_User] OFF
/****** Object:  Index [IX_TB_Event]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_Event] ON [dbo].[TB_Event]
(
	[EVN_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_TB_EventTag]    Script Date: 13/01/2016 22:11:11 ******/
CREATE NONCLUSTERED INDEX [IX_TB_EventTag] ON [dbo].[TB_EventTag]
(
	[TAG_Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TB_EventTag_1]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_EventTag_1] ON [dbo].[TB_EventTag]
(
	[TAG_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TB_EventType]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_EventType] ON [dbo].[TB_EventType]
(
	[EVT_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TB_ExternalAutenticator]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_ExternalAutenticator] ON [dbo].[TB_ExternalAutenticator]
(
	[EXA_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TB_Knowledge]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_Knowledge] ON [dbo].[TB_Knowledge]
(
	[KNW_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_TB_Knowledge_1]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_Knowledge_1] ON [dbo].[TB_Knowledge]
(
	[KNW_Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_TB_User]    Script Date: 13/01/2016 22:11:11 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_TB_User] ON [dbo].[TB_User]
(
	[USR_Token] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TB_Event]  WITH CHECK ADD  CONSTRAINT [FK_TB_Event_TB_EventType] FOREIGN KEY([EVN_EVT_Id])
REFERENCES [dbo].[TB_EventType] ([EVT_Id])
GO
ALTER TABLE [dbo].[TB_Event] CHECK CONSTRAINT [FK_TB_Event_TB_EventType]
GO
ALTER TABLE [dbo].[TB_Event]  WITH CHECK ADD  CONSTRAINT [FK_TB_Event_TB_Knowledge] FOREIGN KEY([EVN_KNW_Id])
REFERENCES [dbo].[TB_Knowledge] ([KNW_Id])
GO
ALTER TABLE [dbo].[TB_Event] CHECK CONSTRAINT [FK_TB_Event_TB_Knowledge]
GO
ALTER TABLE [dbo].[TB_Event]  WITH CHECK ADD  CONSTRAINT [FK_TB_Event_TB_User] FOREIGN KEY([EVN_USR_Id])
REFERENCES [dbo].[TB_User] ([USR_Id])
GO
ALTER TABLE [dbo].[TB_Event] CHECK CONSTRAINT [FK_TB_Event_TB_User]
GO
ALTER TABLE [dbo].[TB_EventComment]  WITH CHECK ADD  CONSTRAINT [FK_TB_EventComment_TB_Event] FOREIGN KEY([COM_EVN_Id])
REFERENCES [dbo].[TB_Event] ([EVN_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TB_EventComment] CHECK CONSTRAINT [FK_TB_EventComment_TB_Event]
GO
ALTER TABLE [dbo].[TB_EventTag]  WITH CHECK ADD  CONSTRAINT [FK_TB_EventTag_TB_Event] FOREIGN KEY([TAG_EVN_id])
REFERENCES [dbo].[TB_Event] ([EVN_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TB_EventTag] CHECK CONSTRAINT [FK_TB_EventTag_TB_Event]
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend]  WITH CHECK ADD  CONSTRAINT [FK_TB_KnowledgeRecommend_TB_Knowledge] FOREIGN KEY([REC_KNW_Id])
REFERENCES [dbo].[TB_Knowledge] ([KNW_Id])
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend] CHECK CONSTRAINT [FK_TB_KnowledgeRecommend_TB_Knowledge]
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend]  WITH CHECK ADD  CONSTRAINT [FK_TB_KnowledgeRecommend_TB_User] FOREIGN KEY([REC_USR_id])
REFERENCES [dbo].[TB_User] ([USR_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend] CHECK CONSTRAINT [FK_TB_KnowledgeRecommend_TB_User]
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend]  WITH CHECK ADD  CONSTRAINT [FK_TB_KnowledgeRecommend_TB_User1] FOREIGN KEY([REC_USR_id_recommended])
REFERENCES [dbo].[TB_User] ([USR_Id])
GO
ALTER TABLE [dbo].[TB_KnowledgeRecommend] CHECK CONSTRAINT [FK_TB_KnowledgeRecommend_TB_User1]
GO
ALTER TABLE [dbo].[TB_SocialCounter]  WITH CHECK ADD  CONSTRAINT [FK_TB_SocialCounter_TB_Knowledge] FOREIGN KEY([SOC_KNW_id])
REFERENCES [dbo].[TB_Knowledge] ([KNW_Id])
GO
ALTER TABLE [dbo].[TB_SocialCounter] CHECK CONSTRAINT [FK_TB_SocialCounter_TB_Knowledge]
GO
ALTER TABLE [dbo].[TB_SocialCounter]  WITH CHECK ADD  CONSTRAINT [FK_TB_SocialCounter_TB_User] FOREIGN KEY([SOC_USR_Id])
REFERENCES [dbo].[TB_User] ([USR_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TB_SocialCounter] CHECK CONSTRAINT [FK_TB_SocialCounter_TB_User]
GO
ALTER TABLE [dbo].[TB_User_ExternalAutenticator]  WITH CHECK ADD  CONSTRAINT [FK_TB_User_ExternalAutenticator_TB_ExternalAutenticator] FOREIGN KEY([USREXA_EXA_id])
REFERENCES [dbo].[TB_ExternalAutenticator] ([EXA_Id])
GO
ALTER TABLE [dbo].[TB_User_ExternalAutenticator] CHECK CONSTRAINT [FK_TB_User_ExternalAutenticator_TB_ExternalAutenticator]
GO
ALTER TABLE [dbo].[TB_User_ExternalAutenticator]  WITH CHECK ADD  CONSTRAINT [FK_TB_User_ExternalAutenticator_TB_User] FOREIGN KEY([USREXA_USR_id])
REFERENCES [dbo].[TB_User] ([USR_Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[TB_User_ExternalAutenticator] CHECK CONSTRAINT [FK_TB_User_ExternalAutenticator_TB_User]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Knowledge Owner ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_KnowledgeRecommend', @level2type=N'COLUMN',@level2name=N'REC_USR_id'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'User which recommended' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_KnowledgeRecommend', @level2type=N'COLUMN',@level2name=N'REC_USR_id_recommended'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Social Counter for specific knowledge ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'TB_SocialCounter', @level2type=N'COLUMN',@level2name=N'SOC_Recommends'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1[50] 4[25] 3) )"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1[50] 2[25] 3) )"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2[66] 3) )"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 5
   End
   Begin DiagramPane = 
      PaneHidden = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "EVN"
            Begin Extent = 
               Top = 12
               Left = 76
               Bottom = 259
               Right = 368
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "EVT"
            Begin Extent = 
               Top = 12
               Left = 444
               Bottom = 259
               Right = 719
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "USR"
            Begin Extent = 
               Top = 12
               Left = 795
               Bottom = 259
               Right = 1070
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "KNW"
            Begin Extent = 
               Top = 12
               Left = 1146
               Bottom = 259
               Right = 1432
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      PaneHidden = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_Events'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'VW_Events'
GO
USE [master]
GO
ALTER DATABASE [Widul] SET  READ_WRITE 
GO
