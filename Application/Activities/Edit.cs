using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity {get;set;}
        }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await _context.Activities.FindAsync(request.Activity.Id);

            // activity.Title = request.Activity.Title ?? activity.Title;

            // Console.WriteLine($"{activity.Title} {activity.Description}, {activity.Date} {activity.Category} {activity.City} {activity.Venue}");
            _mapper.Map(request.Activity, activity);
            // activity.Title = request.Activity.Title ?? activity.Title;
            // activity.Description = request.Activity.Description ?? activity.Description;
            // activity.Date = DateTime.Now;
            // activity.Category = request.Activity.Category ?? activity.Category;
            // activity.City = request.Activity.City ?? activity.City;
            // activity.Venue = request.Activity.Venue ?? activity.Venue;

            await _context.SaveChangesAsync();
            return Unit.Value;
        }

    }
    }
}