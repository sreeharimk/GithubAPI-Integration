function gotoUserPage() {
    let userName = document.getElementById("username").value;
    window.location.href = "user.html?user=" + userName;
}
//onload
window.onload = function() {
    document.getElementById("getButton").addEventListener("click", gotoUserPage);
}