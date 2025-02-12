chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchProduct") {
        fetch("http://localhost:9000/products")
            .then(response => response.json())
            .then(data => sendResponse({ success: true, product: data[0] }))
            .catch(error => sendResponse({ success: false, error }));

        return true;
    }
});
