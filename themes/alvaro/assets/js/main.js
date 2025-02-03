var saved = localStorage.getItem("theme");
if (!saved) saved = "💻";
document.documentElement.setAttribute("data-theme", saved);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('[value="' + saved + '"]').checked = true;

    var toggle = document.theme_switch.theme_radio;

    for (var i = 0; i < toggle.length; i++) {
        toggle[i].addEventListener('change', function () {
            if (this.checked === true) {
                console.log(saved);
                document.documentElement.setAttribute("data-theme", this.value);
                localStorage.setItem("theme", this.value);
            }
        });
    }

    document.querySelectorAll('.chroma:has(code)').forEach((codeblock) => {
        const container = codeblock.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = 'copy';

        function copyingDone() {
            copybutton.innerHTML = 'done';
            setTimeout(() => {
                copybutton.innerHTML = 'copy';
            }, 1000);
        }

        copybutton.addEventListener('click', (cb) => {
            const code = codeblock.querySelectorAll("span.cl");
            let codetext = "";

            code.forEach((codeline) => {
                codetext += codeline.textContent;
            });

            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codetext);
                copyingDone();
            } else {
                console.log("Clipboard api not supported");
            }
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else {
            codeblock.appendChild(copybutton);
        }
    });
});