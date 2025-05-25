const all_btn = document.querySelectorAll(".options > button");
let dark_theme = localStorage.getItem("dark_theme") === "true";
if (dark_theme) document.body.classList.add("dark-theme");

function clicked(btn) {
    if (btn.id == "theme") {
        dark_theme = !dark_theme;
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("dark_theme", dark_theme);
    } else {
        all_btn.forEach(b => b.classList.remove("clicked"));
        btn.classList.add("clicked");

        if (btn.id == "Dashboard")
            window.open("./index.html", "_self");
        else if (btn.id == "task") {
            document.querySelector(".section2").classList.remove("task1");
            document.querySelector(".section2").classList.add("task");
            document.querySelector(".prev").remove();
            document.querySelector("#task-list").style.display = "block";
            document.querySelector("#task-list-preview").style.display = "none";
        }
        else if (btn.id == "Completed") {
            document.querySelector(".section2").classList.remove("task");
            document.querySelector(".section2").classList.add("task1");
            document.querySelector(".prev").remove();
            document.querySelector("#completed-task-list").style.display = "block";
            document.querySelector("#completed-task-list-preview").style.display = "none";
        }

        console.log(btn);
    }
}

