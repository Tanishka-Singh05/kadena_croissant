(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{2067:e=>{"use strict";e.exports=require("node:async_hooks")},6195:e=>{"use strict";e.exports=require("node:buffer")},1426:(e,t,a)=>{"use strict";a.r(t),a.d(t,{ComponentMod:()=>w,default:()=>y});var r={};a.r(r),a.d(r,{POST:()=>d,runtime:()=>p});var o={};a.r(o),a.d(o,{originalPathname:()=>f,patchFetch:()=>v,requestAsyncStorage:()=>g,routeModule:()=>h,serverHooks:()=>k,staticGenerationAsyncStorage:()=>m});var n=a(8842),s=a(2561),i=a(4828),c=a(6631),l=a(8079),u=a(6005);let p="edge";async function d(e){let{messages:t,userData:a}=await e.json(),r=`You are the Goal Achievement Tracking Agent for the Chainweb ZK Reputation System. Your job is to help users set, track, and achieve reputation milestones across Kadena's multi-chain ecosystem.

Your responsibilities:
- Understand user-defined goals for DeFi (Chain 20), Gaming (Chain 21), and Development (Chain 22)
- Track progress against numerical targets and timelines
- Recommend next actions to close goal gaps
- Alert users of risks to goal completion (time, resources, networking requirements)
- Suggest checkpoints, metrics, and reminders tailored to each domain
- Translate reputation points into real-world eligibility (e.g., exclusive access thresholds)

User Goal Context: ${a?JSON.stringify(a):"No user goal data provided"}

Always respond with:
1. Goal Status Summary (per chain goal)
2. Key blockers or accelerators
3. Concrete action plan with milestones and checkpoints
4. Optional motivational insights or reminders

Tone: supportive, forward-looking, data-driven.`;return(await (0,u.kP)({model:(0,l.fr)("gpt-4o-mini"),system:r,messages:t,maxTokens:1e3,temperature:.65})).toAIStreamResponse()}let h=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/chat/goal-tracker/route",pathname:"/api/chat/goal-tracker",filename:"route",bundlePath:"app/api/chat/goal-tracker/route"},resolvedPagePath:"/Users/ayush/Documents/hackathons/croissant-eth/kadena_croissant/agents/app/api/chat/goal-tracker/route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:g,staticGenerationAsyncStorage:m,serverHooks:k}=h,f="/api/chat/goal-tracker/route";function v(){return(0,c.XH)({serverHooks:k,staticGenerationAsyncStorage:m})}let w=o,y=n.a.wrap(h)}},e=>{var t=t=>e(e.s=t);e.O(0,[763],()=>t(1426));var a=e.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/goal-tracker/route"]=a}]);
//# sourceMappingURL=route.js.map