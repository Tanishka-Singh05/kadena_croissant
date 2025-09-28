(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[571],{2067:e=>{"use strict";e.exports=require("node:async_hooks")},6195:e=>{"use strict";e.exports=require("node:buffer")},5886:(e,o,i)=>{"use strict";i.r(o),i.d(o,{ComponentMod:()=>k,default:()=>w});var t={};i.r(t),i.d(t,{POST:()=>l,runtime:()=>d});var r={};i.r(r),i.d(r,{originalPathname:()=>m,patchFetch:()=>y,requestAsyncStorage:()=>h,routeModule:()=>f,serverHooks:()=>v,staticGenerationAsyncStorage:()=>g});var a=i(8842),n=i(2561),s=i(4828),c=i(6631),p=i(8079),u=i(6005);let d="edge";async function l(e){let{messages:o,userData:i}=await e.json(),t=`You are the ZK Proof Advisor Agent for the Chainweb ZK Reputation System. You specialize in zero-knowledge proofs, privacy-preserving reputation verification, and the Self Protocol identity integration.

Your expertise includes:
- Zero-knowledge proof concepts and applications
- Privacy-preserving reputation verification
- Self Protocol identity verification (50% bonus scoring)
- Circom circuit design and optimization
- Sindri proof generation workflows
- Hedera consensus anchoring strategies

User Data Context: ${i?JSON.stringify(i):"No user data provided"}

Key Privacy Features:
- ZK proofs hide transaction details while proving reputation
- Self Protocol provides human verification without revealing PII
- Cross-chain proof aggregation maintains privacy
- Hedera anchoring ensures proof immutability

Identity Verification Benefits:
- 50% bonus multiplier (1.5x) on all reputation scores
- Age verification (18+) for DeFi derivative trading
- Geographic compliance for gaming restrictions
- OFAC compliance for development protocols

Your role is to:
1. Explain ZK proof concepts in accessible terms
2. Guide users through identity verification processes
3. Recommend privacy optimization strategies
4. Explain the technical benefits of different proof types
5. Help troubleshoot proof generation issues

Always prioritize user privacy and security. Explain complex concepts clearly while maintaining technical accuracy. Use an educational, trustworthy tone.`;return(await (0,u.kP)({model:(0,p.fr)("gpt-4o-mini"),system:t,messages:o,maxTokens:1e3,temperature:.6})).toAIStreamResponse()}let f=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/chat/zk-proof-advisor/route",pathname:"/api/chat/zk-proof-advisor",filename:"route",bundlePath:"app/api/chat/zk-proof-advisor/route"},resolvedPagePath:"/Users/ayush/Documents/hackathons/croissant-eth/kadena_croissant/agents/app/api/chat/zk-proof-advisor/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:h,staticGenerationAsyncStorage:g,serverHooks:v}=f,m="/api/chat/zk-proof-advisor/route";function y(){return(0,c.XH)({serverHooks:v,staticGenerationAsyncStorage:g})}let k=r,w=a.a.wrap(f)}},e=>{var o=o=>e(e.s=o);e.O(0,[763],()=>o(5886));var i=e.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/zk-proof-advisor/route"]=i}]);
//# sourceMappingURL=route.js.map