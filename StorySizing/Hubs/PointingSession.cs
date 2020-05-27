using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorySizing.Hubs
{
    public class PointingSession
    {
        public PointingSession()
        {
            MemberRating = new List<PointSessionMember>();
        }
        public string GroupName { get; set; }

        public List<PointSessionMember> MemberRating { get; set; }



    }

    public class PointSessionMember
    {
        public string Member { get; set; }

        public string Rating { get; set; }
    }
}
