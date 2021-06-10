var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(t,a,s)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,r=(e,t)=>{for(var a in t||(t={}))n.call(t,a)&&i(e,a,t[a]);if(s)for(var a of s(t))o.call(t,a)&&i(e,a,t[a]);return e};import{c as l,a as u,r as p,g as c,d,H as g,L as m,U as h,u as A,b as _,e as f,w as v,f as k,h as E,o as S,i as y,j as b,k as L,l as I,m as C,F as O,n as P,I as w,A as D,s as B,p as $,q as J,S as U,t as H,v as j,x,M as Q,y as R,B as M,z as T,C as Y,D as G,E as F,T as q,R as W,G as N,J as V,K,N as Z,O as z,P as X,Q as ee,V as te,W as ae,X as se,Y as ne,Z as oe,_ as ie,$ as re,a0 as le}from"./vendor.f6cb48f4.js";let ue;const pe={},ce=function(e,t){if(!t)return e();if(void 0===ue){const e=document.createElement("link").relList;ue=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in pe)return;pe[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":ue,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))},de=[{name:"Home",path:"/",component:()=>ce((()=>import("./index.cbfd0717.js")),["/assets/index.cbfd0717.js","/assets/index.db66d5eb.css","/assets/vendor.f6cb48f4.js","/assets/globalTypes.4ad4b672.js","/assets/ListingCard.fe5ed947.js","/assets/index.c2480ec4.js"])},{name:"Listing",path:"/listing/:id",component:()=>ce((()=>import("./index.03e56137.js")),["/assets/index.03e56137.js","/assets/index.db66d5eb.css","/assets/vendor.f6cb48f4.js","/assets/index.c2480ec4.js","/assets/useVModel.443a5019.js"])},{name:"Listings",path:"/listings/:location?",component:()=>ce((()=>import("./index.110cd63e.js")),["/assets/index.110cd63e.js","/assets/index.db66d5eb.css","/assets/vendor.f6cb48f4.js","/assets/globalTypes.4ad4b672.js","/assets/useVModel.443a5019.js","/assets/ListingCard.fe5ed947.js","/assets/index.c2480ec4.js"])},{name:"User",path:"/user/:id",component:()=>ce((()=>import("./index.d4c26e20.js")),["/assets/index.d4c26e20.js","/assets/index.db66d5eb.css","/assets/vendor.f6cb48f4.js","/assets/index.c2480ec4.js","/assets/ListingCard.fe5ed947.js"])},{name:"Login",path:"/login",component:()=>ce((()=>import("./Login.16c809d7.js")),["/assets/Login.16c809d7.js","/assets/vendor.f6cb48f4.js"])},{name:"Stripe",path:"/stripe",component:()=>ce((()=>import("./Stripe.2505631e.js")),["/assets/Stripe.2505631e.js","/assets/vendor.f6cb48f4.js","/assets/index.c2480ec4.js"])},{name:"Host",path:"/host",component:()=>ce((()=>import("./Host.8596af41.js")),["/assets/Host.8596af41.js","/assets/vendor.f6cb48f4.js","/assets/globalTypes.4ad4b672.js","/assets/index.c2480ec4.js"])},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>ce((()=>import("./NotFound.e4db9d61.js")),["/assets/NotFound.e4db9d61.js","/assets/vendor.f6cb48f4.js"])}],ge=l({history:u(),routes:de}),me=p({id:null,avatar:null,token:null,hasWallet:null,didRequest:!1});function he(e){Object.assign(me,e)}const Ae=c`
  query AuthUrl {
    authUrl
  }
`,_e=c`
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
`,fe=c`
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
`;var Ie=d({name:"AppHeader",components:{HomeOutlined:g,LogoutOutlined:m,UserOutlined:h},setup(){const e=k(),{mutate:t,onDone:a,onError:s}=A(Ee);a((e=>{he(e.data.logout),sessionStorage.removeItem("token"),_.info("You 've successfully logged out!")})),s((()=>{_.error("Sorry we were'nt able to log you out. Please try again later!")}));const n=f(""),o=E();return v((()=>o.path),(e=>{e.includes("/listings")||(n.value=""),e.includes("/listings")&&o.params.location&&(n.value=o.params.location)})),{viewer:me,handleLogout:function(){t()},handleSearch:function(t){e.push(`/listings/${t}`)},search:n}}});const Ce={class:"app-header__logo-search-section"},Oe={class:"app-header__logo"},Pe=I("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABICAYAAACp+JiNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKtSURBVHgB7ZvPcdNAFMa/ZTjkhm/JLaYDUgFJBeAKCBUgVUCowKICSAemAlyCO8hySgwXc0ouZPn22WLEv4xs7W5g5vvNOJpV5Iz10763Ty+yO2hCQDrmV5U7QWb4mS+4GSMN/gEEJAGSYEgCJMGQBEiCIQmQBEMSIAmGJEASDEmAJBiSAEkwJAGSYEgCJMGQBEiCIQmQBOMh0jI+mIZTZIb/Mhs5pCO5BDi8Q2ZSCogoHCAJhiRAEgxJgCQYkgBJMCQBkmBIAiTBkARIgnGfEuZsDLz8FnAUtxx73BOp+wm9cAH1Ze2azq4FmzFz5zBlw+Q5ClN+JvCq/yLAuKqdv+bv2DCZoTDFJPAKr/jjhCf7/m/HrGq3uqzchDPlLQpSSoK/XQuY9zmYM6WisDcoRAkJPs6AL7VbbPMmCjsrJSKrBMb3YhMCHjsQRXAGTSyUMpJPQsD59QABLZ9rN4uhhIxLaBYJgYmNJ38aEx0SYKGUUUR6CYzjZUxsibEZlUlEUgmxCLKEloko4oYVZoi5JiFJJGxqgD8WQamJIbas3FHKWiJF2RxrgEmfJXA0DaM9btrxDc8pnhRL5nH3uD7JNNYSfN+KS9BrDGToTNiqBqCAhh/6on1xvM4dDh+7+3lyx33+Xgw9JuEaAxkiwSPBEjgUJuHG7kQHJMydJbj1MujxDxBn4u2AGbFzTggOr/abcEgZXzu7/V03SDGBus4V61SCHlsQn4HYPKMwYvgccteY4yfYEaevCcMXbarYUywOT9sxp/CHWBbvT0PDhsqjHwey4CoZaqU7S8d8vWgHTEifuJlRwDP8fGXPUbDdpkYrJMEoGg6sEKu9gLPO2FaHeNfpOpUkCneei0rY3Fr/dnu9LHDPcRcKB0iCIQmQBEMSEFeHgMf431j3GpPxHWSq7xBvwxLFAAAAAElFTkSuQmCC",alt:"App logo"},null,-1),we={class:"app-header__search-input"},De={class:"app-header__menu-section"},Be=C(" Host "),$e=C(" Profile "),Je=C(" Log out "),Ue=C(" Sign In ");Ie.render=function(e,t,a,s,n,o){const i=L("router-link"),r=L("a-input-search"),l=L("HomeOutlined"),u=L("a-menu-item"),p=L("a-avatar"),c=L("UserOutlined"),d=L("LogoutOutlined"),g=L("a-sub-menu"),m=L("a-button"),h=L("a-menu"),A=L("a-layout-header");return S(),y(A,{class:"app-header"},{default:b((()=>[I("div",Ce,[I("div",Oe,[I(i,{to:"/"},{default:b((()=>[Pe])),_:1})]),I("div",we,[I(r,{value:e.search,"onUpdate:value":t[1]||(t[1]=t=>e.search=t),placeholder:"Search 'San Fransisco'","enter-button":"",onSearch:e.handleSearch},null,8,["value","onSearch"])])]),I("div",De,[I(h,{mode:"horizontal",selectable:!1,class:"menu"},{default:b((()=>[I(u,{key:"/host"},{default:b((()=>[I(i,{to:"/host"},{default:b((()=>[I(l),Be])),_:1})])),_:1}),e.viewer.id&&e.viewer.avatar?(S(),y(g,{key:0},{title:b((()=>[I(p,{src:e.viewer.avatar},null,8,["src"])])),default:b((()=>[I(u,{key:"/user"},{default:b((()=>[I(i,{to:`/user/${e.viewer.id}`},{default:b((()=>[I(c),$e])),_:1},8,["to"])])),_:1}),I(u,{key:"/logout"},{default:b((()=>[I("div",{onClick:t[2]||(t[2]=(...t)=>e.handleLogout&&e.handleLogout(...t))},[I(d),Je])])),_:1})])),_:1})):(S(),y(u,{key:1},{default:b((()=>[I(i,{to:"/login"},{default:b((()=>[I(m,{type:"primary"},{default:b((()=>[Ue])),_:1})])),_:1})])),_:1}))])),_:1})])])),_:1})};var He=d({name:"App",components:{AppHeader:Ie},setup(){const{mutate:e,loading:t,onDone:a,onError:s}=A(ke);return e(),s((e=>{console.log(e)})),a((e=>{he(e.data.login),console.log(e.data.login),e.data.login.token?sessionStorage.setItem("token",e.data.login.token):sessionStorage.removeItem("token")})),{loading:t}}});const je={key:0,class:"app-skeleton__spin-section"};He.render=function(e,t,a,s,n,o){const i=L("a-spin"),r=L("AppHeader"),l=L("a-affix"),u=L("router-view"),p=L("a-layout");return S(),y(p,{class:"app"},{default:b((()=>[e.loading?(S(),y("div",je,[I(i,{size:"large",tip:"Launching Tinyhouse"})])):(S(),y(O,{key:1},[I(l,{"offset-top":0,class:"app_affix-header"},{default:b((()=>[I(r)])),_:1}),I(u,{key:e.$route.fullPath})],64))])),_:1})};const xe=P({uri:"/api",credentials:"include"}),Qe=B(((e,{headers:s})=>{const n=sessionStorage.getItem("token");return{headers:(o=r({},s),i={"X-CSRF-TOKEN":n||""},t(o,a(i)))};var o,i})),Re=new w,Me=new D({link:Qe.concat(xe),cache:Re});const Te={props:{message:{type:String,default:"Uh oh! Something went wrong :("},description:{type:String,default:"Looks like something went wrong. Please check your connection and/or try again later."}}};Te.render=function(e,t,a,s,n,o){const i=L("a-alert");return S(),y(i,{banner:"",closable:"",message:a.message,description:a.description,type:"error",class:"error-banner"},null,8,["message","description"])};const Ye={};Ye.render=function(e,t){const a=L("a-skeleton");return S(),y("div",null,[I(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"}),I(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"}),I(a,{active:"",paragraph:{rows:4},class:"page-skeleton__paragraph"})])};const Ge=$({setup(){re(le,Me)},render:()=>ie(He)});Ge.use(J),Ge.use(U),Ge.use(H),Ge.use(j),Ge.use(x),Ge.use(Q),Ge.use(R),Ge.use(M),Ge.use(T),Ge.use(Y),Ge.use(G),Ge.use(F),Ge.use(q),Ge.use(W),Ge.use(N),Ge.use(V),Ge.use(K),Ge.use(Z),Ge.use(z),Ge.use(X),Ge.use(ee),Ge.use(te),Ge.use(ae),Ge.use(se),Ge.use(ne),Ge.use(oe),Ge.use(ge),Ge.component("ErrorBanner",Te),Ge.component("PageSkeleton",Ye),Ge.mount("#app");export{Ae as A,Se as C,be as D,Le as H,fe as L,ve as U,_e as a,ke as b,ye as c,he as s,me as v};
