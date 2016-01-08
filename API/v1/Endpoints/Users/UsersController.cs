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
        /// Get user information by his GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns>User information</returns>
        
        [HttpGet]
        [HierarchicalRoute("/{id:Guid}")]
        public String GetUser(String id)
        {
            return "USER INFORMATION";
        }

        /// <summary>
        /// Follow a user by his GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns>Response</returns>
        
        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Follow")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetUserById(Guid id)
        {

            var me = this.User.PrimarySid();

            var userToFollow = id;

            return "USER:" + userToFollow + "SUCCESSFULLY FOLLOWED BY USER:" + me;
        }

        /// <summary>
        /// Get all the following users from this user
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns></returns>

        [HttpGet]
        [HierarchicalRoute("/{id:Guid}/Following")]
        public String GetUserFollowing(Guid id)
        {
            return "USER FOLLOWING";
        }

        /// <summary>
        /// Get all the followers from this user
        /// </summary>
        /// <param name="id">User Identifier</param>
        /// <returns>Followers</returns>
        
        [HttpGet]
        [HierarchicalRoute("/{id:Guid}/Followers")]
        public String GetUserFollers(Guid id)
        {
            return "USER FOLLOWERS";
        }

        /// <summary>
        /// Get current user
        /// </summary>
        /// <returns></returns>
        
        [HttpGet]
        [HierarchicalRoute("/Me")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetActualUser()
        {

            var me = this.User.PrimarySid();

            return "ACTUAL USER";
        }

        /// <summary>
        /// Get following users from current user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HierarchicalRoute("/Me/Following")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetActualUserFollowing()
        {

            var me = this.User.PrimarySid();

            return "ACTUAL USER FOLLOWING";
        }

        /// <summary>
        /// Get followers from current user
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [HierarchicalRoute("/Me/Followers")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetActualUserFollowers()
        {

            var me = this.User.PrimarySid();

            return "ACTUAL USER FOLLOWERS";
        }

        /// <summary>
        /// Get notifications from current user
        /// </summary>
        /// <returns>Current user notifications</returns>
        [HttpGet]
        [HierarchicalRoute("/Me/Notifications")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String GetCurrentUserNotifications()
        {

            var me = this.User.PrimarySid();

            return "CURRENT USER NOTIFICATIONS";
        }


    }
}