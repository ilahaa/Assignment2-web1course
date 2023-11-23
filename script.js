fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const productsData = data.products.map(product => {
      return {
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discountPercentage,
        thumbnail: product.thumbnail,
        category: product.category,
        stock: product.stock
      };
    });
    console.log(productsData);
    const productDisplay = productsData.map(product => {
      return `
      <div class="product-item">
          <img class="product-image" src="${product.thumbnail}" alt="${product.title}">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-description">${product.description}</p>
          <span class="product-price">${product.price}</span>
          <p class="product-discount">${product.discount}</p>
          <p class="product-category">${product.category}</p>
          <p class="product-stock">${product.stock}</p>
        </div>
      `;
    });

    document.getElementById("productsContainer").innerHTML = productDisplay.join('');
  })
  .catch(error => {
    console.error('Error message', error);
  });


