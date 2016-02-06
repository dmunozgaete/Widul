using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace API.Endpoints.Events.Services
{
    /// <summary>
    /// Get Event Details
    /// </summary>
    public class Get : Gale.REST.Http.HttpReadActionResult<String>
    {

        public Get(string id) : base(id) { }

        public override Task<HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {
            using (var svc = new Gale.Db.DataService("SP_GET_Event"))
            {
                svc.Parameters.Add("EVNT_Token", this.Model);
                Gale.Db.EntityRepository repo = this.ExecuteQuery(svc);

                //Get tables
                Models.EventDetail eventDetail = repo.GetModel<Models.EventDetail>().FirstOrDefault();
                Models.Creator creator = repo.GetModel<Models.Creator>(1).FirstOrDefault();
                Models.Knowledge knowledge = repo.GetModel<Models.Knowledge>(2).FirstOrDefault();

                //List<Models.EventComment> comments = repo.GetModel<Models.EventComment>(3);

                List<Models.EventTag> tags = repo.GetModel<Models.EventTag>(4);

                Models.Place place = repo.GetModel<Models.Place>(5).FirstOrDefault();


                // -- Setting Values ;)!
                eventDetail.creator = creator;
                eventDetail.knowledge = knowledge;
                eventDetail.place = place;

                //eventDetail.comments = comments;

                eventDetail.tags = tags;
                    
                return Task.FromResult(new HttpResponseMessage()
                {
                    Content = new ObjectContent<Models.EventDetail>(eventDetail,
                        new Gale.REST.Http.Formatter.KqlFormatter()
                    )
                });


            }
        }
    }
}