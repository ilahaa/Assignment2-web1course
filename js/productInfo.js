let productDetail = document.querySelector(".productDetails");
// Get the 'id' parameter value from the URL query string
let id = new URLSearchParams(window.location.search).get('id');

// Function to fetch product details by ID asynchronously
async function getProductsById(id) {
    return (
        // Fetch data from the URL constructed with the ID parameter
        fetch(`${'https://dummyjson.com/products'}/${id}`)
            .then(response => {
                if (!response.ok) {
                    // Throw an error if the network response is not okay
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error message", error);
                return null;
            }));
}

getProductsById(id)
    .then(product => {
        if (product) {
            console.log(product); 
        } else {
            console.log('Product not found.');
        }
    });

