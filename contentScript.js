(function () {
  function fileExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  }

  function downloadURI(uri, name) {
    fetch(uri)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  let downloadButton = document.createElement("IMG");
  downloadButton.src =
    "data:image/png;base64,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";
  downloadButton.style.height = "24px";
  downloadButton.style.width = "24px";
  downloadButton.style.borderRadius = "50%";
  downloadButton.style.padding = "8px";
  downloadButton.style.cursor = "pointer";
  downloadButton.addEventListener("contextmenu", (event) =>
    event.preventDefault()
  );
  downloadButton.addEventListener("click", (e) => {
    let medias = document.querySelectorAll(
      "article.M9sTE.L_LMM ._97aPb .KL4Bh .FFVAD"
    );
    if (medias.length === 0) {
      medias = document.querySelectorAll("article.M9sTE.L_LMM ._97aPb .tWeCl");
    }
    const pagename = document.querySelector("a.sqdOP.yWX7d._8A5w5.ZIAjV ")
      .innerText;
    medias.forEach((media) => {
      const ext = fileExtension(media.src);
      downloadURI(media.src, pagename + ext);
    });
  });

  function handleCanvas(sec) {
    if (sec.children.length === 4) {
      sec.insertBefore(downloadButton, sec.children[0]);
    }
  }

  const observer = new MutationObserver(function (mutations, me) {
    const sec = document.querySelector("section.ltpMr.Slqrh");
    if (sec) {
      handleCanvas(sec);
      me.disconnect();
      return;
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
})();
