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
        /// Get user information by its GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns></returns>
        
        [HttpGet]
        [HierarchicalRoute("/{id:Guid}")]
        public String GetUser(String id)
        {
            return "GET USER";
        }

        /// <summary>
        /// Create a User
        /// </summary>
        /// <returns></returns>

        [HttpPost]
        [HierarchicalRoute("/")]
        public String CreateUser()
        {
            return "CREATE USER";
        }

        /// <summary>
        /// Edit a User by its GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns></returns>

        [HttpPut]
        [HierarchicalRoute("/{id:Guid}")]
        public String EditUser(String id)
        {
            return "EDIT USER";
        }

        /// <summary>
        /// Delete a user by its GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns></returns>

        [HttpDelete]
        [HierarchicalRoute("/{id:Guid}")]
        public String DeleteUser(String id)
        {
            return "DELETE USER";
        }

        /// <summary>
        /// Follow a user by its GUID
        /// </summary>
        /// <param name="id">User GUID</param>
        /// <returns></returns>

        [HttpPost]
        [HierarchicalRoute("/{id:Guid}/Follow")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String FollowUserById(Guid id)
        {

            var me = this.User.PrimarySid();

            var userToFollow = id;

            return "USER:" + userToFollow + "SUCCESSFULLY FOLLOWED BY USER:" + me;
        }

        /// <summary>
        /// Unfollow a user by its GUID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        [HttpDelete]
        [HierarchicalRoute("/{id:Guid}/Follow")]
        [Gale.Security.Oauth.Jwt.Authorize]
        public String UnfollowUserById(Guid id)
        {

            var me = this.User.PrimarySid();

            var userToUnfollow = id;

            return "USER:" + userToUnfollow + "SUCCESSFULLY UNFOLLOWED BY USER:" + me;
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
        /// <returns></returns>
        
        [HttpGet]
        [HierarchicalRoute("/{id:Guid}/Followers")]
        public String GetUserFollers(Guid id)
        {
            return "USER FOLLOWERS";
        }

        /// <summary>
        /// Get the current user
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
        /// Get the following users from current user
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
        /// Get the followers from current user
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
        /// <returns></returns>
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