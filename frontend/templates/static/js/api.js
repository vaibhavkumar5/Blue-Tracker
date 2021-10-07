const BASE_API_URL = "https://bluetracker.herokuapp.com/api/";

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var authorization = getCookie('Authorization');

if(window.location.pathname.includes("login")){
    if(authorization != null){ window.location = '/'; }
}else if(authorization === null){
    window.location = "/login";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure;";
}

function delCookie(cname){
    document.cookie = cname + "=" + "to-be-deleted" + ";" + "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    location.reload();
}

function authorize(username, email, password){
	axios({
		method: "post",
		url: BASE_API_URL+"authorize/",
		data: {username:username, email:email, password:password}
	})
	.then(function(response){ setCookie("Authorization", "Token "+response.data.token, 60); alert("Logged in successfully as "+username); location.reload(); })
	.catch(function(error){ alert(error); });
}

function logout(){
    axios({
        method: "get",
        url: BASE_API_URL+"logout/",
        headers: {"Authorization":authorization}
    })
    .then(function(response){
        delCookie("Authorization");
        alert("Logged out successfully");
        window.reload();
    })
    .catch(function(error){window.reload();});
}

function show(m){alert(m);}