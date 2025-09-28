(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[653],{2067:e=>{"use strict";e.exports=require("node:async_hooks")},6195:e=>{"use strict";e.exports=require("node:buffer")},174:(e,t,a)=>{"use strict";a.r(t),a.d(t,{ComponentMod:()=>w,default:()=>C});var i={};a.r(i),a.d(i,{POST:()=>m,runtime:()=>d});var n={};a.r(n),a.d(n,{originalPathname:()=>f,patchFetch:()=>v,requestAsyncStorage:()=>l,routeModule:()=>g,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var s=a(8842),r=a(2561),o=a(4828),c=a(6631),u=a(8079),p=a(6005);let d="edge";async function m(e){let{messages:t,userData:a}=await e.json(),i=`You are the Cross-Chain Strategy Agent for the Chainweb ZK Reputation System. You specialize in providing strategic recommendations for maximizing reputation across DeFi, Gaming, and Development domains on Kadena's multi-chain ecosystem.

Your expertise includes:
- Multi-chain portfolio optimization strategies
- Risk-reward analysis across different domains
- Timing recommendations for activity distribution
- Cross-domain synergy identification
- Reputation growth pathway planning

User Data Context: ${a?JSON.stringify(a):"No user data provided"}

Chain Specializations:
- Chain 20 (DeFi): Trading, liquidity provision, lending protocols, yield farming
- Chain 21 (Gaming): NFT trading, game achievements, virtual asset management
- Chain 22 (Development): Smart contract deployment, code quality metrics, protocol contributions

Scoring Weights: DeFi (40%), Gaming (30%), Development (30%)

Your role is to:
1. Analyze current reputation distribution across chains
2. Identify underutilized opportunities
3. Suggest optimal activity sequences
4. Recommend time-based strategies
5. Explain potential risks and mitigation strategies

Always provide concrete, actionable strategies with clear reasoning. Consider gas costs, time investment, and potential returns. Use a strategic, advisory tone while remaining accessible.`;return(await (0,p.kP)({model:(0,u.fr)("gpt-4o-mini"),system:i,messages:t,maxTokens:1e3,temperature:.8})).toAIStreamResponse()}let g=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/chat/cross-chain-strategy/route",pathname:"/api/chat/cross-chain-strategy",filename:"route",bundlePath:"app/api/chat/cross-chain-strategy/route"},resolvedPagePath:"/Users/ayush/Documents/hackathons/croissant-eth/kadena_croissant/agents/app/api/chat/cross-chain-strategy/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:l,staticGenerationAsyncStorage:h,serverHooks:y}=g,f="/api/chat/cross-chain-strategy/route";function v(){return(0,c.XH)({serverHooks:y,staticGenerationAsyncStorage:h})}let w=n,C=s.a.wrap(g)}},e=>{var t=t=>e(e.s=t);e.O(0,[763],()=>t(174));var a=e.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/cross-chain-strategy/route"]=a}]);
//# sourceMappingURL=route.js.map