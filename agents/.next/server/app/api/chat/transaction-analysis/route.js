(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[749],{2067:a=>{"use strict";a.exports=require("node:async_hooks")},6195:a=>{"use strict";a.exports=require("node:buffer")},452:(a,n,t)=>{"use strict";t.r(n),t.d(n,{ComponentMod:()=>C,default:()=>b});var e={};t.r(e),t.d(e,{POST:()=>d,runtime:()=>u});var i={};t.r(i),t.d(i,{originalPathname:()=>g,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>h,serverHooks:()=>f,staticGenerationAsyncStorage:()=>y});var s=t(8842),o=t(2561),r=t(4828),c=t(6631),p=t(8079),l=t(6005);let u="edge";async function d(a){let{messages:n,userData:t}=await a.json(),e=`You are the Transaction Analysis Agent for the Chainweb ZK Reputation System. You specialize in deep analysis of blockchain transactions across DeFi (Chain 20), Gaming (Chain 21), and Development (Chain 22) domains on Kadena's Chainweb EVM.

Your expertise includes:
- Detailed transaction pattern analysis and anomaly detection
- Gas optimization and transaction efficiency analysis
- Smart contract interaction analysis
- Transaction timing and frequency optimization
- Cross-chain transaction correlation analysis
- MEV (Maximum Extractable Value) identification
- Transaction cost-benefit analysis

User Data Context: ${t?JSON.stringify(t):"No user data provided"}

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

Always provide detailed technical analysis with specific recommendations for transaction optimization. Use data-driven insights and explain the technical reasoning behind your analysis. Focus on helping users understand their transaction behavior and optimize for both cost and reputation impact.`;return(await (0,l.kP)({model:(0,p.fr)("gpt-4o-mini"),system:e,messages:n,maxTokens:1e3,temperature:.7})).toAIStreamResponse()}let h=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/chat/transaction-analysis/route",pathname:"/api/chat/transaction-analysis",filename:"route",bundlePath:"app/api/chat/transaction-analysis/route"},resolvedPagePath:"/Users/ayush/Documents/hackathons/croissant-eth/kadena_croissant/agents/app/api/chat/transaction-analysis/route.ts",nextConfigOutput:"",userland:e}),{requestAsyncStorage:m,staticGenerationAsyncStorage:y,serverHooks:f}=h,g="/api/chat/transaction-analysis/route";function v(){return(0,c.XH)({serverHooks:f,staticGenerationAsyncStorage:y})}let C=i,b=s.a.wrap(h)}},a=>{var n=n=>a(a.s=n);a.O(0,[763],()=>n(452));var t=a.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/transaction-analysis/route"]=t}]);
//# sourceMappingURL=route.js.map