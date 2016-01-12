using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace API.Endpoints.Events.Services.EventTypes
{
    /// <summary>
    /// Get Events Types
    /// </summary>
    public class Get : Gale.REST.Http.HttpBaseActionResult
    {
        string _user = null;

        public Get(string user)
        {
            _user = user;
        }
        public override Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {
            using (var svc = new Gale.Db.DataService("SP_GET_EventTypes"))
            {
                svc.Parameters.Add("USR_Token", _user);

                Gale.Db.EntityRepository repo = this.ExecuteQuery(svc);
                List<Models.TB_EventType> eventyTypes =repo.GetModel<Models.TB_EventType>();

                return Task.FromResult(new HttpResponseMessage()
                {
                    Content = new ObjectContent<List<Models.TB_EventType>>(
                        eventyTypes,
                        new Gale.REST.Http.Formatter.JsonFormatter()
                    )
                });


            }
        }
    }
}