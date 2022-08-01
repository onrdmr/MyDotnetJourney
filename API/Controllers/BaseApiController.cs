using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        
    }
}