document.addEventListener("DOMContentLoaded", function(){
    
    var elems = document.querySelector(".sidenav");
    var page = window.location.hash.substr(1);
    
    M.Sidenav.init(elems);
    loadNav();

    if(page == "") page = "home";
    loadPage(page);

    function loadNav(){
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4){
                if(this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
                    elm.innerHTML = xhttp.response;
                });

                document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm){
                    elm.addEventListener("click", function(event){
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    function loadPage(page){

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                var content = document.querySelector("#body-content");

                if(this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                }
                else if (this.status == 400) {
                    content.innerHTML = "<p>Halaman tidak dapat ditemukan</p>";
                }
                else {
                    content.innerHTML = "<p>Halaman tidak dapat diakses</p>";
                }
            }
        };

        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});