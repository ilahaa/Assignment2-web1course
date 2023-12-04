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
        let imagesHTML = '';
        product.images.forEach(image => {
          imagesHTML += `<img class="product-image" src="${image}" alt="">`;
        });
        const productItem = `
      <div class="product-item">
        <h2 class="product-title">${product.title}</h2>
        <div class="texts">
          <p class="product-brand"><span>Brand: </span> ${product.brand}</p>
          <p class="product-description"><span>Decription: </span>${product.description}</p>
          <span class="product-price"><span>Price: </span> $${product.price}</span>
          <p class="product-rating"><span>Rating: </span> ${product.rating}%</p>
          <p class="product-stock"><span>Stocks: </span> ${product.stock}</p>
        </div>
        <div class="image-gallery"><div class="slider">
        ${imagesHTML}
      </div>
      <button class="prev-btn"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next-btn"><i class="fa-solid fa-arrow-right"></i></button></div>
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

