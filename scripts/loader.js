document.addEventListener("DOMContentLoaded", () => {
    let componentsToLoad = 0;
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    if (headerElement) componentsToLoad++;
    if (footerElement) componentsToLoad++;

    function checkFinished() {
        componentsToLoad--;
        if (componentsToLoad === 0) {
            document.dispatchEvent(new CustomEvent("componentsLoaded"));
        }
    }

    // Load Header
    if (headerElement) {
        fetch("components/header.html")
            .then(response => response.text())
            .then(data => {
                headerElement.innerHTML = data;
                checkFinished();
            })
            .catch(error => {
                console.error("Error loading header:", error);
                checkFinished();
            });
    }

    // Load Footer
    if (footerElement) {
        fetch("components/footer.html")
            .then(response => response.text())
            .then(data => {
                footerElement.innerHTML = data;
                checkFinished();
            })
            .catch(error => {
                console.error("Error loading footer:", error);
                checkFinished();
            });
    }
});
