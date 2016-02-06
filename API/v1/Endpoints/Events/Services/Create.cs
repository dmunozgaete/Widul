using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace API.Endpoints.Events.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class Create : Gale.REST.Http.HttpCreateActionResult<Models.NewEvent>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="newEvent"></param>
        public Create(Models.NewEvent newEvent) : base(newEvent) { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> ExecuteAsync(System.Threading.CancellationToken cancellationToken)
        {

            //------------------------------------------------
            // Guard's 
            Gale.Exception.RestException.Guard(() => this.Model == null, "EMPTY_BODY", API.Errors.ResourceManager);
            Gale.Exception.RestException.Guard(() => Model.creator == System.Guid.Empty, "CREATOR_EMPTY", API.Errors.ResourceManager);
            Gale.Exception.RestException.Guard(() => Model.knowledge == System.Guid.Empty, "KNOWLEDGE_EMPTY", API.Errors.ResourceManager);
            Gale.Exception.RestException.Guard(() => Model.place == System.Guid.Empty, "PLACE_EMPTY", API.Errors.ResourceManager);
            Gale.Exception.RestException.Guard(() => String.IsNullOrEmpty(Model.name), "NAME_EMPTY", API.Errors.ResourceManager);
            Gale.Exception.RestException.Guard(() => String.IsNullOrEmpty(Model.description), "DESCRIPTION_EMPTY", API.Errors.ResourceManager);


            using (var svc = new Gale.Db.DataService("SP_INS_Event"))
            {
                svc.Parameters.Add("USR_Token", this.Model.creator);
                svc.Parameters.Add("KNW_Token", this.Model.knowledge);
                svc.Parameters.Add("PLAC_Token", this.Model.place);

                svc.Parameters.Add("EVN_Date", this.Model.date);
                svc.Parameters.Add("EVN_Description", this.Model.description);
                ;
                svc.Parameters.Add("EVN_Name", this.Model.name);

                svc.Parameters.Add("TAGS", String.Join(",", this.Model.tags));


                this.ExecuteAction(svc);

                return Task.FromResult(new HttpResponseMessage()
                {
                    StatusCode = System.Net.HttpStatusCode.Created
                });
            }
        }
    }
}