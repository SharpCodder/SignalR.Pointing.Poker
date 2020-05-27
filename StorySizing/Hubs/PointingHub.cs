using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorySizing.Hubs
{
    public class PointingHub : Hub
    {
        public async Task JoinGroup(string groupName, string user)
        {
            PointingSession pointingSession = new PointingCache().GetCacheData(groupName);
            if (string.IsNullOrWhiteSpace(pointingSession.GroupName))
                pointingSession.GroupName = groupName;

            pointingSession.MemberRating.Add(new PointSessionMember() { Member = user });
            new PointingCache().LoadCacheData(pointingSession, groupName);
            Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", pointingSession.MemberRating.Select(mr => new { Member = mr.Member, HasRating = !string.IsNullOrWhiteSpace(mr.Rating) }));

        }

        public async Task SendMessage(string groupName, string user, string message)
        {
            PointingSession pointingSession = new PointingCache().GetCacheData(groupName);
            pointingSession.MemberRating.First(m => m.Member == user).Rating = message;
            new PointingCache().LoadCacheData(pointingSession, groupName);
            await Clients.Group(groupName).SendAsync("ReceiveMessage", pointingSession.MemberRating.Select(mr => new { Member = mr.Member, HasRating = !string.IsNullOrWhiteSpace(mr.Rating) }));
        }

        

        //public Task LeaveGroup(string groupName, string user)
        //{
        //    PointingSession pointingSession = new PointingCache().GetCacheData(groupName);
        //    pointingSession.MemberRating.Remove(pointingSession.MemberRating.First(m => m.Member == user));
        //    return Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        //}

        public async Task Reset(string groupName)
        {
            PointingSession pointingSession = new PointingCache().GetCacheData(groupName);
            foreach(var rating in pointingSession.MemberRating)
            {
                rating.Rating = "";
            }             
            await Clients.Group(groupName).SendAsync("ResetPointing", pointingSession.MemberRating.Select(mr => new { Member = mr.Member, HasRating = !string.IsNullOrWhiteSpace(mr.Rating) }));
        }

        public async Task Reveal(string groupName)
        {
            PointingSession pointingSession = new PointingCache().GetCacheData(groupName);

            await Clients.Group(groupName).SendAsync("RevealPointing", pointingSession.MemberRating);
        }
    }
}
