if (!window.hasExecutedContentScript) {
    window.hasExecutedContentScript = true;

    chrome.storage.local.get("product3", ({ product3 }) => {
        console.log("📦 Retrieved product:", product3);

        if (product3) {
            document.querySelector('input[name="title"]').value = product3.title;
            document.querySelector('input[name="price"]').value = product3.price;
            document.querySelector('textarea[name="description"]').value = product3.description;

            console.log("✅ Product details filled in successfully!");
        } else {
            console.error("❌ No product data found!");
        }
    });
} else {
    console.log("⚠️ content.js is already running.");
}
