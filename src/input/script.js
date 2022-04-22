const input = document.getElementById("input");
input.focus();

document.onkeydown = (e) => e.key == "Escape" ? window.postMessage({type: "input-close"}) : null;