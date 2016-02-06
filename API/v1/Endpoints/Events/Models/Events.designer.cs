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

namespace API.Endpoints.Events.Models
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
	public partial class EventsDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Definiciones de métodos de extensibilidad
    partial void OnCreated();
    partial void InsertVW_Events(VW_Events instance);
    partial void UpdateVW_Events(VW_Events instance);
    partial void DeleteVW_Events(VW_Events instance);
    partial void InsertCreator(Creator instance);
    partial void UpdateCreator(Creator instance);
    partial void DeleteCreator(Creator instance);
    #endregion
		
		public EventsDataContext() : 
				base(global::System.Configuration.ConfigurationManager.ConnectionStrings["WidulConnectionString"].ConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public EventsDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public EventsDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public EventsDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public EventsDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<NewEvent> NewEvents
		{
			get
			{
				return this.GetTable<NewEvent>();
			}
		}
		
		public System.Data.Linq.Table<Pagination> Pagination
		{
			get
			{
				return this.GetTable<Pagination>();
			}
		}
		
		public System.Data.Linq.Table<VW_Events> VW_Events1
		{
			get
			{
				return this.GetTable<VW_Events>();
			}
		}
		
		public System.Data.Linq.Table<EventDetail> EventDetail
		{
			get
			{
				return this.GetTable<EventDetail>();
			}
		}
		
		public System.Data.Linq.Table<Knowledge> Knowledge
		{
			get
			{
				return this.GetTable<Knowledge>();
			}
		}
		
		public System.Data.Linq.Table<EventTag> EventTag
		{
			get
			{
				return this.GetTable<EventTag>();
			}
		}
		
		public System.Data.Linq.Table<EventComment> EventComment
		{
			get
			{
				return this.GetTable<EventComment>();
			}
		}
		
		public System.Data.Linq.Table<Creator> Creator
		{
			get
			{
				return this.GetTable<Creator>();
			}
		}
		
		public System.Data.Linq.Table<Place> Places
		{
			get
			{
				return this.GetTable<Place>();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_Event")]
	public partial class NewEvent
	{
		
		private string _name;
		
		private string _description;
		
		private System.DateTime _date;
		
		private string _location;
		
		private string _knowledge;
		
		private List<String> _tags;
		
		private string _isRestricted;
		
		private string _isPrivate;
		
		public NewEvent()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVN_Name", Storage="_name", DbType="VarChar(200) NOT NULL", CanBeNull=false)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVN_Description", Storage="_description", DbType="VarChar(500) NOT NULL", CanBeNull=false)]
		public string description
		{
			get
			{
				return this._description;
			}
			set
			{
				if ((this._description != value))
				{
					this._description = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVN_Date", Storage="_date", DbType="DateTime")]
		public System.DateTime date
		{
			get
			{
				return this._date;
			}
			set
			{
				if ((this._date != value))
				{
					this._date = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Token", Storage="_location", CanBeNull=false)]
		public string place
		{
			get
			{
				return this._location;
			}
			set
			{
				if ((this._location != value))
				{
					this._location = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="KNW_Token", Storage="_knowledge", CanBeNull=false)]
		public string knowledge
		{
			get
			{
				return this._knowledge;
			}
			set
			{
				if ((this._knowledge != value))
				{
					this._knowledge = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_tags", CanBeNull=false)]
		public List<String> tags
		{
			get
			{
				return this._tags;
			}
			set
			{
				if ((this._tags != value))
				{
					this._tags = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_isRestricted", CanBeNull=false)]
		public string isRestricted
		{
			get
			{
				return this._isRestricted;
			}
			set
			{
				if ((this._isRestricted != value))
				{
					this._isRestricted = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_isPrivate", CanBeNull=false)]
		public string isPrivate
		{
			get
			{
				return this._isPrivate;
			}
			set
			{
				if ((this._isPrivate != value))
				{
					this._isPrivate = value;
				}
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="")]
	public partial class Pagination
	{
		
		private int _limit;
		
		private int _offset;
		
		private int _total;
		
		public Pagination()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="Limit", Storage="_limit")]
		public int limit
		{
			get
			{
				return this._limit;
			}
			set
			{
				if ((this._limit != value))
				{
					this._limit = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="Offset", Storage="_offset")]
		public int offset
		{
			get
			{
				return this._offset;
			}
			set
			{
				if ((this._offset != value))
				{
					this._offset = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="Total", Storage="_total")]
		public int total
		{
			get
			{
				return this._total;
			}
			set
			{
				if ((this._total != value))
				{
					this._total = value;
				}
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.VW_Events")]
	public partial class VW_Events : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private System.Nullable<System.DateTime> _date;
		
		private System.DateTime _createdAt;
		
		private string _description;
		
		private string _name;
		
		private System.DateTime _updatedAt;
		
		private System.Guid _token;
		
		private string _user_fullname;
		
		private System.Guid _user_token;
		
		private System.Nullable<System.Guid> _user_photo;
		
		private string _knowledge_name;
		
		private System.Guid _knowledge_token;
		
		private string _place_address;
		
		private System.Guid _place_token;
		
    #region Definiciones de métodos de extensibilidad
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OndateChanging(System.Nullable<System.DateTime> value);
    partial void OndateChanged();
    partial void OncreatedAtChanging(System.DateTime value);
    partial void OncreatedAtChanged();
    partial void OndescriptionChanging(string value);
    partial void OndescriptionChanged();
    partial void OnnameChanging(string value);
    partial void OnnameChanged();
    partial void OnupdatedAtChanging(System.DateTime value);
    partial void OnupdatedAtChanged();
    partial void OntokenChanging(System.Guid value);
    partial void OntokenChanged();
    partial void Onuser_fullnameChanging(string value);
    partial void Onuser_fullnameChanged();
    partial void Onuser_tokenChanging(System.Guid value);
    partial void Onuser_tokenChanged();
    partial void Onuser_photoChanging(System.Nullable<System.Guid> value);
    partial void Onuser_photoChanged();
    partial void Onknowledge_nameChanging(string value);
    partial void Onknowledge_nameChanged();
    partial void Onknowledge_tokenChanging(System.Guid value);
    partial void Onknowledge_tokenChanged();
    partial void Onplace_addressChanging(string value);
    partial void Onplace_addressChanged();
    partial void Onplace_tokenChanging(System.Guid value);
    partial void Onplace_tokenChanged();
    #endregion
		
		public VW_Events()
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Date", Storage="_date", DbType="DateTime")]
		public System.Nullable<System.DateTime> date
		{
			get
			{
				return this._date;
			}
			set
			{
				if ((this._date != value))
				{
					this.OndateChanging(value);
					this.SendPropertyChanging();
					this._date = value;
					this.SendPropertyChanged("date");
					this.OndateChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
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
					this.OncreatedAtChanging(value);
					this.SendPropertyChanging();
					this._createdAt = value;
					this.SendPropertyChanged("createdAt");
					this.OncreatedAtChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Description", Storage="_description", DbType="VarChar(500) NOT NULL", CanBeNull=false)]
		public string description
		{
			get
			{
				return this._description;
			}
			set
			{
				if ((this._description != value))
				{
					this.OndescriptionChanging(value);
					this.SendPropertyChanging();
					this._description = value;
					this.SendPropertyChanged("description");
					this.OndescriptionChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Name", Storage="_name", DbType="VarChar(200) NOT NULL", CanBeNull=false)]
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
					this.OnnameChanging(value);
					this.SendPropertyChanging();
					this._name = value;
					this.SendPropertyChanged("name");
					this.OnnameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_UpdatedAt", Storage="_updatedAt", DbType="DateTime NOT NULL")]
		public System.DateTime updatedAt
		{
			get
			{
				return this._updatedAt;
			}
			set
			{
				if ((this._updatedAt != value))
				{
					this.OnupdatedAtChanging(value);
					this.SendPropertyChanging();
					this._updatedAt = value;
					this.SendPropertyChanged("updatedAt");
					this.OnupdatedAtChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL", IsPrimaryKey=true)]
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
					this.OntokenChanging(value);
					this.SendPropertyChanging();
					this._token = value;
					this.SendPropertyChanged("token");
					this.OntokenChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_FullName", Storage="_user_fullname", DbType="VarChar(250) NOT NULL", CanBeNull=false)]
		public string user_fullname
		{
			get
			{
				return this._user_fullname;
			}
			set
			{
				if ((this._user_fullname != value))
				{
					this.Onuser_fullnameChanging(value);
					this.SendPropertyChanging();
					this._user_fullname = value;
					this.SendPropertyChanged("user_fullname");
					this.Onuser_fullnameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ENTI_Token", Storage="_user_token", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid user_token
		{
			get
			{
				return this._user_token;
			}
			set
			{
				if ((this._user_token != value))
				{
					this.Onuser_tokenChanging(value);
					this.SendPropertyChanging();
					this._user_token = value;
					this.SendPropertyChanged("user_token");
					this.Onuser_tokenChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_Photo", Storage="_user_photo", DbType="UniqueIdentifier")]
		public System.Nullable<System.Guid> user_photo
		{
			get
			{
				return this._user_photo;
			}
			set
			{
				if ((this._user_photo != value))
				{
					this.Onuser_photoChanging(value);
					this.SendPropertyChanging();
					this._user_photo = value;
					this.SendPropertyChanged("user_photo");
					this.Onuser_photoChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="KNOW_Name", Storage="_knowledge_name", DbType="VarChar(50) NOT NULL", CanBeNull=false)]
		public string knowledge_name
		{
			get
			{
				return this._knowledge_name;
			}
			set
			{
				if ((this._knowledge_name != value))
				{
					this.Onknowledge_nameChanging(value);
					this.SendPropertyChanging();
					this._knowledge_name = value;
					this.SendPropertyChanged("knowledge_name");
					this.Onknowledge_nameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="KNOW_Token", Storage="_knowledge_token", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid knowledge_token
		{
			get
			{
				return this._knowledge_token;
			}
			set
			{
				if ((this._knowledge_token != value))
				{
					this.Onknowledge_tokenChanging(value);
					this.SendPropertyChanging();
					this._knowledge_token = value;
					this.SendPropertyChanged("knowledge_token");
					this.Onknowledge_tokenChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Address", Storage="_place_address", CanBeNull=false)]
		public string place_address
		{
			get
			{
				return this._place_address;
			}
			set
			{
				if ((this._place_address != value))
				{
					this.Onplace_addressChanging(value);
					this.SendPropertyChanging();
					this._place_address = value;
					this.SendPropertyChanged("place_address");
					this.Onplace_addressChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Token", Storage="_place_token")]
		public System.Guid place_token
		{
			get
			{
				return this._place_token;
			}
			set
			{
				if ((this._place_token != value))
				{
					this.Onplace_tokenChanging(value);
					this.SendPropertyChanging();
					this._place_token = value;
					this.SendPropertyChanged("place_token");
					this.Onplace_tokenChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_WID_Event")]
	public partial class EventDetail
	{
		
		private string _name;
		
		private string _description;
		
		private System.Nullable<System.DateTime> _date;
		
		private System.DateTime _updatedAt;
		
		private System.DateTime _createdAt;
		
		private System.Guid _token;
		
		private Creator _creator;
		
		private Knowledge _knowledge;
		
		private List<EventTag> _tags;
		
		private Place _place;
		
		public EventDetail()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Name", Storage="_name", DbType="VarChar(200) NOT NULL", CanBeNull=false)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Description", Storage="_description", DbType="VarChar(500) NOT NULL", CanBeNull=false)]
		public string description
		{
			get
			{
				return this._description;
			}
			set
			{
				if ((this._description != value))
				{
					this._description = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Date", Storage="_date", DbType="DateTime")]
		public System.Nullable<System.DateTime> date
		{
			get
			{
				return this._date;
			}
			set
			{
				if ((this._date != value))
				{
					this._date = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_UpdatedAt", Storage="_updatedAt", DbType="DateTime NOT NULL")]
		public System.DateTime updatedAt
		{
			get
			{
				return this._updatedAt;
			}
			set
			{
				if ((this._updatedAt != value))
				{
					this._updatedAt = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="EVNT_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_creator", CanBeNull=false)]
		public Creator creator
		{
			get
			{
				return this._creator;
			}
			set
			{
				if ((this._creator != value))
				{
					this._creator = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_knowledge", CanBeNull=false)]
		public Knowledge knowledge
		{
			get
			{
				return this._knowledge;
			}
			set
			{
				if ((this._knowledge != value))
				{
					this._knowledge = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_tags", CanBeNull=false)]
		public List<EventTag> tags
		{
			get
			{
				return this._tags;
			}
			set
			{
				if ((this._tags != value))
				{
					this._tags = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_place", CanBeNull=false)]
		public Place place
		{
			get
			{
				return this._place;
			}
			set
			{
				if ((this._place != value))
				{
					this._place = value;
				}
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_WID_Knowledge")]
	public partial class Knowledge
	{
		
		private string _name;
		
		private System.Guid _token;
		
		public Knowledge()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="KNOW_Name", Storage="_name", DbType="VarChar(50) NOT NULL", CanBeNull=false)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="KNOW_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
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
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_WID_EventTag")]
	public partial class EventTag
	{
		
		private string _name;
		
		private System.Guid _token;
		
		public EventTag()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ETAG_Name", Storage="_name", DbType="VarChar(50) NOT NULL", CanBeNull=false)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ETAG_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
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
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_WID_EventComment")]
	public partial class EventComment
	{
		
		private string _comment;
		
		private System.DateTime _createdAt;
		
		private System.Guid _token;
		
		private System.Guid _user_token;
		
		private string _user_fullname;
		
		public EventComment()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="COMM_Comment", Storage="_comment", DbType="VarChar(500) NOT NULL", CanBeNull=false)]
		public string comment
		{
			get
			{
				return this._comment;
			}
			set
			{
				if ((this._comment != value))
				{
					this._comment = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="COMM_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="COMM_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ENTI_Token", Storage="_user_token", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid user_token
		{
			get
			{
				return this._user_token;
			}
			set
			{
				if ((this._user_token != value))
				{
					this._user_token = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_FullName", Storage="_user_fullname", DbType="VarChar(250) NOT NULL", CanBeNull=false)]
		public string user_fullname
		{
			get
			{
				return this._user_fullname;
			}
			set
			{
				if ((this._user_fullname != value))
				{
					this._user_fullname = value;
				}
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.TB_COR_User")]
	public partial class Creator : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private System.Guid _token;
		
		private System.DateTime _createdAt;
		
		private string _email;
		
		private string _name;
		
		private System.Guid _photo;
		
    #region Definiciones de métodos de extensibilidad
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OntokenChanging(System.Guid value);
    partial void OntokenChanged();
    partial void OncreatedAtChanging(System.DateTime value);
    partial void OncreatedAtChanged();
    partial void OnemailChanging(string value);
    partial void OnemailChanged();
    partial void OnnameChanging(string value);
    partial void OnnameChanged();
    partial void OnphotoChanging(System.Guid value);
    partial void OnphotoChanged();
    #endregion
		
		public Creator()
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ENTI_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL", IsPrimaryKey=true)]
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
					this.OntokenChanging(value);
					this.SendPropertyChanging();
					this._token = value;
					this.SendPropertyChanged("token");
					this.OntokenChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ENTI_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
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
					this.OncreatedAtChanging(value);
					this.SendPropertyChanging();
					this._createdAt = value;
					this.SendPropertyChanged("createdAt");
					this.OncreatedAtChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_Email", Storage="_email", DbType="VarChar(100) NOT NULL", CanBeNull=false)]
		public string email
		{
			get
			{
				return this._email;
			}
			set
			{
				if ((this._email != value))
				{
					this.OnemailChanging(value);
					this.SendPropertyChanging();
					this._email = value;
					this.SendPropertyChanged("email");
					this.OnemailChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_FullName", Storage="_name", DbType="VarChar(250) NOT NULL", CanBeNull=false)]
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
					this.OnnameChanging(value);
					this.SendPropertyChanging();
					this._name = value;
					this.SendPropertyChanged("name");
					this.OnnameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="FILE_Token", Storage="_photo", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid photo
		{
			get
			{
				return this._photo;
			}
			set
			{
				if ((this._photo != value))
				{
					this.OnphotoChanging(value);
					this.SendPropertyChanging();
					this._photo = value;
					this.SendPropertyChanged("photo");
					this.OnphotoChanged();
				}
			}
		}
		
		public event PropertyChangingEventHandler PropertyChanging;
		
		public event PropertyChangedEventHandler PropertyChanged;
		
		protected virtual void SendPropertyChanging()
		{
			if ((this.PropertyChanging != null))
			{
				this.PropertyChanging(this, emptyChangingEventArgs);
			}
		}
		
		protected virtual void SendPropertyChanged(String propertyName)
		{
			if ((this.PropertyChanged != null))
			{
				this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.VW_Places")]
	public partial class Place
	{
		
		private string _name;
		
		private string _address;
		
		private double _latitude;
		
		private double _longitude;
		
		private int _capacity;
		
		private string _tip;
		
		private System.Guid _token;
		
		public Place()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Name", Storage="_name", DbType="VarChar(50) NOT NULL", CanBeNull=false)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Address", Storage="_address", DbType="VarChar(400) NOT NULL", CanBeNull=false)]
		public string address
		{
			get
			{
				return this._address;
			}
			set
			{
				if ((this._address != value))
				{
					this._address = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Latitude", Storage="_latitude", DbType="Float NOT NULL")]
		public double latitude
		{
			get
			{
				return this._latitude;
			}
			set
			{
				if ((this._latitude != value))
				{
					this._latitude = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Longitude", Storage="_longitude", DbType="Float NOT NULL")]
		public double longitude
		{
			get
			{
				return this._longitude;
			}
			set
			{
				if ((this._longitude != value))
				{
					this._longitude = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Capacity", Storage="_capacity", DbType="Int NOT NULL")]
		public int capacity
		{
			get
			{
				return this._capacity;
			}
			set
			{
				if ((this._capacity != value))
				{
					this._capacity = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Tip", Storage="_tip", DbType="VarChar(400) NOT NULL", CanBeNull=false)]
		public string tip
		{
			get
			{
				return this._tip;
			}
			set
			{
				if ((this._tip != value))
				{
					this._tip = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL")]
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
}
#pragma warning restore 1591
