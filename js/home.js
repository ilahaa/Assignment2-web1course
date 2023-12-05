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
    .then(data => {
      productsData = processData(data.products);
      displayProducts(productsData);
    })
    .catch(error => {
      console.error('Error message', error);
      return null;
    });
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
          <p class="product-category"><span>Category: </span> ${product.category}</p>
          <p class="product-description"><span>Description: </span>${product.description}</p>
          <p class="product-price"><span>Price: </span> $${product.price}</p>
          <p class="product-discount"><span>Discount: </span> ${product.discount}%</p>
          <p class="product-stock"><span>Stocks: </span> ${product.stock}</p>
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
      window.location.href = `./components/productInfo.html?id=${productId}`; 
    });
  });

}

//store products data in empty array
let productsData = [];
// Define a mapping between dropdown values and categories in the JSON
const categories = {
  '0': 'all',
  '1': 'smartphones',
  '2': 'laptops',
  '3': 'fragrances',
  '4': 'skincare',
  '5': 'groceries',
  '6': 'home-decoration'
};


// Function to filter products based on category
function changeCategory(category) {
  const selectedCategory = categories[category];
  const selectedProducts = productsData.filter(product => {
    // Display all products if 'all' is selected or filter by category
    return selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
  });
  displayProducts(selectedProducts);
}

const selectCategory = document.querySelector('.selectCategory');
selectCategory.addEventListener('change', function () {
  const selectedCategory = this.value;
  changeCategory(selectedCategory);
});



// Select the search form and input element
const searchForm = document.querySelector('.searchForm');
const searchForTitle = document.querySelector('.searchForTitle');

// Function to search products by title
function searchByTitle(title) {
  // Convert the query to lowercase for case-insensitive comparison
  const searchInput = title.toLowerCase().trim();

  // Filter products whose title contains the search query
  const filteredProducts = productsData.filter(product => {
    const productTitle = product.title.toLowerCase();
    return productTitle.includes(searchInput);
  });

  // Display the matching products
  displayProducts(filteredProducts);


}

// Add event listener to the search form for submit
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  searchByTitle(searchForTitle.value);
});


// Add event listener to capture Enter key press on the input field
searchForTitle.addEventListener('keydown', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchByTitle(searchForTitle.value);
  }
});



fetchData();



