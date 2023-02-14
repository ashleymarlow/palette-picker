


const palettesJson = "../palettes.json";

function loadPalettes() {
    fetch(palettesJson)
    .then(res=>res.json())
    .then(data=>setupPalettes(data))
    .catch(error=> {
        console.error(error);
    });
}
loadPalettes();

function setupPalettes(data) {
    let palettesArray = data.palettes;
    let palettehtml = '';
    for (let palette of palettesArray) {
        // let name = palette.name;
        let tagArray = palette.tag.split(",");
        let tagHTML = "";
        let color1 = palette.color1;
        let color2 = palette.color2;
        let color3 = palette.color3;
        let color4 = palette.color4;
        let color5 = palette.color5;
        let color6 = palette.color6;

        tagArray.forEach(function(tag){
            tagHTML += `
            <button type="button" class="btn btn-outline-primary">` + tag + `</button>
            `;
        });


        palettehtml += `
            <div class="palette">
                <div class="row header-row text-end"><div class="col">` + tagHTML + `</div></div>
                <div class="row palette-row">
                    <div class="palette-color" data-color="` + color1 + `" style="background-color:` + color1 + `";><span>` + color1 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                    <div class="palette-color" data-color="` + color2 + `" style="background-color:` + color2 + `";><span>` + color2 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                    <div class="palette-color" data-color="` + color3 + `" style="background-color:` + color3 + `";><span>` + color3 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                    <div class="palette-color" data-color="` + color4 + `" style="background-color:` + color4 + `";><span>` + color4 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                    <div class="palette-color" data-color="` + color5 + `" style="background-color:` + color5 + `";><span>` + color5 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                    <div class="palette-color" data-color="` + color6 + `" style="background-color:` + color6 + `";><span>` + color6 + `<img class="copy-icon" src="img/copy.svg"></span></div>
                </div>
            </div>
        `;
    }
    const paletteContainer = document.getElementById("palette-container");
    paletteContainer.innerHTML = palettehtml;

    let paletteArray = document.querySelectorAll(".palette-color");
    paletteArray.forEach(function(palette) {
        palette.addEventListener("click",function(element){
            navigator.clipboard.writeText(element.target.dataset.color);
            element.target.lastChild.lastChild.src = 'img/check.svg';
            setTimeout(function(){
                element.target.lastChild.lastChild.src = 'img/copy.svg';
            }, 1000);
            element.target.classList.add("copied");
            setTimeout(function(){
                element.target.classList.remove("copied");
            }, 1000);
        });
    });

    //enable tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

