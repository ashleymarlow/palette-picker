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
        let name = palette.name;
        // let tag = palette.tag;
        let color1 = palette.color1;
        let color2 = palette.color2;
        let color3 = palette.color3;
        let color4 = palette.color4;
        let color5 = palette.color5;
        let color6 = palette.color6;
        console.log(color1);
        palettehtml += `
            <div class="palette">
                <div class="row header-row">
                    <div class="col">
                        <h2>` + name + `</h2>
                    </div>
                </div>
                <div class="row palette-row">
                    <div class="palette-color" style="background-color:` + color1 + `";><span>` + color1 + `</span></div>
                    <div class="palette-color" style="background-color:` + color2 + `";><span>` + color2 + `</span></div>
                    <div class="palette-color" style="background-color:` + color3 + `";><span>` + color3 + `</span></div>
                    <div class="palette-color" style="background-color:` + color4 + `";><span>` + color4 + `</span></div>
                    <div class="palette-color" style="background-color:` + color5 + `";><span>` + color5 + `</span></div>
                    <div class="palette-color" style="background-color:` + color6 + `";><span>` + color6 + `</span></div>
                </div>
            </div>
        `;
    }
    const paletteContainer = document.getElementById("palette-container");
    paletteContainer.innerHTML = palettehtml;
}

