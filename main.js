const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'iPhone',
    storage: '256 ГБ',
    price: 99990,
    description: 'Титановый корпус, хорошая камера, спокойный универсальный вариант.',
    specs: [['Экран', '6.1"'], ['Чип', 'A17 Pro'], ['Цвет', 'Natural']],
    image: 'assets/iphone-15-pro.png',
    top: true,
    galleryYear: '2023'
  },
  {
    id: 2,
    name: 'MacBook Air M3',
    category: 'Mac',
    storage: '512 ГБ',
    price: 119990,
    description: 'Лёгкий ноутбук для учёбы, работы и поездок.',
    specs: [['Экран', '13.6"'], ['Чип', 'M3'], ['Память', '16 ГБ']],
    image: 'assets/macbook-air-m3.png',
    top: true,
    galleryYear: '2024'
  },
  {
    id: 3,
    name: 'iPad Pro 13"',
    category: 'iPad',
    storage: '256 ГБ',
    price: 129990,
    description: 'Большой экран для дизайна, заметок и фильмов.',
    specs: [['Экран', '13"'], ['Чип', 'M4'], ['Связь', 'Wi-Fi']],
    image: 'assets/ipad-pro-13.png',
    top: true,
    galleryYear: '2024'
  },
  {
    id: 4,
    name: 'iPhone 15',
    category: 'iPhone',
    storage: '128 ГБ',
    price: 79990,
    description: 'Яркий экран, Dynamic Island и понятный запас на несколько лет.',
    specs: [['Экран', '6.1"'], ['Чип', 'A16'], ['Камера', '48 Мп']],
    image: 'assets/iphone-15.png',
    galleryYear: '2023'
  },
  {
    id: 5,
    name: 'MacBook Pro 14"',
    category: 'Mac',
    storage: '1 ТБ',
    price: 219990,
    description: 'Для монтажа, разработки и тяжёлых рабочих задач.',
    specs: [['Экран', '14.2"'], ['Чип', 'M3 Pro'], ['Память', '18 ГБ']],
    image: 'assets/macbook-pro-14.png',
    galleryYear: '2024'
  },
  {
    id: 6,
    name: 'iPad Air',
    category: 'iPad',
    storage: '128 ГБ',
    price: 69990,
    description: 'Тонкий планшет для учёбы, видео и Apple Pencil.',
    specs: [['Экран', '10.9"'], ['Чип', 'M1'], ['Цвет', 'Blue']],
    image: 'assets/ipad-air.png',
    galleryYear: '2024'
  },
  {
    id: 7,
    name: 'AirPods Pro 2',
    category: 'AirPods',
    storage: 'USB-C',
    price: 24990,
    description: 'Шумоподавление, компактный кейс и хорошая посадка.',
    specs: [['ANC', 'адаптивный'], ['Кейс', 'USB-C'], ['Защита', 'IP54']],
    image: 'assets/airpods-pro-2.png',
    galleryYear: '2023'
  },
  {
    id: 8,
    name: 'AirPods 3',
    category: 'AirPods',
    storage: 'Lightning',
    price: 16990,
    description: 'Открытая посадка и пространственное аудио без лишних настроек.',
    specs: [['Звук', 'Spatial'], ['Время', 'до 6 ч'], ['Кейс', 'Lightning']],
    image: 'assets/airpods-3.png',
    galleryYear: '2023'
  },
  {
    id: 9,
    name: 'Apple Watch S9',
    category: 'Watch',
    storage: '41 мм',
    price: 41990,
    description: 'Часы для спорта, уведомлений и быстрых оплат.',
    specs: [['Корпус', '41 мм'], ['Экран', 'Always-On'], ['Вода', 'WR50']],
    image: 'assets/apple-watch-s9.png',
    galleryYear: '2023'
  },
  {
    id: 10,
    name: 'Watch Ultra 2',
    category: 'Watch',
    storage: '49 мм',
    price: 89990,
    description: 'Большой экран, крепкий корпус и увеличенное время работы.',
    specs: [['Корпус', '49 мм'], ['Батарея', 'до 36 ч'], ['Ремешок', 'Trail']],
    image: 'assets/watch-ultra-2.png',
    galleryYear: '2023'
  },
  {
    id: 11,
    name: 'iMac 24" M3',
    category: 'Mac',
    storage: '512 ГБ',
    price: 149990,
    description: 'Моноблок для дома, офиса и аккуратного рабочего места.',
    specs: [['Экран', '24"'], ['Чип', 'M3'], ['Камера', '1080p']],
    image: 'assets/imac-24-m3.png',
    galleryYear: '2024'
  }
];

const categories = ['Все', 'iPhone', 'Mac', 'iPad', 'Watch', 'AirPods'];

let currentPage = 'home';
let activeCategory = 'Все';
let cart = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function money(value) {
  return `${value.toLocaleString('ru-RU')} ₽`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function showPage(page) {
  currentPage = page;
  $$('.page').forEach((node) => node.classList.toggle('visible', node.id === `page-${page}`));
  $$('.nav-link').forEach((button) => button.classList.toggle('active', button.dataset.page === page));
  window.scrollTo(0, 0);
}

function productCard(product) {
  const specs = product.specs
    .map(([label, value]) => `<li><span>${escapeHtml(label)}</span><span>${escapeHtml(value)}</span></li>`)
    .join('');

  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHtml(product.name)}">
      </div>
      <div class="product-body">
        <div class="product-kicker">${escapeHtml(product.category)} · ${escapeHtml(product.storage)}</div>
        <h3 class="product-title">${escapeHtml(product.name)}</h3>
        <p class="product-sub">${escapeHtml(product.description)}</p>
        <ul class="spec-list">${specs}</ul>
        <div class="product-bottom">
          <div class="price">${money(product.price)}</div>
          <button class="button primary full" type="button" data-add="${product.id}">В корзину</button>
        </div>
      </div>
    </article>`;
}

function renderHero() {
  $('#hero-visual').innerHTML = '<img class="hero-photo" src="assets/hero-showcase.png" alt="">';
}

function renderHome() {
  $('#home-products').innerHTML = products.filter((product) => product.top).map(productCard).join('');
}

function renderCategories() {
  $('#category-list').innerHTML = categories
    .map((category) => `
      <button class="category-button ${category === activeCategory ? 'active' : ''}" type="button" data-category="${category}">
        ${category}
      </button>`)
    .join('');
}

function renderCatalog() {
  renderCategories();
  const filtered = activeCategory === 'Все'
    ? products
    : products.filter((product) => product.category === activeCategory);
  $('#catalog-products').innerHTML = filtered.map(productCard).join('');
}

function renderGallery() {
  $('#gallery-grid').innerHTML = products
    .map((product, index) => `
      <button class="gallery-item" type="button" data-gallery="${index}">
        <span class="gallery-image">
          <img src="${product.image}" alt="${escapeHtml(product.name)}">
        </span>
        <span class="gallery-caption">
          <span>${escapeHtml(product.name)}</span>
          <span>${product.galleryYear}</span>
        </span>
      </button>`)
    .join('');
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartCount() {
  const count = cartCount();
  const badge = $('#cart-count');
  badge.textContent = count > 9 ? '9+' : String(count);
  badge.hidden = count === 0;
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  updateCartCount();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartCount();
  renderCart();
}

function setCartQty(id, qty) {
  if (qty < 1) {
    removeFromCart(id);
    return;
  }

  const item = cart.find((entry) => entry.id === id);
  if (item) item.qty = qty;
  updateCartCount();
  renderCart();
}

function clearCart() {
  cart = [];
  updateCartCount();
  renderCart();
}

function renderCart() {
  const items = $('#cart-items');
  const footer = $('#cart-footer');

  if (!cart.length) {
    items.innerHTML = '<div class="cart-empty">Корзина пустая. Добавьте товар из каталога.</div>';
    footer.hidden = true;
    return;
  }

  footer.hidden = false;
  $('#cart-total').textContent = money(cartTotal());
  items.innerHTML = cart.map((item) => `
    <article class="cart-item">
      <img src="${item.image}" alt="${escapeHtml(item.name)}">
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${money(item.price)}</p>
        <div class="qty-controls" aria-label="Количество">
          <button type="button" data-qty="${item.id}" data-delta="-1" aria-label="Уменьшить количество">−</button>
          <span>${item.qty}</span>
          <button type="button" data-qty="${item.id}" data-delta="1" aria-label="Увеличить количество">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-remove="${item.id}" aria-label="Удалить ${escapeHtml(item.name)}">Удалить</button>
    </article>`)
    .join('');
}

function openCart() {
  $('#cart-overlay').hidden = false;
  $('#cart-drawer').classList.add('open');
  $('#cart-drawer').setAttribute('aria-hidden', 'false');
}

function closeCart() {
  $('#cart-overlay').hidden = true;
  $('#cart-drawer').classList.remove('open');
  $('#cart-drawer').setAttribute('aria-hidden', 'true');
}

function openOrder() {
  if (!cart.length) return;

  $('#order-lines').innerHTML = cart.map((item) => `
    <div class="order-line">
      <span>${escapeHtml(item.name)} × ${item.qty}</span>
      <strong>${money(item.price * item.qty)}</strong>
    </div>`)
    .join('');
  $('#order-total').textContent = money(cartTotal());
  $('#submit-order').textContent = `Подтвердить заказ · ${money(cartTotal())}`;
  $('#order-body').hidden = false;
  $('#order-success').hidden = true;
  $('#order-modal').hidden = false;
}

function closeOrder() {
  $('#order-modal').hidden = true;
  $('#order-form').reset();
  clearOrderErrors();
}

function clearOrderErrors() {
  ['order-name', 'order-phone', 'order-email', 'order-address'].forEach((id) => {
    $(`#${id}`).classList.remove('invalid');
    $(`#${id}-error`).textContent = '';
  });
}

function validateOrder() {
  clearOrderErrors();
  const fields = [
    ['order-name', 'Введите имя'],
    ['order-phone', 'Введите телефон'],
    ['order-email', 'Введите email'],
    ['order-address', 'Введите адрес']
  ];

  let valid = true;
  fields.forEach(([id, message]) => {
    const input = $(`#${id}`);
    if (!input.value.trim()) {
      input.classList.add('invalid');
      $(`#${id}-error`).textContent = message;
      valid = false;
    }
  });

  const email = $('#order-email').value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    $('#order-email').classList.add('invalid');
    $('#order-email-error').textContent = 'Проверьте email';
    valid = false;
  }

  return valid;
}

function submitOrder(event) {
  event.preventDefault();
  if (!validateOrder()) return;

  $('#success-phone').textContent = $('#order-phone').value.trim();
  $('#order-body').hidden = true;
  $('#order-success').hidden = false;
  clearCart();
  closeCart();
}

function openLightbox(index) {
  const product = products[index];
  if (!product) return;

  $('#lightbox-image').src = product.image;
  $('#lightbox-image').alt = product.name;
  $('#lightbox-caption').textContent = `${product.name} · ${product.galleryYear}`;
  $('#lightbox').hidden = false;
}

function closeLightbox() {
  $('#lightbox').hidden = true;
}

document.addEventListener('click', (event) => {
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) showPage(pageButton.dataset.page);

  const addButton = event.target.closest('[data-add]');
  if (addButton) addToCart(Number(addButton.dataset.add));

  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    renderCatalog();
  }

  const qtyButton = event.target.closest('[data-qty]');
  if (qtyButton) {
    const id = Number(qtyButton.dataset.qty);
    const delta = Number(qtyButton.dataset.delta);
    const item = cart.find((entry) => entry.id === id);
    if (item) setCartQty(id, item.qty + delta);
  }

  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) removeFromCart(Number(removeButton.dataset.remove));

  const galleryButton = event.target.closest('[data-gallery]');
  if (galleryButton) openLightbox(Number(galleryButton.dataset.gallery));
});

$('#open-cart').addEventListener('click', openCart);
$('#close-cart').addEventListener('click', closeCart);
$('#cart-overlay').addEventListener('click', closeCart);
$('#clear-cart').addEventListener('click', clearCart);
$('#open-order').addEventListener('click', openOrder);
$('#close-order').addEventListener('click', closeOrder);
$('#done-order').addEventListener('click', closeOrder);
$('#order-form').addEventListener('submit', submitOrder);
$('#close-lightbox').addEventListener('click', closeLightbox);
$('#lightbox').addEventListener('click', (event) => {
  if (event.target.id === 'lightbox') closeLightbox();
});

$('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  $('#contact-form').hidden = true;
  $('#contact-success').hidden = false;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeOrder();
    closeCart();
  }
});

renderHero();
renderHome();
renderCatalog();
renderGallery();
renderCart();
updateCartCount();
showPage(currentPage);
