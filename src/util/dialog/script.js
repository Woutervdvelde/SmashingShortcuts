const form = document.getElementById("input-form");

window.onload = () => {
    if (!window.inputDialogInputs || window.inputDialogInputs.length == 0) return;

    window.inputDialogInputs.forEach(input => {
        const DOMinput = document.createElement("INPUT");
        const DOMlabel = document.createElement("LABEL");
        DOMinput.id = input.name;
        DOMinput.name = input.name;

        DOMlabel.for = input.name;
        DOMlabel.innerText = input.name;

        form.appendChild(DOMlabel);
        form.appendChild(DOMinput);
    });
}