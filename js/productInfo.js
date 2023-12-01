let productDetail = document.querySelector(".productDetails");
// Get the 'id' parameter value from the URL query string
let id = new URLSearchParams(window.location.search).get('id');

// Function to fetch product details by ID asynchronously
async function getProductDetailsWithId(id) {
    return (
        // Fetch data from the URL constructed with the ID parameter
        fetch(`${'https://dummyjson.com/products'}/${id}`)
            .then(response => {
                if (!response.ok) {
                    // an error if the network response is not okay
                    return 'Network response was not ok.';
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error message", error);
                return null;
            }));
}


function displayProductDetails() {
    getProductDetailsWithId(id)
        .then(product => {
            if (product) {
                const productItem = `
      <div class="product-item">
        <img class="product-image" src="${product.thumbnail}" alt="${product.title}">
        <h2 class="product-title">${product.title}</h2>
        <div class="texts">
          <p class="product-category">${product.category}</p>
          <p class="product-description">${product.description}</p>
          <span class="product-price">Price: $${product.price}</span>F
          <p class="product-discount">Discount: ${product.discount}%</p>
          <p class="product-stock">Stocks: ${product.stock}</p>
        </div>
      </div>
    `;
                productDetail.innerHTML = productItem;
            }
            else {
                console.log('Product not found.');
            }
        });
}

displayProductDetails();

