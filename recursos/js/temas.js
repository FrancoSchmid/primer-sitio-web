const switchTema = document.getElementById("switchTema");

switchTema.addEventListener("change", () => {
  console.log("Switch detectado");
  document.body.classList.toggle("tema-claro");

  localStorage.setItem("tema", 
    document.body.classList.contains("tema-claro") ? "claro" : "oscuro"
  );
});

if (localStorage.getItem("tema") === "claro") {
  document.body.classList.add("tema-claro");
  switchTema.checked = true;
}