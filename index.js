const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");


// currentTab = oldTab and newTab = c lickedTab = newTab

// je current(apne atyre kai Tab upar chiye te Tab) Tab che tene apde by default Starting ma apde Load kariye tyare user Tab ne equel thashe tem maniye chiye  
// By Default apdi Tab a User Location[Your Wearther] Upar hovi joiye te apde SET karishu 
// let currntTab =  userTab
let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// Current-tab ni classlist ma j pan Current-Tab ni perticulour property hase te apde add kri daishu ....Atle Current-Tab[ne cores-ponding] ni sathe j pan CSS Property che tene List kari do 
oldTab.classList.add("current-tab");
// jyare pan apde application ne load kariye chiye....or open kariye chiye tyare avu bani che k apda storage ma pahela thi j lactitude and longitude store/present j hoy ....to apde initially aek var fucntion call kari daiye 'getfromSessionStorage();' to apanane tarat user nu current location mali jashe
getfromSessionStorage();

// Tabs ne switch karva mae nu function lakhelu che 
// function switch(clickedTab) 
function switchTab(newTab) {
    // apde biji Tab upar java mangiye chiye (jo 'your weather' vali tab upar hoiye to 'search weather' vali tab upar javu che and jo 'search weather' vali tab upar hoiye to 'your weahter' vali tab upar javu che )
    // if(clickedTab != CurrentTab)
    if(newTab != oldTab) {
        // apde Tab badlvi chr mate j Pahelani(old) tab che tena classList ne dur kaishu
        // current.classList.remove("current-tab");
        oldTab.classList.remove("current-tab");
        // have juni tab na classList ne dur kariya pachi, j navi tab bani(j navi tab hoy) te have juni(old)Tab bani jashe ......atle apde have oldtab=newtab kariyu.
        // currentTab=clickedTab
        oldTab = newTab;
        // have j aa navi(new Tab) tab che j oldTab ma add kari che(=[Equal]) kari che tena classList ne apde add karishu 
        // current.classList.remove("current-tab");
        oldTab.classList.add("current-tab");

        // have css ma jai ne active vali class banavi 
        // have jo Search-form active nathi, to apde aa search form ne active karvu che ............have j pan form/Tab apanane visible che, teno sidho matalab che k te form/Tab active che(atle k te form/Tab ni active vali class tema add che)....and apde ahiya puchiyu j ...shu searchForm ma active vali class nathi???? teno matalb che k SearchForm visible nathi ...to apde aa searchForm ni ander j java nu che ...
        // jo active vali class nahi hoy to te Tab Visible nai hoy...and jo Active vali class hase to te Tab Visible hase...........jo j pan Tab ne visible karavavi hoy tema 'active' vali class ne add karvi padshe and j tab visible che te tab mathi aa active vali class remove karvi padshe 
        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            // SearchForm ma javu hoy to j GrantAccess valu j (UI)ClassList che tene remove karo.....atle k GrantAccess vala UI mathi Active Class ne dur kari do ....biju User ni j information dekhadta hata te dur kari do ..atle k  userInfoContainer mathi active class ne dur kari do ....and j SearchForm che tene visible karo 
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            // j SearchForm che tene visible karo 
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna hai 
            searchForm.classList.remove("active");
            // have apde j search vali Tab(upar no IF valo case) ma hata tyare j Data apdi pase avelo[state data,country,calceous,windspeed,humudity,clouds..etc] te search karelo data pan apde remove karvo padseh mate niche mujab apde kariyu..ane user ni information j kahevay  
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            // have apde ELSE vala Case ma atle k YOUR WEATHER vali Tab upar aviye tyare j actuall User che(j apda device(laptop,phone)) tene j location ni permission api hase te mujab lactitude and longitude store[local storage] thaya hase te...store thayelo data have apde jyare pan YOUR WEATHER vali Tab upar aviye tyare visible karavavo padshe ...mate tena mate apde niche na function ne call kariyo che 
            getfromSessionStorage();
        }
    }
}

// user Tab upar apde Event Listener lagavi didhu j thi .....tab ne Switch karva mate aa use thay che...jem k 'your weather' vali tab upar click kare to te Tab avavi joiye jo 'Search weather' vali tab use kare to aa search weather vali tab avavi joiye ...am tab switch Thavi joiye...Tab ne Switch karva mate eventlistener che 
userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter...j pan Tab apde click kari che te add kari
    // j pan Tab ne apde click kariye chiye te Tab upar apde SwitchTab valo function pass kari didhi che 
    switchTab(userTab);
});

// bane Tab mate Same eventListner lagavi didhu ..j thi j pan Tab upar click kare te Tab upar Switch thai shake
searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter...j pan Tab apde click kari che te add kari
    switchTab(searchTab);
});

//check if cordinates[lactitude,longitude] are already present in session storage
function getfromSessionStorage() {
    // sessionStorage atle local storage............ahiya apde findout karva mangiye chiye k sessionStorage ni ander "user-coordinates" nam ni koi 'Item(getItem)' che?
    // apde su ama khali 'user-coordinates' j search karishu??....to answer che, NA j pan Item ne apde save karishu jate naam thi , te j Item apde ahiya sessionStorage ma Search kari shakishu.......jem ahiya apde 'user-coordinates' ne search kariyu.
    // ahiya apde session-storage pase thi 'userCoordinates' leva na che mate apde ahiya "getitem" karishu 
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile...atle adpe location Share nathi karelu..mate te case ma apde sauthi pahela j GRANTLOCATION VALI WINDOW(TAB)[grantAccessContainer] hati tene show karishu....atle k tema 'active' class ne show karishu  
        grantAccessContainer.classList.add("active");
    }
    else {
        // have jo local coordinate padela hoy(location nu access mali gayu hoy te case ma )...apde te coordinates[lactitude,longitude] no use karishu and data(user no) lai ne avishu 
        // apde JSON ma convert karishu 

        // MMMMMIIIMMPPPP
        // ahiya j " JSON.parse()" che te JSON String ne JAVASCRIPT Object ma convert kare che 

        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

// user ni information ne fetch kari ne lave che 
// ahiya apde API ne call karva ni mate aa function ASYNCHORONOUS hovu joiye
async function fetchUserWeatherInfo(coordinates) {
    // lactitude,longitude ne define kariyu
    const {lat, lon} = coordinates;
    // have apde API ne call karva na chiye , to apde avu dekhadvu joiye k apde jyare API ne call kariye chiye te time a LOADING thay che ...
    // atle k apde LOADER dekhadvu padshe ...have tena mate apde pahela Grant-Location walu dur karvu padshe kem k have apanane USER ni Information mali gai che , pachi LOADING thay che tevu dekhadvu padshe..and tena pachi apde API ne call karishu  
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );

        // API call thi je response(data) aviyo hoy tene .JSON formate ma convert kare che   
        const  data = await response.json();

        // have api pase API call thi data avi gayo ch mate have apde LOADER ne dur karvo padshe ...and pachi j pan USER NO data che tene apde show karishu...have apde khali ane show karavelu che tena ander apde data nakhva no baki che .....atle k j API call pachi j data ave che tene apde RENDER karishu UI ma. 
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        // rendering the data 
        renderWeatherInfo(data);
    }
    catch(err) {
        // jya suhdi API ne call thay che tya sudhi LOAD thaya kare che ...erroe ave che to pan load thaya kare che
        loadingScreen.classList.remove("active");
        
        

    }

}

// rendering data function 
function renderWeatherInfo(weatherInfo) {
    // apde jetali pan values joiye che UI upar Render karavava te ahiya lakhi .....apde aa cityname,country,wearthercion,temprature,windspeed,etcetc..aa values element ma dekhadva ni che UI ma perticulor jagiyaye....aa mate apde badha j elements(values) ne fetch kari ne lavva padshe pachi j aa elements(values) ne UI ma SET kari shakishu aek perticulor jagiyaye
    // (1) badha j kaam na elements(values) ne fetch kari ne lavishu...(2) pachi weartherinfo mathi data nikadishu k kai jagiyaye shu nakhvu che te ...and (3) te data ma apde aa elements(values) ne nakhishu 
    //fistly, we have to fethc the elements 

   
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements.........apde badho j data elements ni ander niche mujab fill kari didho che. 

    // MMMMMIIIMMPPP

    // What is Optional Chaining Operator ?
//Optional chaining is a new JavaScript operator introduced in ECMAScript 2020 that makes it easier to safely access nested properties and methods of an object, without worrying about encountering errors if a property or method does not exist or is undefined. The operator is denoted by the question mark (?) symbol and is often referred to as the "nullish coalescing operator".
// apdi pase JSON object che jema ander bija nested JSON objects hoy shake che , apde JSON object ma koik perticulore property ne accesss karva mangiye chiye , te prerticulor property ne apde => Optional Chaining Operator "?" vade access kari shakiye chiye[jo te perticulore property exist karti hse to]...have mano k a parameter/property a Object ma che j nahi (exist j nathi karti) to aa Optional Chaining Operator "?" apanane erroe throw nahi kare ..ane apanane undefined value api deshe ....atle k te error nahi ape pan te tena badla ma UNDEFINED che tevu kahi deshe 
//Here's an example of how optional chaining can be used:

//Javascript:- 1

//let user = { name: "Alice", address: { city: "New York", state: "NY", zip: "10001" } };
//let zipCode = user?.address?.zip;
//console.log(zipCode); // "10001"
//In this example, we have an object called user with two properties: name and address. The address property is itself an object that contains three sub-properties: city, state, and zip. We want to access the zip property of the address object, but we don't want to risk running into an error if the address object is null or undefined.

//Using optional chaining, we can add a "?" symbol after each object property or method call, indicating that we want to perform the operation only if the property or method exists and is not null or undefined. In this case, if the address property or the zip property do not exist, the expression will simply evaluate to undefined, without throwing an error.
//Here's another example:

//Javascript:- 2

//let user = null;
//let zipCode = user?.address?.zip;
//console.log (zipCode); // undefined
//In this case, the user object is null, so attempting to access the address property would result in a TypeError if we were not using optional chaining. With optional chaining, however, the expression simply evaluates to undefined, indicating that the property does not exist.
// MMMMIIIMMMPP
//Optional chaining is a powerful tool for avoiding errors in complex object hierarchies, and it can make your code much more robust and easier to maintain. However, it's important to use optional chaining judiciously and to understand its limitations, as it can sometimes mask underlying issues with your code.


    // apde anathi weather info ma city nu name add kariyu 
    cityName.innerText = weatherInfo?.name;
    // country-Icon a image che and te Image no source(src) che te source ma apde aek link nakhva ni che aa thodu complecated che pan samjava ma simpele ch ek countery-icon image na source ma aa link add karo....ama avu kahe che k pahela apde 'weatherinfo' ma hata pachi apde 'sys' ma gaya tena pachi apde 'coutnry' ma gaya ane country mathi j pan output ave te apde lower-case ma convert kari didhu ...and tene aek link ni ander add kari didhu "$" no use kari ne and "template-literaral" no use kari ne . and tene apde countryicon image na source ma nakhi didha.
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    // ama pan apde akho flow lakhelo che ........ama apde description nu innertext a value sodhi...apde aa Description a 1st element che tene array mathi access karva mate apde "[0]" karelu che kem....aaa .JSON che te akha data na main main component ne  JSON Array ma convert kare che.
    // ama apde weatherInfo ma gaya pachi weather ma gaya pachi te weather array na first element ma gaya and tya thi description ni value lidhi.
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    // jem apde countryIcon ni image na source che te image na source ma link add kari hati te mujab apde ama weatherIcon mate link no use karishu 
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    // jyare UI upar apdu aa niche ni badhi properties dekhay tyare teni pachal aa badha tena parameters ave (m/s)(%) etc..te mate apde "[``]" ma "$" ma j data API thi fetch kari ne aa variables (temp.innerText)(windspeed.innerText...etc) nakhiye chiye te ne close bracket kariya pachi pachal thi aa parameters lakhiye to te apdi UI upar dekhashe 
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

    // apde badho j data elements ni ander upar mujab fill kari didho che


}


function getLocation() {
    // jo geolocation a supported che k nahi te apde check karishu IF-ELSE thi
    if(navigator.geolocation) {
        // jo geolocation no support available hoy to find-out karo current-position[coordinates(lactitude,longitude)]..........ahiya showPosition a call-back function che 
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        // show an alert for no gelolocation support available
        // *HERE[code-word]
        alert("no gelolocation support available");
        
    }
}

function showPosition(position) {

    // apde 'userCoordinates' naam nu object create kari didhu
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    // aa position/coordinates ne apde store karavishu 'sessionStorage' ni ander...and te coordinates ne "user-coordinates" naam apishu.
    // ahiya apde session-storage maa aa coordinaties ni value store karvi che mare apde ahiya "setItem" kariyu.
    // JSON.stringify() converts JavaScript objects or values into JSON string.
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    // have aa coordinates ne pde niche na function ni help thi UI upar dekhadishu
    fetchUserWeatherInfo(userCoordinates);

}

// jyare pan Grantaccess vala button upar click kariye tyare 2 kaam thavu joiye (1)current position find-out thavi joiye[using geolocation API] and {aa geolocation API thi malela lactitude and longitude ne}(2) Session-Storage ni upar Current Coordinats[lactitude,longitude] ne store karavi laishu....and aa badhu karishu atle ano sidho matalab che k apde GrantAccessButton upar eventListener banavavu padshe.

const grantAccessButton = document.querySelector("[data-grantAccess]");

// grantAccessButton upar apde eventListener lagaviyu
grantAccessButton.addEventListener("click", getLocation);

// apde j search kariye chiye "city-name" teni value nichadva mate apde custome attribute apelu hatu searchInput..j ni apde ahiya ahiya te search karelu city nu name access karishu 
const searchInput = document.querySelector("[data-searchInput]");

// searchForm upar apde eventListener lagaviyu
searchForm.addEventListener("submit", (e) => {
    // apde j submit kariye chiye tyare browser vade j default vastu thay te apde nathi joiti mate apde tene dur karishu "preventDefault()" kari ne 
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

// apde ahiya API o use karishu mate apde async function banaviyu
async function fetchSearchWeatherInfo(city) {
    // have j avu apde search kariye city name and enter kariye atle sauthi pahela loading thavu joiye 
    loadingScreen.classList.add("active");
    // j userinfo nu page dekhadta hata te apde dur karishu
    userInfoContainer.classList.remove("active");
    // j grantAccess button valu page dekhadta hata te apde dur karishu
    grantAccessContainer.classList.remove("active");

    // apde API ne call kariyo
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        // response thi malela data ne apde json ma convert kariyu  
        const data = await response.json();

        // Loading ne band karihshu API Succesful call thai jay pachi 
        loadingScreen.classList.remove("active");
        // pachi apde weather dekahdva nu che UI ma mate userInfoContainer ma apde active class kariyo
        userInfoContainer.classList.add("active");
        // apde j pan userInfoContainer ni ander ni values che te apde aa 'renderWeatherInfo(data);' function che tena thi aa userInfoContainer ne values apishu
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
    }
}