﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión de runtime:4.0.30319.42000
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API.Endpoints.Files.Models
{
	using System.Data.Linq;
	using System.Data.Linq.Mapping;
	using System.Data;
	using System.Collections.Generic;
	using System.Reflection;
	using System.Linq;
	using System.Linq.Expressions;
	using System.ComponentModel;
	using System;
	
	
	[global::System.Data.Linq.Mapping.DatabaseAttribute(Name="Widul")]
	public partial class FileDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Definiciones de métodos de extensibilidad
    partial void OnCreated();
    #endregion
		
		public FileDataContext() : 
				base(global::System.Configuration.ConfigurationManager.ConnectionStrings["WidulConnectionString"].ConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public FileDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public FileDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public FileDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public FileDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<File> File
		{
			get
			{
				return this.GetTable<File>();
			}
		}
		
		public System.Data.Linq.Table<FileData> FileData
		{
			get
			{
				return this.GetTable<FileData>();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_COR_File")]
	public partial class File
	{
		
		private string _name;
		
		private int _length;
		
		private System.DateTime _createdAt;
		
		private string _contentType;
		
		private System.Guid _token;
		
		public File()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_Name", Storage="_name", DbType="VarChar(100) NOT NULL", CanBeNull=false)]
		public string name
		{
			get
			{
				return this._name;
			}
			set
			{
				if ((this._name != value))
				{
					this._name = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_Size", Storage="_length", DbType="Int NOT NULL")]
		public int length
		{
			get
			{
				return this._length;
			}
			set
			{
				if ((this._length != value))
				{
					this._length = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
		public System.DateTime createdAt
		{
			get
			{
				return this._createdAt;
			}
			set
			{
				if ((this._createdAt != value))
				{
					this._createdAt = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_ContentType", Storage="_contentType", DbType="VarChar(100) NOT NULL", CanBeNull=false)]
		public string contentType
		{
			get
			{
				return this._contentType;
			}
			set
			{
				if ((this._contentType != value))
				{
					this._contentType = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid token
		{
			get
			{
				return this._token;
			}
			set
			{
				if ((this._token != value))
				{
					this._token = value;
				}
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_COR_BinaryFile")]
	public partial class FileData
	{
		
		private System.Data.Linq.Binary _binary;
		
		private string _contentType;
		
		private string _name;
		
		public FileData()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="BINA_Binary", Storage="_binary", DbType="Image NOT NULL", CanBeNull=false, UpdateCheck=UpdateCheck.Never)]
		public System.Data.Linq.Binary binary
		{
			get
			{
				return this._binary;
			}
			set
			{
				if ((this._binary != value))
				{
					this._binary = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_ContentType", Storage="_contentType", DbType="VarChar(100) NOT NULL", CanBeNull=false)]
		public string contentType
		{
			get
			{
				return this._contentType;
			}
			set
			{
				if ((this._contentType != value))
				{
					this._contentType = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_Name", Storage="_name", DbType="VarChar(100) NOT NULL", CanBeNull=false)]
		public string name
		{
			get
			{
				return this._name;
			}
			set
			{
				if ((this._name != value))
				{
					this._name = value;
				}
			}
		}
	}
}
#pragma warning restore 1591