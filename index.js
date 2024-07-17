const selectMode = document.getElementById("mode-type")
const selectColorHex = document.getElementById("select-color")
const getColorSchemeBtn = document.getElementById("get-color")
const count = 6
let modeType = "monochrome" // initial value
let hexCode = "F99704" // initial value

selectMode.addEventListener("change", function (e) {
	modeType = e.target.value
})

selectColorHex.addEventListener("change", function (e) {
	hexCode = e.target.value.substring(1)
})

document.addEventListener("click", function (e) {
	if (e.target.parentElement.id) {
		copyColorCode(e.target.parentElement.id)
	}
})

getColorSchemeBtn.addEventListener("click", function () {
	fetch(
		`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${modeType}&count=${count}`
	)
		.then((res) => res.json())
		.then((data) => {
			renderColor(data.colors)
		})
})

function copyColorCode(id) {
	const copyText = id
	navigator.clipboard.writeText(copyText)
	alert(`Copied color code: ${copyText}`)
	console.log(copyText)
}

function renderColor(colorArray) {
	const colorContainer = document.getElementById("color-container")
	let html = ""
	for (colorValue of colorArray) {
		html += `
                    <li id="${colorValue.hex.value}">
                        <span 
                        style="background-color:${colorValue.hex.value}"></span>
                        <p>${colorValue.hex.value}</p>
                    </li>`
	}
	colorContainer.innerHTML = html
}
