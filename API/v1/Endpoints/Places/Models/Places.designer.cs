﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API.Endpoints.Places.Models
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
	public partial class PlacesDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Extensibility Method Definitions
    partial void OnCreated();
    partial void InsertPlace(Place instance);
    partial void UpdatePlace(Place instance);
    partial void DeletePlace(Place instance);
    #endregion
		
		public PlacesDataContext() : 
				base(global::System.Configuration.ConfigurationManager.ConnectionStrings["WidulConnectionString"].ConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public PlacesDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public PlacesDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public PlacesDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public PlacesDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public System.Data.Linq.Table<Place> Place
		{
			get
			{
				return this.GetTable<Place>();
			}
		}
		
		public System.Data.Linq.Table<NewPlace> NewPlace
		{
			get
			{
				return this.GetTable<NewPlace>();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.VW_Places")]
	public partial class Place : INotifyPropertyChanging, INotifyPropertyChanged
	{
		
		private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
		
		private string _name;
		
		private string _address;
		
		private double _latitude;
		
		private double _longitude;
		
		private int _capacity;
		
		private System.DateTime _createdAt;
		
		private string _tip;
		
		private System.Guid _token;
		
		private string _creator_fullname;
		
		private System.Guid _creator_token;
		
		private System.Nullable<System.Guid> _creator_photo;
		
    #region Extensibility Method Definitions
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnnameChanging(string value);
    partial void OnnameChanged();
    partial void OnaddressChanging(string value);
    partial void OnaddressChanged();
    partial void OnlatChanging(double value);
    partial void OnlatChanged();
    partial void OnlngChanging(double value);
    partial void OnlngChanged();
    partial void OncapacityChanging(int value);
    partial void OncapacityChanged();
    partial void OncreatedAtChanging(System.DateTime value);
    partial void OncreatedAtChanged();
    partial void OntipChanging(string value);
    partial void OntipChanged();
    partial void OntokenChanging(System.Guid value);
    partial void OntokenChanged();
    partial void Oncreator_fullnameChanging(string value);
    partial void Oncreator_fullnameChanged();
    partial void Oncreator_tokenChanging(System.Guid value);
    partial void Oncreator_tokenChanged();
    partial void Oncreator_photoChanging(System.Nullable<System.Guid> value);
    partial void Oncreator_photoChanged();
    #endregion
		
		public Place()
		{
			OnCreated();
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
					this.OnnameChanging(value);
					this.SendPropertyChanging();
					this._name = value;
					this.SendPropertyChanged("name");
					this.OnnameChanged();
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
					this.OnaddressChanging(value);
					this.SendPropertyChanging();
					this._address = value;
					this.SendPropertyChanged("address");
					this.OnaddressChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Latitude", Storage="_latitude", DbType="Float NOT NULL")]
		public double lat
		{
			get
			{
				return this._latitude;
			}
			set
			{
				if ((this._latitude != value))
				{
					this.OnlatChanging(value);
					this.SendPropertyChanging();
					this._latitude = value;
					this.SendPropertyChanged("lat");
					this.OnlatChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Longitude", Storage="_longitude", DbType="Float NOT NULL")]
		public double lng
		{
			get
			{
				return this._longitude;
			}
			set
			{
				if ((this._longitude != value))
				{
					this.OnlngChanging(value);
					this.SendPropertyChanging();
					this._longitude = value;
					this.SendPropertyChanged("lng");
					this.OnlngChanged();
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
					this.OncapacityChanging(value);
					this.SendPropertyChanging();
					this._capacity = value;
					this.SendPropertyChanged("capacity");
					this.OncapacityChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_CreatedAt", Storage="_createdAt", DbType="DateTime NOT NULL")]
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
					this.OntipChanging(value);
					this.SendPropertyChanging();
					this._tip = value;
					this.SendPropertyChanged("tip");
					this.OntipChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="PLAC_Token", Storage="_token", DbType="UniqueIdentifier NOT NULL", IsPrimaryKey=true)]
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
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_FullName", Storage="_creator_fullname", DbType="VarChar(250) NOT NULL", CanBeNull=false)]
		public string creator_fullname
		{
			get
			{
				return this._creator_fullname;
			}
			set
			{
				if ((this._creator_fullname != value))
				{
					this.Oncreator_fullnameChanging(value);
					this.SendPropertyChanging();
					this._creator_fullname = value;
					this.SendPropertyChanged("creator_fullname");
					this.Oncreator_fullnameChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="ENTI_Token", Storage="_creator_token", DbType="UniqueIdentifier NOT NULL")]
		public System.Guid creator_token
		{
			get
			{
				return this._creator_token;
			}
			set
			{
				if ((this._creator_token != value))
				{
					this.Oncreator_tokenChanging(value);
					this.SendPropertyChanging();
					this._creator_token = value;
					this.SendPropertyChanged("creator_token");
					this.Oncreator_tokenChanged();
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="USER_Photo", Storage="_creator_photo", DbType="UniqueIdentifier")]
		public System.Nullable<System.Guid> creator_photo
		{
			get
			{
				return this._creator_photo;
			}
			set
			{
				if ((this._creator_photo != value))
				{
					this.Oncreator_photoChanging(value);
					this.SendPropertyChanging();
					this._creator_photo = value;
					this.SendPropertyChanged("creator_photo");
					this.Oncreator_photoChanged();
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
	
	[global::System.Data.Linq.Mapping.TableAttribute(Name="")]
	public partial class NewPlace
	{
		
		private string _name;
		
		private string _address;
		
		private double _latitude;
		
		private double _longitude;
		
		private int _capacity;
		
		private string _tip;
		
		public NewPlace()
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
		public double lat
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
		public double lng
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
	}
}
#pragma warning restore 1591
