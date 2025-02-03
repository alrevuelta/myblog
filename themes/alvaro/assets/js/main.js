var saved = localStorage.getItem("theme");
if (!saved) saved = "💻";
document.documentElement.setAttribute("data-theme", saved);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('[value="' + saved + '"]').checked = true;

    var toggle = document.theme_switch.theme_radio;

    for (var i = 0; i < toggle.length; i++) {
        toggle[i].addEventListener('change', function() {
            if (this.checked === true) {
                console.log(saved);
                document.documentElement.setAttribute("data-theme", this.value);
                localStorage.setItem("theme", this.value);
            }
        });
    }
});