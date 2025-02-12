// Fetch and store product data in chrome.storage.local
document.getElementById("fetchProduct").addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:9000/products");
        const products = await response.json();

        if (products.length > 0) {
            const product = products[0]; // Taking the first product

            // Store product data in chrome.storage.local
            chrome.storage.local.set({ product3: product }, () => {
                console.log(" Product stored in chrome.storage.local");
            });

            document.getElementById("productInfo").innerText =
                `Title: ${product.title}, Price: ${product.price}`;
        } else {
            document.getElementById("productInfo").innerText = "No products found.";
        }
    } catch (error) {
        console.error(" Error fetching products:", error);
    }
});

// Upload product to marketplace
document.getElementById("uploadProduct").addEventListener("click", () => {
    chrome.storage.local.get("product3", async (data) => {
        const product = data.product3;

        if (!product) {
            alert("⚠️ No product data found. Fetch a product first.");
            return;
        }

        try {
            // Send product data to the backend API
            const response = await fetch("http://localhost:9000/marketplace/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    images: product.images || []
                }),
            });

            const result = await response.json();



        } catch (error) {
            console.error(" Error calling upload API:", error);
            alert(" An error occurred. Check the console.");
        }
    });
});
