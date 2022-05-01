document.onkeydown = (e) => e.key == "Escape" ? close() : null;
const input = document.getElementById("input");
const form = document.getElementById("input-form");
const placeholder = document.getElementById("placeholder");

const close = () => {
    window.postMessage({ type: "input-close" });
}


input.focus();
input.onkeyup = (e) => {
    input.innerText = input.innerText.toLowerCase();
    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(input);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    input.focus();

    const hint = getHint();
    if (hint) displayHint(hint);
    else displayHint("");
}

input.onkeydown = (e) => {
    switch (e.key) {
        case 'Tab':
            e.preventDefault();
            autoComplete();
            break;
        case 'Enter':
            e.preventDefault();
            if (getCommand(input.innerText.split(" ")[0]))
                sendCommand(input.innerText);
            break;
    }
}

const getHint = () => Object.keys(commands).find(c => c.startsWith(input.innerText));
const displayHint = (hint) => {
    placeholder.innerText = hint;
}

const autoComplete = () => {
    const hint = getHint();
    if (!hint) return;
    input.innerText = hint;
}

const getCommand = (name) => {
    return commands[name] || false;
}

const sendCommand = (message) => {
    window.postMessage({ type: "command", data: message });
}