var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,r=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&i(e,a,t[a]);if(s)for(var a of s(t))o.call(t,a)&&i(e,a,t[a]);return e};import{c as l,a as u,r as p,g as c,b as d,d as g,e as m,H as h,L as A,U as f,u as _,f as v,w as k,h as E,i as S,o as y,j as b,k as L,l as I,m as C,n as O,F as P,p as w,I as $,A as D,s as B,q as J,t as U,S as H,v as j,x,y as Q,M,z as R,B as T,C as Y,D as G,E as F,G as q,T as W,R as N,J as V,K,N as Z,O as z,P as X,Q as ee,V as te,W as ae,X as se,Y as ne,Z as oe,_ as ie,$ as re,a0 as le}from"./vendor.1cb7f2f0.js";let ue;const pe={},ce=function(e,t){if(!t)return e();if(void 0===ue){const e=document.createElement("link").relList;ue=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in pe)return;pe[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":ue,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))},de=[{name:"Home",path:"/",component:()=>ce((()=>import("./index.43112dd4.js")),["/assets/index.43112dd4.js","/assets/index.db66d5eb.css","/assets/vendor.1cb7f2f0.js","/assets/globalTypes.4ad4b672.js","/assets/ListingCard.8d34f804.js"])},{name:"Listing",path:"/listing/:id",component:()=>ce((()=>import("./index.0acea467.js")),["/assets/index.0acea467.js","/assets/index.db66d5eb.css","/assets/vendor.1cb7f2f0.js","/assets/useVModel.7626bf3e.js"])},{name:"Listings",path:"/listings/:location",component:()=>ce((()=>import("./index.97101db4.js")),["/assets/index.97101db4.js","/assets/index.db66d5eb.css","/assets/vendor.1cb7f2f0.js","/assets/globalTypes.4ad4b672.js","/assets/useVModel.7626bf3e.js","/assets/ListingCard.8d34f804.js"])},{name:"User",path:"/user/:id",component:()=>ce((()=>import("./index.b1bfeb63.js")),["/assets/index.b1bfeb63.js","/assets/index.db66d5eb.css","/assets/vendor.1cb7f2f0.js","/assets/ListingCard.8d34f804.js"])},{name:"Login",path:"/login",component:()=>ce((()=>import("./Login.767820f0.js")),["/assets/Login.767820f0.js","/assets/vendor.1cb7f2f0.js"])},{name:"Stripe",path:"/stripe",component:()=>ce((()=>import("./Stripe.da8b22f2.js")),["/assets/Stripe.da8b22f2.js","/assets/vendor.1cb7f2f0.js"])},{name:"Host",path:"/host",component:()=>ce((()=>import("./Host.ee0f3512.js")),["/assets/Host.ee0f3512.js","/assets/vendor.1cb7f2f0.js","/assets/globalTypes.4ad4b672.js"])},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>ce((()=>import("./NotFound.ca108bee.js")),["/assets/NotFound.ca108bee.js","/assets/vendor.1cb7f2f0.js"])}],ge=l({history:u(),routes:de}),me=p({id:null,avatar:null,token:null,hasWallet:null,didRequest:!1});function he(e){Object.assign(me,e)}const Ae=c`
  query AuthUrl {
    authUrl
  }
`,fe=c`
  query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      id
      title
      description
      image
      host {
        id
        name
        avatar
        hasWallet
      }
      type
      address
      city
      bookings(page: $bookingsPage, limit: $limit) {
        total
        result {
          id
          tenant {
            id
            name
            avatar
          }
          checkIn
          checkOut
        }
      }
      bookingsIndex
      price
      numOfGuests
    }
  }
`,_e=c`
  query Listings(
    $location: String
    $filter: ListingsFilter!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, filter: $filter, limit: $limit, page: $page) {
      region
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`,ve=c`
  query User($id: ID!, $bookingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      income
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          listing {
            id
            title
            image
            address
            price
            numOfGuests
          }
          checkIn
          checkOut
        }
      }
      listings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          title
          image
          address
          price
          numOfGuests
        }
      }
    }
  }
`,ke=c`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`,Ee=c`
  mutation Logout {
    logout {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`,Se=c`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`,ye=c`
  mutation ConnectStripe($input: ConnectStripeInput!) {
    connectStripe(input: $input) {
      hasWallet
    }
  }
`,be=c`
mutation DisconnectStripe {
  disconnectStripe {
    hasWallet
  }
}
`,Le=c`
mutation HostListing($input: HostListingInput!) {
  hostListing(input: $input) {
    id
  }
}
`,Ie="#1890ff",Ce=(e,t=!0)=>`$${t?Math.round(e/100):e/100}`,Oe=(e,t)=>d.success({message:e,description:t,placement:"topLeft",duration:10,style:{marginTop:50}}),Pe=e=>g.error(e,10);var we=m({name:"AppHeader",components:{HomeOutlined:h,LogoutOutlined:A,UserOutlined:f},setup(){const e=E(),{mutate:t,onDone:a,onError:s}=_(Ee);a((e=>{he(e.data.logout),sessionStorage.removeItem("token"),g.info("You 've successfully logged out!")})),s((()=>{g.error("Sorry we were'nt able to log you out. Please try again later!")}));const n=v(""),o=S();return k((()=>o.path),(e=>{e.includes("/listings")||(n.value=""),e.includes("/listings")&&o.params.location&&(n.value=o.params.location)})),{viewer:me,handleLogout:function(){t()},handleSearch:function(t){t.trim()?e.push(`/listings/${t}`):Pe("Please enter a valid search!")},search:n}}});const $e={class:"app-header__logo-search-section"},De={class:"app-header__logo"},Be=C("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABICAYAAACp+JiNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKtSURBVHgB7ZvPcdNAFMa/ZTjkhm/JLaYDUgFJBeAKCBUgVUCowKICSAemAlyCO8hySgwXc0ouZPn22WLEv4xs7W5g5vvNOJpV5Iz10763Ty+yO2hCQDrmV5U7QWb4mS+4GSMN/gEEJAGSYEgCJMGQBEiCIQmQBEMSIAmGJEASDEmAJBiSAEkwJAGSYEgCJMGQBEiCIQmQBOMh0jI+mIZTZIb/Mhs5pCO5BDi8Q2ZSCogoHCAJhiRAEgxJgCQYkgBJMCQBkmBIAiTBkARIgnGfEuZsDLz8FnAUtxx73BOp+wm9cAH1Ze2azq4FmzFz5zBlw+Q5ClN+JvCq/yLAuKqdv+bv2DCZoTDFJPAKr/jjhCf7/m/HrGq3uqzchDPlLQpSSoK/XQuY9zmYM6WisDcoRAkJPs6AL7VbbPMmCjsrJSKrBMb3YhMCHjsQRXAGTSyUMpJPQsD59QABLZ9rN4uhhIxLaBYJgYmNJ38aEx0SYKGUUUR6CYzjZUxsibEZlUlEUgmxCLKEloko4oYVZoi5JiFJJGxqgD8WQamJIbas3FHKWiJF2RxrgEmfJXA0DaM9btrxDc8pnhRL5nH3uD7JNNYSfN+KS9BrDGToTNiqBqCAhh/6on1xvM4dDh+7+3lyx33+Xgw9JuEaAxkiwSPBEjgUJuHG7kQHJMydJbj1MujxDxBn4u2AGbFzTggOr/abcEgZXzu7/V03SDGBus4V61SCHlsQn4HYPKMwYvgccteY4yfYEaevCcMXbarYUywOT9sxp/CHWBbvT0PDhsqjHwey4CoZaqU7S8d8vWgHTEifuJlRwDP8fGXPUbDdpkYrJMEoGg6sEKu9gLPO2FaHeNfpOpUkCneei0rY3Fr/dnu9LHDPcRcKB0iCIQmQBEMSEFeHgMf431j3GpPxHWSq7xBvwxLFAAAAAElFTkSuQmCC",alt:"App logo"},null,-1),Je={class:"app-header__search-input"},Ue={class:"app-header__menu-section"},He=O(" Host "),je=O(" Profile "),xe=O(" Log out "),Qe=O(" Sign In ");we.render=function(e,t,a,s,n,o){const i=I("router-link"),r=I("a-input-search"),l=I("HomeOutlined"),u=I("a-menu-item"),p=I("a-avatar"),c=I("UserOutlined"),d=I("LogoutOutlined"),g=I("a-sub-menu"),m=I("a-button"),h=I("a-menu"),A=I("a-layout-header");return y(),b(A,{class:"app-header"},{default:L((()=>[C("div",$e,[C("div",De,[C(i,{to:"/"},{default:L((()=>[Be])),_:1})]),C("div",Je,[C(r,{value:e.search,"onUpdate:value":t[1]||(t[1]=t=>e.search=t),placeholder:"Search 'San Fransisco'","enter-button":"",onSearch:e.handleSearch},null,8,["value","onSearch"])])]),C("div",Ue,[C(h,{mode:"horizontal",selectable:!1,class:"menu"},{default:L((()=>[C(u,{key:"/host"},{default:L((()=>[C(i,{to:"/host"},{default:L((()=>[C(l),He])),_:1})])),_:1}),e.viewer.id&&e.viewer.avatar?(y(),b(g,{key:0},{title:L((()=>[C(p,{src:e.viewer.avatar},null,8,["src"])])),default:L((()=>[C(u,{key:"/user"},{default:L((()=>[C(i,{to:`/user/${e.viewer.id}`},{default:L((()=>[C(c),je])),_:1},8,["to"])])),_:1}),C(u,{key:"/logout"},{default:L((()=>[C("div",{onClick:t[2]||(t[2]=(...t)=>e.handleLogout&&e.handleLogout(...t))},[C(d),xe])])),_:1})])),_:1})):(y(),b(u,{key:1},{default:L((()=>[C(i,{to:"/login"},{default:L((()=>[C(m,{type:"primary"},{default:L((()=>[Qe])),_:1})])),_:1})])),_:1}))])),_:1})])])),_:1})};var Me=m({name:"App",components:{AppHeader:we},setup(){const{mutate:e,loading:t,onDone:a,onError:s}=_(ke);return e(),s((e=>{console.log(e)})),a((e=>{he(e.data.login),console.log(e.data.login),e.data.login.token?sessionStorage.setItem("token",e.data.login.token):sessionStorage.removeItem("token")})),{loading:t}}});const Re={key:0,class:"app-skeleton__spin-section"};Me.render=function(e,t,a,s,n,o){const i=I("a-spin"),r=I("AppHeader"),l=I("a-affix"),u=I("router-view"),p=I("a-layout");return y(),b(p,{class:"app"},{default:L((()=>[e.loading?(y(),b("div",Re,[C(i,{size:"large",tip:"Launching Tinyhouse"})])):(y(),b(P,{key:1},[C(l,{"offset-top":0,class:"app_affix-header"},{default:L((()=>[C(r)])),_:1}),C(u,{key:e.$route.fullPath})],64))])),_:1})};const Te=w({uri:"/api",credentials:"include"}),Ye=B(((e,{headers:s})=>{const n=sessionStorage.getItem("token");return{headers:(o=r({},s),i={"X-CSRF-TOKEN":n||""},t(o,a(i)))};var o,i})),Ge=new $,Fe=new D({link:Ye.concat(Te),cache:Ge});const qe={props:{message:{type:String,default:"Uh oh! Something went wrong :("},description:{type:String,default:"Looks like something went wrong. Please check your connection and/or try again later."}}};qe.render=function(e,t,a,s,n,o){const i=I("a-alert");return y(),b(i,{banner:"",closable:"",message:a.message,description:a.description,type:"error",class:"error-banner"},null,8,["message","description"])};const We={};We.render=function(e,t){const a=I("a-skeleton");return y(),b("div",null,[C(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"}),C(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"}),C(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"})])};const Ne=J({setup(){re(le,Fe)},render:()=>ie(Me)});Ne.use(U),Ne.use(H),Ne.use(j),Ne.use(x),Ne.use(Q),Ne.use(M),Ne.use(R),Ne.use(T),Ne.use(Y),Ne.use(G),Ne.use(F),Ne.use(q),Ne.use(W),Ne.use(N),Ne.use(V),Ne.use(K),Ne.use(Z),Ne.use(z),Ne.use(X),Ne.use(ee),Ne.use(te),Ne.use(ae),Ne.use(se),Ne.use(ne),Ne.use(oe),Ne.use(ge),Ne.component("ErrorBanner",qe),Ne.component("PageSkeleton",We),Ne.mount("#app");export{Ae as A,Se as C,be as D,Le as H,_e as L,ve as U,Oe as a,fe as b,ke as c,Pe as d,ye as e,Ce as f,Ie as i,he as s,me as v};
