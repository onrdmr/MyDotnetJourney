using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity {get;set;}
        }



    public class Handler : IRequestHandler<Command,Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {

            var activity = await _context.Activities.FindAsync(request.Activity.Id);

            // activity.Title = request.Activity.Title ?? activity.Title;

            if (activity == null) return null;



            // Console.WriteLine($"{activity.Title} {activity.Description}, {activity.Date} {activity.Category} {activity.City} {activity.Venue}");
            _mapper.Map(request.Activity, activity);
            // activity.Title = request.Activity.Title ?? activity.Title;
            // activity.Description = request.Activity.Description ?? activity.Description;
            // activity.Date = DateTime.Now;
            // activity.Category = request.Activity.Category ?? activity.Category;
            // activity.City = request.Activity.City ?? activity.City;
            // activity.Venue = request.Activity.Venue ?? activity.Venue;

            var result = await _context.SaveChangesAsync() > 0;
            if(!result) return Result<Unit>.Failure("Editing is Failed");

            return Result<Unit>.Success(Unit.Value);
        }

    }
    }
}