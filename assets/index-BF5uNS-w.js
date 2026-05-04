import{initializeApp as e}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";import{GoogleAuthProvider as t,getAuth as n,onAuthStateChanged as r,signInAnonymously as i,signInWithPopup as a,signOut as o}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.addEventListener(`load`,()=>{let e=document.querySelector(`.preloader`),t=document.getElementById(`content`),n=document.querySelector(`.progress-ring__circle`),r=n.r.baseVal.value,i=2*Math.PI*r;n.style.strokeDasharray=`${i} ${i}`,n.style.strokeDashoffset=i;let a=0,o=setInterval(()=>{a+=1;let r=i-a/100*i;n.style.strokeDashoffset=r,a>=100&&(clearInterval(o),e.style.transition=`opacity 1s ease`,e.style.opacity=`0`,setTimeout(()=>{e.style.display=`none`,t.style.display=`block`,document.body.style.overflow=`auto`},1e3))},15)});var s=document.querySelector(`.country`);countryInput.addEventListener(`click`,()=>{countryList.classList.toggle(`open`),s.classList.toggle(`open`)});var c=n(e({apiKey:`AIzaSyC4NsRRqrPTkrffod7c5jsM1QSRJvpVe0w`,authDomain:`events-project-21e9a.firebaseapp.com`,projectId:`events-project-21e9a`,storageBucket:`events-project-21e9a.appspot.com`,messagingSenderId:`480946051710`,appId:`1:480946051710:web:76486820763f85d427162f`})),l=document.querySelector(`.sign-in-button`),u=document.querySelector(`.auth-container`);l.addEventListener(`click`,()=>{u.classList.toggle(`open`),u.classList.contains(`open`)?l.textContent=`Close`:l.textContent=`Sign in`});var d=document.querySelector(`.google`),f=document.querySelector(`.guest`);d.addEventListener(`click`,()=>{a(c,new t)}),f.addEventListener(`click`,()=>{i(c)});var p=document.querySelector(`.user-name`),m=document.querySelector(`.user-info`),h=document.querySelector(`.logout`);r(c,e=>{e?(m.classList.add(`active`),p.textContent=e.displayName||`Guest user`):m.classList.remove(`active`)}),h.addEventListener(`click`,()=>{o(c)});var g=document.querySelector(`.user-photo`),_=document.querySelector(`.auth-wrapper`),v=document.querySelector(`.user-display-name`);r(c,e=>{if(e){m.classList.add(`active`),_.classList.add(`logged-in`),u.classList.remove(`open`);let t=``;t=e.isAnonymous?`Guest_${e.uid.slice(-4).toUpperCase()}`:e.displayName?e.displayName:e.email?e.email.split(`@`)[0]:`User`,v.textContent=t,e.photoURL?g.src=e.photoURL:g.src=`https://ui-avatars.com/api/?name=${t.charAt(0).toUpperCase()}&background=${e.isAnonymous?`7b1fa2`:`34495e`}&color=fff&size=128`}else m.classList.remove(`active`),_.classList.remove(`logged-in`)});var y=`Q8bHL81HES4CjxatVZAVSQWYyAffYhbQ`,b=`YOUR_GOOGLE_MAPS_API_KEY`,x=document.querySelector(`.events-list`),S=document.getElementById(`pagination`),C=document.querySelector(`[data-modal]`),w=document.querySelector(`.modal__wrap`),ee=document.querySelector(`[data-close]`),T=document.body,E=document.querySelector(`.header__input[placeholder="Start searching"]`),D=document.querySelector(`.country`),O=document.getElementById(`countryInput`),k=document.querySelector(`.country-list`),A=``,j=`US`,M=0,N=0,P,F=[{name:`United States`,code:`US`},{name:`Germany`,code:`DE`},{name:`United Kingdom`,code:`GB`},{name:`France`,code:`FR`},{name:`Spain`,code:`ES`},{name:`Italy`,code:`IT`},{name:`Australia`,code:`AU`},{name:`Canada`,code:`CA`},{name:`Argentina`,code:`AR`},{name:`Austria`,code:`AT`},{name:`Belgium`,code:`BE`},{name:`Brazil`,code:`BR`},{name:`Netherlands`,code:`NL`},{name:`Poland`,code:`PL`},{name:`Sweden`,code:`SE`},{name:`Switzerland`,code:`CH`},{name:`Ukraine`,code:`UA`},{name:`Denmark`,code:`DK`},{name:`Finland`,code:`FI`},{name:`Norway`,code:`NO`},{name:`Portugal`,code:`PT`},{name:`Ireland`,code:`IE`},{name:`Mexico`,code:`MX`},{name:`New Zealand`,code:`NZ`},{name:`Czech Republic`,code:`CZ`},{name:`Hungary`,code:`HU`}];function I(){k.innerHTML=F.map(e=>`<li data-code="${e.code}">${e.name}</li>`).join(``)}I(),O.addEventListener(`click`,()=>{D.classList.toggle(`open`),k.classList.toggle(`open`)}),k.addEventListener(`click`,e=>{if(e.target.tagName!==`LI`)return;let t=e.target.dataset.code;O.value=e.target.textContent,j=t,k.classList.remove(`open`),D.classList.remove(`open`),L(0)}),document.addEventListener(`click`,e=>{e.target.closest(`.country`)||(k.classList.remove(`open`),D.classList.remove(`open`))}),E.addEventListener(`input`,()=>{clearTimeout(P),P=setTimeout(()=>{A=E.value.trim(),L(0)},500)});async function L(e=0){let t=`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${y}&countryCode=${j}&keyword=${A}&size=20&page=${e}`;try{let n=await(await fetch(t)).json(),r=n._embedded?.events||[];if(N=Math.min(n.page?.totalPages||0,29),M=e,r.length===0){R(),S.innerHTML=``;return}te(r),re()}catch(e){console.error(e)}}function R(){x.classList.add(`no-events`),x.innerHTML=`
    <div class="zero-matches">
    <img class="zero-matches__img" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8ZGVmcz4KICA8Y2xpcFBhdGggaWQ9ImEiPgogICA8cGF0aCBkPSJtMTYyIDEzOS4yMWg0Mjh2NDczLjU4aC00Mjh6Ii8+CiAgPC9jbGlwUGF0aD4KIDwvZGVmcz4KIDxnIGNsaXAtcGF0aD0idXJsKCNhKSI+CiAgPHBhdGggZD0ibTM4My42NSAyNDguNzNjLTczLjgxMi0yNC44ODctMTM1LjAyLTY0Ljc0Mi0xNzUtMTA5LjUyLTEyOC40IDM5Mi42MSA1My40MjYgNDcwLjAzIDUzLjQyNiA0NzAuMDNzMTg2Ljg0IDYzIDMyNy4xOC0zNDEuNjdjLTU4LjkzOCAxMS40MS0xMzEuNzkgNi4wNTA4LTIwNS42LTE4Ljg0NHptLTExMC41OSA3NC44ODNjMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc5NyA1MC42NDggMCAwLTE4LjM5NS0yNi0zOC43ODUtMzIuODc1LTIwLjM5MS02Ljg3NS01MC43NzcgMi42NzE5LTUwLjc3NyAyLjY3MTkgMTYuMDA0LTE4LjIzOCAzNy41NjYtMjYuOTI2IDU2Ljc2Ni0yMC40NDV6bTM2Ljg3NSAxNDMuNzFjLTQ4LjA1NS0xNi4yMDctMTE1Ljg5LTQuODM1OS0xMTUuODktNC44MzU5IDMzLjIzLTI5LjY5NSA4MS4wMi00MS4xODQgMTI2LjI3LTI1LjkzIDQ1LjI0NiAxNS4yNjIgNzYuMzA5IDUzLjM0OCA4NC43NzcgOTcuMDk4IDAuMDAzOTA3IDAuMDA3ODEyLTQ3LjA5NC01MC4xMjUtOTUuMTQ4LTY2LjMzMnptMTEwLjM4LTc0LjI1NGMtMjAuMzk4LTYuODc1LTUwLjc3NyAyLjY3MTktNTAuNzc3IDIuNjcxOSAxNi4wMDQtMTguMjM4IDM3LjU3LTI2LjkyMiA1Ni43Ny0yMC40NDUgMTkuMjAzIDYuNDcyNyAzMS4xMDIgMjYuNDQ1IDMyLjc4OSA1MC42NDggMC4wMDc4MTIgMC0xOC4zODMtMjYtMzguNzgxLTMyLjg3NXoiIGZpbGw9IiNkYzU1YzUiLz4KIDwvZz4KPC9zdmc+Cg==" alt="Drama Theatre Of Ancient Greece Comedy Mask - Theatre Masks">
      <p class="zero-matches__text">
        Sorry. We couldn't find any matches
      </p>
    </div>
  `}function te(e){x.classList.remove(`no-events`),x.innerHTML=e.map(e=>{let t=e.images?.[0]?.url||``,n=e.name||``,r=e.dates?.start?.localDate||``,i=e._embedded?.venues?.[0]||{},a=i.name||``,o=i.location?.latitude||``,s=i.location?.longitude||``;return`
      <li class="event-card" data-id="${e.id}">
        <img class="event-img" src="${t}" alt="${n}">
        <h3 class="event-title">${n}</h3>
        <p class="event-date">${r}</p>

        <p class="event-place"
           data-lat="${o}"
           data-lng="${s}"
           data-place="${a}">
          ${a}
          

          <svg class="event-svg" width="7" height="10" viewBox="0 0 7 10">
            <path d="M3.5 0C1.57 0 0 1.56 0 3.47C0 5.88 3.5 10 3.5 10C3.5 10 7 5.76 7 3.47C7 1.56 5.43 0 3.5 0Z" fill="white"/>
          </svg>

        </p>
      </li>
    `}).join(``),ne()}function ne(){document.querySelectorAll(`.event-place`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.lat,n=e.dataset.lng,r=e.dataset.place;C.classList.remove(`is-hidden`),T.style.overflow=`hidden`,t&&n?w.innerHTML=`
          <h3 style="color:#fff">${r}</h3>

          <iframe
            width="100%"
            height="400"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/place?key=${b}&q=${t},${n}">
          </iframe>
        `:w.innerHTML=`
          <h3>${r}</h3>
          <p style="color:#fff;padding:20px">
            No map available for this location
          </p>
        `})})}function re(){S.innerHTML=``;let e=Math.max(0,M-2),t=Math.min(N,e+5);if(t-e<5&&(e=Math.max(0,t-5)),e>0&&(z(0),e>1)){let e=document.createElement(`span`);e.textContent=`...`,S.appendChild(e)}for(let n=e;n<t;n++)z(n);if(t<N){if(t<N-1){let e=document.createElement(`span`);e.textContent=`...`,S.appendChild(e)}z(N-1)}}function z(e){let t=document.createElement(`button`);t.className=`page-btn`,t.textContent=e+1,e===M&&t.classList.add(`active`),t.addEventListener(`click`,()=>L(e)),S.appendChild(t)}ee.addEventListener(`click`,B),C.addEventListener(`click`,e=>{e.target===C&&B()});function B(){C.classList.add(`is-hidden`),w.innerHTML=``,T.style.overflow=``}L();var V=document.querySelector(`.scroll-up`);window.addEventListener(`scroll`,()=>{window.scrollY>200?V.classList.add(`scroll-up--active`):V.classList.remove(`scroll-up--active`)});var H=`Q8bHL81HES4CjxatVZAVSQWYyAffYhbQ`,U=document.querySelector(`.events-list`),W=document.getElementById(`pagination`),G=document.querySelector(`[data-modal]`),K=document.querySelector(`.modal__wrap`),q=document.querySelector(`[data-close]`),J=document.body,Y=0,X=0;async function Z(e=0){let t=`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${H}&countryCode=US&size=20&page=${e}`,n=await(await fetch(t)).json(),r=n._embedded?.events||[];X=Math.min(n.page?.totalPages||0,29),Y=e,ie(r),ae()}function ie(e){U.innerHTML=e.map(e=>`
    <li class="event-card" data-id="${e.id}">
      <img class="event-img" src="${e.images?.[0]?.url||``}" alt="${e.name}">
      <h3 class="event-title">${e.name}</h3>
      <p class="event-date">${e.dates?.start?.localDate||``}</p>
      <p class="event-place">${e._embedded?.venues?.[0]?.name||``}</p>
    </li>
  `).join(``)}function ae(){W.innerHTML=``;let e=Math.max(0,Y-2),t=Math.min(X,e+5);t-e<5&&(e=Math.max(0,t-5));for(let n=e;n<t;n++){let e=document.createElement(`button`);e.className=`page-btn`,e.textContent=n+1,n===Y&&e.classList.add(`active`),e.addEventListener(`click`,()=>Z(n)),W.appendChild(e)}if(t<X){let e=document.createElement(`span`);e.textContent=`...`,e.className=`dots`,W.appendChild(e);let t=document.createElement(`button`);t.className=`page-btn`,t.textContent=X,t.addEventListener(`click`,()=>Z(X-1)),W.appendChild(t)}}U.addEventListener(`click`,async e=>{let t=e.target.closest(`.event-card`);if(!t)return;let n=t.dataset.id;K.innerHTML=oe(await(await fetch(`https://app.ticketmaster.com/discovery/v2/events/${n}.json?apikey=${H}`)).json()),G.classList.remove(`backdrop-hidden`),J.classList.add(`no-scroll`)}),q.addEventListener(`click`,Q),G.addEventListener(`click`,e=>{e.target.closest(`.modal`)||Q()}),document.addEventListener(`keydown`,e=>{e.code===`Escape`&&Q()});function Q(){G.classList.add(`backdrop-hidden`),J.classList.remove(`no-scroll`)}function oe(e){return`
    <img class="modal__preview" src="${e.images?.[0]?.url||``}" />

    <div class="content">
      <img class="content__image" src="${e.images?.[0]?.url||``}" />

      <ul class="content__list">

        <li>
          <h2 class="modal__title">INFO</h2>
          <p class="modal__text">${e.info||`No information`}</p>
        </li>

        <li>
          <h2 class="modal__title">WHEN</h2>
          <p class="modal__text">${e.dates?.start?.localDate||``}</p>
          <p class="modal__text">${e.dates?.start?.localTime||``}</p>
        </li>

        <li>
          <h2 class="modal__title">WHERE</h2>
          <p class="modal__text">${e._embedded?.venues?.[0]?.city?.name||``}</p>
          <p class="modal__text">${e._embedded?.venues?.[0]?.name||``}</p>
        </li>

        <li>
          <h2 class="modal__title">WHO</h2>
          <p class="modal__text">${e.name||``}</p>
        </li>

        <li class="modal__pric">
          <h2 class="modal__title">PRICES</h2>

          <div class="price__wrap">
          <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">Standart 300-500 UAH</p>
            
          </div>

          <a class="modal__btn" href="${e.url||`#`}" target="_blank">
            BUY TICKETS
          </a>

          <div class="price__wrap">
            <svg class="price__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 29 20"><path d="M3.22 0H0v19.33h3.22zm8.11 0H8.1v19.33h3.23zm4.88 0h-3.22v19.33h3.22zM29 0h-4.78v19.33H29zM6.44 0H4.88v19.33h1.56zm12.89 0h-1.56v19.33h1.56zm3.23 0h-1.57v19.33h1.57z" fill="#0E0E0E"/></svg>
            <p class="modal__text">VIP 1000-1500 UAH</p>
          </div>

          <a class="modal__btn" href="${e.url||`#`}" target="_blank">
            BUY TICKETS
          </a>

        </li>

      </ul>
    </div>

    <a class="btn-info" href="${e.url||`#`}" target="_blank">
      MORE FROM THIS AUTHOR
    </a>
  `}Z();var se=document.querySelector(`.footer-open-modal`),$=document.querySelector(`#modal`),ce=$.querySelector(`.close`);se.addEventListener(`click`,e=>{e.preventDefault(),$.classList.add(`is-open`),document.body.style.overflow=`hidden`}),ce.addEventListener(`click`,()=>{$.classList.remove(`is-open`),document.body.style.overflow=`visible`}),$.addEventListener(`click`,e=>{e.target===$&&($.classList.remove(`is-open`),document.body.style.overflow=`visible`)});