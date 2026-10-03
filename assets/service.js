/* Stateless bearer-token client. Authorisation and grading are enforced in Postgres, not here. */
(function(root){
'use strict';
const cfg=root.EV_SERVICE||{},KEY='thangotech.ev.auth.v2';let session=null;
try{session=JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(_){}
function configured(){return /^https:\/\/[^/]+\.supabase\.co\/?$/.test(cfg.url||'')&&String(cfg.publishableKey||'').startsWith('sb_publishable_');}
function save(s){session=s&&s.access_token?s:null;if(session&&!session.expires_at)session.expires_at=Math.floor(Date.now()/1000)+(s.expires_in||3600);try{if(session)sessionStorage.setItem(KEY,JSON.stringify(session));else sessionStorage.removeItem(KEY);}catch(_){}root.dispatchEvent(new Event('ev-auth-change'));return session;}
async function raw(path,body,{token=null,method='POST',binary=false}={}){
 if(!configured())throw Error('The secure programme service is not configured. Notes remain available; no registration data has been sent.');
 const headers={apikey:cfg.publishableKey};if(token)headers.Authorization='Bearer '+token;if(body!==undefined)headers['Content-Type']='application/json';
 const res=await fetch(cfg.url.replace(/\/$/,'')+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),cache:'no-store',credentials:'omit'});
 if(!res.ok){let data={};try{data=await res.json();}catch(_){}throw Error(data.message||data.msg||data.error_description||data.error||'The request could not be completed ('+res.status+').');}
 if(binary)return res.blob();if(res.status===204)return null;return res.json();
}
async function token(){if(!session?.access_token)throw Error('Sign in to continue.');if(session.expires_at*1000<Date.now()+30000){if(!session.refresh_token){save(null);throw Error('Sign in again.');}try{save(await raw('/auth/v1/token?grant_type=refresh_token',{refresh_token:session.refresh_token}));}catch(error){save(null);throw error;}}return session.access_token;}
async function rpc(name,p={},required=true){return raw('/rest/v1/rpc/'+name,p,{token:required?await token():null});}
async function otp(email){return raw('/auth/v1/otp',{email,create_user:true});}
async function verify(email,code){return save(await raw('/auth/v1/verify',{email,token:code,type:'email'}));}
async function user(){return raw('/auth/v1/user',undefined,{method:'GET',token:await token()});}
async function logout(){try{if(session)await raw('/auth/v1/logout',{}, {token:await token()});}finally{save(null);}}
async function mfaEnroll(){return raw('/auth/v1/factors',{factor_type:'totp',friendly_name:'EV programme owner',issuer:'Thangotech Engineering'},{token:await token()});}
async function mfaVerify(id,code){const a=await raw('/auth/v1/factors/'+encodeURIComponent(id)+'/challenge',{}, {token:await token()});const b=await raw('/auth/v1/factors/'+encodeURIComponent(id)+'/verify',{challenge_id:a.id,code},{token:await token()});return save(b);}
async function certificate(){return raw('/functions/v1/'+encodeURIComponent(cfg.certificateFunction||'issue-certificate'),{}, {token:await token(),binary:true});}
function download(name,blob){const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);}
root.EVService={configured,rpc,otp,verify,user,logout,mfaEnroll,mfaVerify,certificate,download,get signedIn(){return !!session?.access_token;}};
})(window);
