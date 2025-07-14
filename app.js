function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const categoryValue = document.getElementById('categoryFilter').value.toLowerCase();
  const sortValue = document.getElementById('sortFilter').value;

  const productGrid = document.getElementById('productGrid');
  const products = Array.from(productGrid.getElementsByClassName('product-card'));

  let filteredProducts = products.filter(product => {
    const title = product.querySelector('h4').innerText.toLowerCase();
    const category = product.getAttribute('data-category').toLowerCase();

    const matchesSearch = title.includes(searchValue);
    const matchesCategory = (categoryValue === 'all' || category === categoryValue);

    return matchesSearch && matchesCategory;
  });

  if (sortValue === 'low') {
    filteredProducts.sort((a, b) => +a.getAttribute('data-price') - +b.getAttribute('data-price'));
  } else if (sortValue === 'high') {
    filteredProducts.sort((a, b) => +b.getAttribute('data-price') - +a.getAttribute('data-price'));
  }

  productGrid.innerHTML = '';
  filteredProducts.forEach(product => productGrid.appendChild(product));
}

// 👇 Auto-select category from URL (if any)
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category) {
    const dropdown = document.getElementById('categoryFilter');
    dropdown.value = category;
    filterProducts();
  }
};
