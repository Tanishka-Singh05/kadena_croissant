(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[663],{2067:a=>{"use strict";a.exports=require("node:async_hooks")},6195:a=>{"use strict";a.exports=require("node:buffer")},5855:(a,t,n)=>{"use strict";n.r(t),n.d(t,{ComponentMod:()=>C,default:()=>b});var e={};n.r(e),n.d(e,{POST:()=>d,runtime:()=>l});var i={};n.r(i),n.d(i,{originalPathname:()=>g,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>h,serverHooks:()=>f,staticGenerationAsyncStorage:()=>y});var s=n(8842),o=n(2561),r=n(4828),c=n(6631),p=n(8079),u=n(6005);let l="edge";async function d(a){let{messages:t,userData:n}=await a.json(),e=`You are the Transaction Analysis Agent for the Chainweb ZK Reputation System. You specialize in deep analysis of blockchain transactions across DeFi (Chain 20), Gaming (Chain 21), and Development (Chain 22) domains on Kadena's Chainweb EVM.

Your expertise includes:
- Detailed transaction pattern analysis and anomaly detection
- Gas optimization and transaction efficiency analysis
- Smart contract interaction analysis
- Transaction timing and frequency optimization
- Cross-chain transaction correlation analysis
- MEV (Maximum Extractable Value) identification
- Transaction cost-benefit analysis

User Data Context: ${n?JSON.stringify(n):"No user data provided"}

Transaction Analysis Focus Areas:
- DeFi Chain: DEX trades, liquidity provisions, lending/borrowing, yield farming patterns
- Gaming Chain: NFT trades, game asset transfers, achievement unlocks, marketplace interactions
- Development Chain: Contract deployments, function calls, testing patterns, upgrade transactions

Key Metrics You Analyze:
- Transaction frequency and timing patterns
- Gas usage efficiency and optimization opportunities
- Value transfer patterns and amounts
- Smart contract interaction complexity
- Failed transaction analysis and prevention
- Transaction batching opportunities

Always provide detailed technical analysis with specific recommendations for transaction optimization. Use data-driven insights and explain the technical reasoning behind your analysis. Focus on helping users understand their transaction behavior and optimize for both cost and reputation impact.`;return(await (0,u.kP)({model:(0,p.fr)("gpt-4o-mini"),system:e,messages:t,maxTokens:1e3,temperature:.7})).toAIStreamResponse()}let h=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/chat/reputation-analysis/route",pathname:"/api/chat/reputation-analysis",filename:"route",bundlePath:"app/api/chat/reputation-analysis/route"},resolvedPagePath:"/Users/ayush/Documents/hackathons/croissant-eth/kadena_croissant/agents/app/api/chat/reputation-analysis/route.ts",nextConfigOutput:"",userland:e}),{requestAsyncStorage:m,staticGenerationAsyncStorage:y,serverHooks:f}=h,g="/api/chat/reputation-analysis/route";function v(){return(0,c.XH)({serverHooks:f,staticGenerationAsyncStorage:y})}let C=i,b=s.a.wrap(h)}},a=>{var t=t=>a(a.s=t);a.O(0,[763],()=>t(5855));var n=a.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/reputation-analysis/route"]=n}]);
//# sourceMappingURL=route.js.map