// Function to fetch data from the API
function fetchData() {
  fetch('https://dummyjson.com/products')
    .then(response => {
      if (!response.ok) {
        // Throw an error if the network response is not okay
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(getData)
    .catch(error => {
      console.error('Error message', error);
      return null;
    });
}

// Function to process fetched data and generate productsData
function getData(data) {
  const productsData = processData(data.products);
  displayProducts(productsData);
  console.log(data.products);
}

// Function to process raw product data and return formatted productsData
function processData(fetchedData) {
  return fetchedData.map(product => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discountPercentage,
      thumbnail: product.thumbnail,
      category: product.category,
      stock: product.stock
    };
  });
}

// Function to generate HTML display for products
function generateProductDisplay(products) {
  return products.map(product => {
    return `
      <div class="product-item">
        <img class="product-image" src="${product.thumbnail}" alt="${product.title}">
        <h2 class="product-title">${product.title}</h2>
        <div class="texts">
          <p class="product-category">${product.category}</p>
          <p class="product-description">${product.description}</p>
          <span class="product-price">Price: $${product.price}</span>
          <p class="product-discount">Discount: ${product.discount}%</p>
          <p class="product-stock">Stocks: ${product.stock}</p>
        </div>
        <div class="seeMoreBtn" data-product-id="${product.id}">See More</div>
      </div>
    `;
  });
}


// Function to display products on the webpage
function displayProducts(products) {
  const productDisplay = generateProductDisplay(products);
  document.getElementById("productsContainer").innerHTML = productDisplay.join('');


  const seeMoreButtons = document.querySelectorAll('.seeMoreBtn');
  seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      window.location.href = `components/productInfo.html?id=${productId}`;
    });
  });

}

fetchData();



