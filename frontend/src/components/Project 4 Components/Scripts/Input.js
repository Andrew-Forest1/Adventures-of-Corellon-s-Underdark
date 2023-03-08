let keys = {
    a: false,
    s: false,
  };

document.addEventListener("keydown", (event) => {
    if (event.key === "q") {
        keys.a = true;
    }
    if (event.key === "w") {
        keys.s = true;
    }
    if (event.key === "e") {
        keys.a = true;
    }
    if (event.key === "a") {
        keys.s = true;
    }
    if (event.key === "s") {
        keys.a = true;
    }
    if (event.key === "d") {
        keys.s = true;
    }
    if (event.key === "f") {
        keys.a = true;
    }
    if (event.key === "z") {
        keys.s = true;
    }
    if (event.key === "x") {
        keys.a = true;
    }
    if (event.key === "c") {
        keys.s = true;
    }
    if (event.key === "v") {
        keys.s = true;
    }
    

});

document.addEventListener("keyup", (event) => {
    if (event.key === "a") {
        keys.a = false;
    }
    if (event.key === "s") {
        keys.s = false;
    }
});