

// Variables
const githubusername = "anto426";
const defaultimeout =  1000;

// Function 

// Function for show site
function showSite(loader, prymarybox) {
    console.log("Site is ready");
    setTimeout(() => {
        loader.style.display = "none";
        prymarybox.classList.add("fade-in");
        prymarybox.style.display = "flex";
    }, defaultimeout);
}


// Function for error page
function seeErrorPage(loader, errmessagebox, errmessage, textmessage = "An error occurred while loading the page") {
    setTimeout(() => {
        loader.style.display = "none";
        errmessage.innerHTML = textmessage;
        errmessagebox.classList.add("fade-in");
        errmessagebox.style.display = "flex";
    }, defaultimeout
);

}


function loadColors() {
    const primaryColor = localStorage.getItem('primaryColor');
    const secondaryColor = localStorage.getItem('secondaryColor');

    if (primaryColor && secondaryColor) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    }
}

// Function for loadpage
function Load() {
    const DynamicColorIn = new DynamicColor();
    const FetchDataIn = new FetchData();

    let prymarybox = document.getElementById("anto-prymarybox");
    let errmessagebox = document.getElementById("anto-container-message-error");
    let errmessage = document.getElementById("anto-message-error");
    let loader = document.getElementById("anto-loader");

    FetchDataIn.fetchGithubData(githubusername).then(async data => {
        let logo = document.getElementById("anto-logo");
        let username = document.getElementById("anto-username");
        let tag = document.getElementById("anto-tag");
        logo.src = data.avatar_url;
        username.innerHTML = data.name;
        tag.innerHTML = data.login;
        DynamicColorIn.setImg(logo);
        DynamicColorIn.applyTheme().then(() => {
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--default-bg-gradient')
            const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--default-item-color')
            localStorage.setItem('--default-bg-gradient', primaryColor);
            localStorage.setItem('--default-item-color', secondaryColor);

            loadColors();
            showSite(loader, prymarybox);
        }).catch(error => {
            console.error("Color Dynamic error : ", error);
            seeErrorPage(loader, errmessagebox, errmessage, error);
        });
    }).catch(error => {
        console.error(error);
        seeErrorPage(loader, errmessagebox, errmessage, error);
    });
}

function loadotherpage(){
    const primaryColor = localStorage.getItem('--default-bg-gradient');
    const secondaryColor = localStorage.getItem('--default-item-color');
    console.log(primaryColor, secondaryColor);

    if (primaryColor && secondaryColor) {
        document.documentElement.style.setProperty('--default-bg-gradient', primaryColor);
        document.documentElement.style.setProperty('--default-item-color', secondaryColor);
    }
}