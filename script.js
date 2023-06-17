let sandbox = null


function updateSlider(slideAmount) {

    sandbox.setUniform("gearAmount", Number(slideAmount))
}

function onLoad() {
    let canvas = document.getElementById("canvas")

    sandbox = new GlslCanvas(canvas)
    console.log(sandbox)
    sandbox.setUniform("gearAmount", 16.0)

}