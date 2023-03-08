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
        let tags = palette.tag
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
            <button type="button" class="btn btn-outline-primary tag-btn">` + tag + `</button>
            `;
        });


        palettehtml += `
            <div class="palette" data-tags="` + tags + `">
                <div class="row header-row text-end"><div class="col"><span class="tag-label">Tags:</span>` + tagHTML + `</div></div>
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
}


function paletteFilter() {
    let filterTriggersArray = document.querySelectorAll(".filter-trigger");
    filterTriggersArray.forEach(function(filter) {
        filter.addEventListener("click", function(element) {
            // filter state changes
            filterTriggersArray.forEach(function(filter) {
                filter.classList.remove("active");
            })
            element.target.classList.add("active");

            // hide show palettes based on filter 
            let palettesTagArray = document.querySelectorAll(".palette");
            palettesTagArray.forEach(function(palette) {
                let paletteTags = palette.dataset.tags.split(",");
                let clickedTag = element.target.dataset.filter;

                palette.classList.remove("hidden");
                if (clickedTag != "all") {
                    if (!paletteTags.includes(clickedTag)) {
                        palette.classList.add("hidden");
                    }
                }
                
                
            });
        })

    });   
}
paletteFilter();




// TOOLTIPS
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})



// DARK MODE
const darkModeCheckbox = document.getElementById("darkModeCheckbox");
darkModeCheckbox.addEventListener("click", function(element) {
    if (darkModeCheckbox.checked) {
        document.body.classList.add("darkMode");
    } else {
        document.body.classList.remove("darkMode");
    }

})


