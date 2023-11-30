  function displaySelectedProduct(products){
  // Add event listener for each "See More" button
  const seeMoreButtons = document.querySelectorAll('.seeMoreBtn');
  seeMoreButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-product-id');
      const selectedProduct = products.find(product => product.id === parseInt(productId));

      if (selectedProduct) {
        displayDetails(selectedProduct);
      } else {
        console.error("Product not found");
      }
    });
  });
}
  function displayDetails(product) {
    console.log("Selected Product:", product);
    // Ensure the product exists before accessing its properties
    if (product) {
      console.log(`Title: ${product.title}, Price: $${product.price}`);
    } else {
      console.error("Product details unavailable");
    }
  }