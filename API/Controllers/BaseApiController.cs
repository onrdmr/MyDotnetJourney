using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
    private IMediator _mediator;
    // public BaseApiController(IMediator mediator)
    // {
    //     _mediator= mediator;

    // }

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>(); // coalescing operator if it is null _mediator is null use second option 

    protected ActionResult HandleResult<T>(Result<T> result){

        if(result == null) return NotFound();
        if(result.IsSuccess && result.Value != null) {
            
            // Console.WriteLine("hay sikecem...");
            return Ok(result.Value);
        }
        if(result.IsSuccess && result.Value== null){
            return NotFound();
        }
        return BadRequest(result.Error);
    }
}

        
    }