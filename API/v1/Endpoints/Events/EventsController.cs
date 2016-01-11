using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Endpoints.Events
{
    public class EventsController : Gale.REST.RestController
    {

        /// <summary>
        /// Join to a Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>

        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Join")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String JoinEvent(String id)
        {
            return "JOINED";
        }

        /// <summary>
        /// Left a Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>


        [HttpPut]
        [HierarchicalRoute("/{id:Guid}/Left")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String LeftEvent(String id)
        {
            return "LEFT";
        }

        /// <summary>
        /// Search all Events by a specific tag
        /// </summary>
        /// <param name="tag">Tag</param>
        /// <returns></returns>

        [HttpGet]
        [HierarchicalRoute("/Tag/{tag}")]
        public String GetEventsByTag(String tag)
        {
            return "EVENTS BY TAG";
        }

        /// <summary>
        /// Search events by query
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>

        [HttpGet]
        [HierarchicalRoute("/Search/{query}")]
        public String GetEventsBySearch(String query)
        {
            return "EVENTS BY SEARCH";
        }

        /// <summary>
        /// Get all Events
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [HierarchicalRoute("/All")]
        public String GetAllEvents()
        {
            return "ALL EVENTS";
        }

        /// <summary>
        /// Get Recommended Events
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [HierarchicalRoute("/Recommended")]
        public String GetRecommendedEvents()
        {
            return "RECOMMENDED EVENTS";
        }

        /// <summary>
        /// Get Event information by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>
        [HttpGet]
        [HierarchicalRoute("/{id:Guid}")]
        public String GetEvent(String id)
        {
            return "SINGLE EVENT INFORMATION";
        }

        /// <summary>
        /// Create a new Event
        /// </summary>
        /// <returns></returns>

        [HttpPost]
        [HierarchicalRoute("/")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String CreateEvent()
        {
            return "EVENT CREATED";
        }

        /// <summary>
        /// Edit Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>

        [HttpPut]
        [HierarchicalRoute("/{id:Guid}")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String EditEvent(String id)
        {
            return "EVENT UPDATED";
        }

        /// <summary>
        /// Delete Event by its GUID
        /// </summary>
        /// <param name="id">Event GUID</param>
        /// <returns></returns>

        [HttpDelete]
        [HierarchicalRoute("/{id:Guid}")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String DeleteEvent(String id)
        {
            return "EVENT DELETED";
        }


    }
}