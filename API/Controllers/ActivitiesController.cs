using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Persistence;

namespace API.Controllers
{
 // [ApiController]
 // [Route("[controller]")]
 public class ActivitiesController : BaseApiController
 {
    private readonly DataContext _dataContext;
    public ActivitiesController(DataContext dataContext)
    {
        _dataContext = dataContext;

    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(){
        var activiesSet = _dataContext.Activities;
        #if DEBUG 
            if(activiesSet==null) {
                throw new NullReferenceException("_dataContext.Activities null error");
            }
        #endif
        return await activiesSet.ToListAsync();
    }

    [HttpGet("{id}")] // activities/list
    public async Task<ActionResult<Activity>> GetActivity(Guid id) {
        var activiesSet = _dataContext.Activities;
        #if DEBUG 
            if(activiesSet==null) {
                throw new NullReferenceException("_dataContext.Activities null error");
            }
        #endif
        return await activiesSet.FindAsync(id);
    }
 }
}