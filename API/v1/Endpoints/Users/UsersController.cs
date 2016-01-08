using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Endpoints.Users
{
    /// <summary>
    /// User Controller
    /// </summary>
    public class UsersController : Gale.REST.RestController
    {
        /// <summary>
        /// Get User By Id
        /// </summary>
        /// <param name="id">User Identifier</param>
        /// <returns>Detailed Information from the user</returns>
        [HttpGet]
        [Swashbuckle.Swagger.Annotations.SwaggerResponse(System.Net.HttpStatusCode.BadRequest,Description="Esto pasa cunado todo essta coorecto")]
        [Swashbuckle.Swagger.Annotations.SwaggerResponse(System.Net.HttpStatusCode.OK)]
        [HierarchicalRoute("/{id:Guid}")]
        public String GetUser(String id)
        {
            return "HOLA";
        }

        /// <summary>
        /// Follow User
        /// </summary>
        /// <param name="id">User Identifier</param>
        /// <param name="newuser">New User</param>
        /// <returns></returns>
        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Follow")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetUserById(Guid id,Models.NewUser newuser)
        {

            var me = this.User.PrimarySid();
            var usertoFollow = id;

            return "HOLA NUd" + newuser.nane;
        }
    }
}