// fetch('https://dummyjson.com/products')
//       .then(res => {return res.json()})
//       .then(data => {
//         console.log(data.products[1]);
//         document.getElementById('productTitle').
//             innerHTML = data.products[1].title;
//         document.getElementById('productImg').
//         src = data.products[1].images[1];
//     })

fetch('https://dummyjson.com/products')
  .then(res => { return res.json() })
  .then(data => {
    data.products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      const titleElement = document.createElement('h3');
      const descElement = document.createElement('p');
      const imageElement = document.createElement('img');

      imageElement.style.width="100px";
      titleElement.innerHTML = product.title;
      imageElement.src = product.images[0];

      productDiv.appendChild(titleElement);
      productDiv.appendChild(descElement);
      productDiv.appendChild(imageElement);
      document.getElementById('productsContainer').appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error message', error);
  });

