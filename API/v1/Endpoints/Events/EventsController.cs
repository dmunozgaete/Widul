﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Endpoints.Events
{
    /// <summary>
    /// Event Controller
    /// </summary>
    public class EventsController : Gale.REST.RestController
    {
        #region EVENT

        /// <summary>
        /// Get all Events
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Swashbuckle.Swagger.Annotations.QueryableEndpoint(typeof(Models.VW_Event))]
        public IHttpActionResult Get()
        {
            return new Gale.REST.Http.HttpQueryableActionResult<Models.VW_Event>(this.Request);
        }

        /// <summary>
        /// Get Event Details
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            return new Services.Get(id.ToString());
        }

        /// <summary>
        /// Create a Event
        /// </summary>
        /// <param name="newEvent">Model</param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult Post(Models.NewEvent newEvent){

            return new Services.Create(newEvent);
        }
        #endregion

        #region --> TAGS 

        /// <summary>
        /// Get all Events
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HierarchicalRoute("Tags")]
        [Swashbuckle.Swagger.Annotations.QueryableEndpoint(typeof(Models.VW_Tag))]
        public IHttpActionResult Tags()
        {
            return new Gale.REST.Http.HttpQueryableActionResult<Models.VW_Tag>(this.Request);
        }

        #endregion

        #region --> COMMENTS

        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Comments")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public IHttpActionResult CreateComment(String id, Models.NewComment comment)
        {
            return new Services.Comments.Create(id, this.User.PrimarySid().ToString(), comment);
        }

        #endregion

        #region --> SEARCH

        /// <summary>
        /// Search all Events by queries
        /// </summary>
        /// <param name="q">Query</param>
        /// <returns></returns>
        [HttpGet]
        [HierarchicalRoute("/Search")]
        public IHttpActionResult SearchEvent(String q)
        {
            return new Services.Search(q);
        }

        #endregion

        #region --> JOIN
        /// <summary>
        /// Join to a Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>
        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Join")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public IHttpActionResult JoinEvent(String id)
        {
            return new Services.Join(id, this.User.PrimarySid().ToString());
        }

        /// <summary>
        /// Left a Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>
        [HttpDelete]
        [HierarchicalRoute("/{id:Guid}/Join")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public IHttpActionResult LeftEvent(String id)
        {
            return new Services.Left(id, this.User.PrimarySid().ToString());
        }

        #endregion
    }
}