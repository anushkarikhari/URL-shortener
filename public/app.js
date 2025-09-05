const TINYURL_API = "https://api.tinyurl.com/create";
const API_TOKEN =
  "rEWC0hTRLZ62mBM7VgvGdeDnrLZc4iFi87lld8fKEL07a8NKPUckvVaBcOTa";

// IN CASE THE ABOVE TOKEN STOPS WORKING, USE THIS ONE:
// b019MmBLnNEBTTpFpLKQfVpbSUdSiSqe9Rbv3iTB64wN7DHC93WB5NAOTXY9

document
  .getElementById("shorten-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get("url");
    const alias = formData.get("alias")?.trim();

    const errorBox = document.getElementById("error-message");
    errorBox.style.display = "none";

    try {
      const response = await fetch(TINYURL_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          domain: "tinyurl.com",
          ...(alias ? { alias } : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errMsg =
          data?.errors?.[0]?.message ||
          "Failed to shorten URL, Try another alias.";
        throw new Error(errMsg);
      }

      const shortUrl = data.data.tiny_url;

      const list = document.getElementById("shortened-urls");
      const li = document.createElement("li");
      li.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
      list.prepend(li);

      event.target.reset();
    } catch (error) {
      errorBox.textContent = "⚠️ " + error.message;
      errorBox.style.display = "block";
    }
  });
