using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<Activity, Activity>()
            .ForMember(dest=>dest.Category, opt=>{
                opt.Condition(src => (src.Category != null));
            })
            .ForMember(dest=>dest.City, opt=> {
                opt.Condition(src => (src.City!=null));
            })
            .ForMember(dest=>dest.Description, opt=> {
                opt.Condition(src => (src.Description!=null));
            })
            .ForMember(dest=>dest.Title, opt=> {
                opt.Condition(src => (src.Title!=null));
            })
            .ForMember(dest=>dest.Date, opt=> {
                opt.Condition(src => (src.Date!=null));
            })
            .ForMember(dest=>dest.Venue, opt=> {
                opt.Condition(src => (src.Venue!=null));
            })
            ;
        }
    }
}