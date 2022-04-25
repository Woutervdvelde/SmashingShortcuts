const input = document.getElementById("input");
const form = document.getElementById("input-form");
input.focus();

document.onkeydown = (e) => e.key == "Escape" ? close() : null;
form.onsubmit = (e) => {e.preventDefault(); sendCommand()}

const sendCommand = () => {
    window.postMessage({type: "command", data: input.value})
}

const close = () => {
    window.postMessage({type: "input-close"});
}