let main;
let div;

export  function setupHome(mainTarget, divTarget) {
    main = mainTarget;
    div = divTarget;
}

export function showHowme() {
    main.innerHTML = '';
    main.appendChild(div);
}