using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
//  [ApiController]
//  [Route("[controller]")]
 public class ActivitiesController : BaseApiController
 {


    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct){
        // var activiesSet = _mediator.Send(new List.Query());
        // #if DEBUG 
        //     if(activiesSet==null) {
        //         throw new NullReferenceException("_dataContext.Activities null error");
        //     }
        // #endif
        var activity = await Mediator.Send(new List.Query(), ct);
        return HandleResult(activity);
    }

    [HttpGet("{id}")] // activities/list
    public async Task<ActionResult<Activity>> GetActivity(Guid id) {

        var result = await Mediator.Send(new Details.Query{Id=id});
        
        return HandleResult(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity) {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity}));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id) {
        return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
    }

 }
}