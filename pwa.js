"use strict";

(function(){

    if(window.edBimPwaReady) return;

    window.edBimPwaReady=true;

    const appPath="/ed-bim-studio/";
    const appUrl="https://elodiederbeque.github.io/ed-bim-studio/";
    const themeStorageKey="edbim-theme-v2";

    let deferredInstallPrompt=null;
    let installAssistDismissed=false;

    function safeLocalStorageGet(key){

        try{

            return localStorage.getItem(key);

        }catch(error){

            return null;

        }

    }

    function applyDarkDefault(){

        const saved=safeLocalStorageGet(themeStorageKey);

        if(saved!=="light" && document.body){

            document.body.classList.add("dark");

        }

        const themeColor=document.querySelector('meta[name="theme-color"]');

        if(themeColor){

            themeColor.setAttribute("content",saved==="light"?"#0696D7":"#07111f");

        }

    }

    function isAndroidDevice(){

        return /android/i.test(navigator.userAgent);

    }

    function isAppleDevice(){

        return /iphone|ipad|ipod/i.test(navigator.userAgent);

    }

    function isChromeAndroid(){

        const ua=navigator.userAgent;

        return /android/i.test(ua) && /chrome/i.test(ua) && !/wv|fbav|instagram|line|samsungbrowser/i.test(ua);

    }

    function isStandaloneApp(){

        return window.matchMedia("(display-mode: standalone)").matches ||
            window.navigator.standalone===true;

    }

    function isMobileInstallSurface(){

        return window.matchMedia("(max-width: 900px)").matches ||
            isAndroidDevice() ||
            isAppleDevice();

    }

    function installCanBeShown(){

        return window.location.protocol!=="file:" &&
            !isStandaloneApp() &&
            (deferredInstallPrompt || isMobileInstallSurface());

    }

    function updateInstallButtons(){

        const canShow=installCanBeShown();
        const buttons=Array.from(document.querySelectorAll(".installAppButton"));
        const installAssist=document.getElementById("installAssist");

        buttons.forEach(button=>{

            button.hidden=!canShow;
            button.classList.toggle("is-visible",canShow);

            const parent=button.closest("li");

            if(parent && parent.classList.contains("installAppMenuItem")){

                parent.hidden=!canShow;

            }

        });

        if(installAssist){

            const showAssist=canShow && !installAssistDismissed && isMobileInstallSurface();

            installAssist.hidden=!showAssist;
            installAssist.classList.toggle("is-visible",showAssist);

        }

    }

    function showInstallHelp(){

        window.alert(isAppleDevice()?
            "Sur iPhone : ouvre le site dans Safari, touche Partager, puis Ajouter a l'ecran d'accueil.":
            "Sur Android : ouvre le site dans Chrome, touche les trois points, puis Installer l'application ou Ajouter a l'ecran d'accueil."
        );

    }

    function openInChromeOnAndroid(){

        if(!isAndroidDevice()) return false;

        const target=appUrl.replace(/^https?:\/\//,"");

        window.location.href=`intent://${target}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(appUrl)};end`;

        return true;

    }

    async function handleInstallClick(event){

        if(event) event.preventDefault();

        document.body.classList.remove("menu-open");

        const menuToggle=document.getElementById("menuToggle");

        if(menuToggle){

            menuToggle.setAttribute("aria-expanded","false");

        }

        if(deferredInstallPrompt && typeof deferredInstallPrompt.prompt==="function"){

            try{

                await deferredInstallPrompt.prompt();
                await deferredInstallPrompt.userChoice;
                deferredInstallPrompt=null;
                updateInstallButtons();
                return;

            }catch(error){

                deferredInstallPrompt=null;

            }

        }

        if(isAndroidDevice() && !isChromeAndroid()){

            openInChromeOnAndroid();
            setTimeout(showInstallHelp,900);
            return;

        }

        showInstallHelp();

    }

    function setupInstallControls(){

        applyDarkDefault();

        const buttons=Array.from(document.querySelectorAll(".installAppButton"));
        const closeButton=document.getElementById("installAssistClose");

        buttons.forEach(button=>{

            if(button.dataset.installBound==="true") return;

            button.dataset.installBound="true";
            button.addEventListener("click",handleInstallClick);

        });

        if(closeButton && closeButton.dataset.installBound!=="true"){

            closeButton.dataset.installBound="true";
            closeButton.addEventListener("click",()=>{

                installAssistDismissed=true;
                updateInstallButtons();

            });

        }

        updateInstallButtons();

    }

    window.addEventListener("beforeinstallprompt",(event)=>{

        deferredInstallPrompt=event;
        updateInstallButtons();

    });

    window.addEventListener("appinstalled",()=>{

        deferredInstallPrompt=null;
        installAssistDismissed=true;
        updateInstallButtons();

    });

    window.addEventListener("resize",updateInstallButtons);

    if(document.readyState==="loading"){

        document.addEventListener("DOMContentLoaded",setupInstallControls);

    }else{

        setupInstallControls();

    }

    if("serviceWorker" in navigator && window.location.protocol !== "file:"){

        window.addEventListener("load",()=>{

            const isGithubPages=window.location.hostname==="elodiederbeque.github.io";
            const workerPath=isGithubPages?`${appPath}service-worker.js`:"./service-worker.js";
            const workerScope=isGithubPages?appPath:"./";

            navigator.serviceWorker
                .register(workerPath,{scope:workerScope})
                .then(()=>navigator.serviceWorker.ready)
                .then(updateInstallButtons)
                .catch(updateInstallButtons);

        });

    }

})();
