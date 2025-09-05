// Load saved links from localStorage
    const loadLinks = () => {
      return JSON.parse(localStorage.getItem("links") || "{}");
    };

    // Save links to localStorage
    const saveLinks = (links) => {
      localStorage.setItem("links", JSON.stringify(links));
    };

    // Display links
    const renderLinks = () => {
      const links = loadLinks();
      const list = document.getElementById("shortened-urls");
      list.innerHTML = "";

      for (const [shortCode, url] of Object.entries(links)) {
        const li = document.createElement("li");
        const truncatedURL = url.length > 30 ? url.slice(0, 30) + "..." : url;
        li.innerHTML = `<a href="${url}" target="_blank">${window.location.origin}/${shortCode}</a> - ${truncatedURL}`;
        list.appendChild(li);
      }
    };

    // Handle form submit
    document.getElementById("shorten-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const url = formData.get("url");
      const shortCode = formData.get("shortCode");

      const links = loadLinks();

      if (links[shortCode]) {
        alert("Short code already in use. Please choose another one.");
        return;
      }

      links[shortCode] = url;
      saveLinks(links);

      alert("URL shortened successfully!");
      event.target.reset();
      renderLinks();
    });

    // Initial render
    renderLinks();