// Shared cart logic for OCEANA frontend
(function(){
  const STORAGE_KEY = 'oceana_cart';

  function getCart(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {items: []}; }
    catch(e){ return {items: []}; }
  }

  function saveCart(cart){ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

  function updateCountBadge(){
    const cart = getCart();
    const count = cart.items.reduce((s,i)=>s+(i.quantity||1),0);
    const el = document.getElementById('cart-count');
    if(el) el.textContent = count;
  }

  function parsePrice(text){
    if(!text) return 0;
    const m = text.replace(/\s/g,'').match(/([0-9]+(?:\.[0-9]+)?)/);
    return m ? parseFloat(m[1]) : 0;
  }

  function addToCart(button){
    // find product container, get price and name
    const container = button.closest('div') || button.parentElement;
    const priceEl = container.querySelector('.price');
    const img = container.querySelector('img');
    const name = img ? (img.alt || 'Item') : 'Item';
    const price = parsePrice(priceEl ? priceEl.textContent : '0');

    const cart = getCart();
    // simple dedupe by productName
    const existing = cart.items.find(i=>i.productName===name && i.price===price);
    if(existing) existing.quantity = (existing.quantity||1)+1;
    else cart.items.push({ productName: name, price, quantity: 1 });
    saveCart(cart);
    updateCountBadge();
    alert('Item added to cart! Total items: ' + cart.items.reduce((s,i)=>s+(i.quantity||1),0));
  }

  async function placeOrder(ev){
    ev && ev.preventDefault();
    const name = document.getElementById('cust-name').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    if(!name || !email){ alert('Please provide name and email'); return; }
    const cart = getCart();
    if(!cart.items.length){ alert('Cart is empty'); return; }
    const total = cart.items.reduce((s,i)=>s + (i.price||0)*(i.quantity||1), 0);

    try{
      const res = await fetch('/api/orders', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ customerName: name, customerEmail: email, items: cart.items, totalPrice: total })
      });
      const data = await res.json();
      if(res.ok){
        // clear local cart and show success + order id
        localStorage.removeItem(STORAGE_KEY);
        updateCountBadge();
        const out = document.getElementById('order-result');
        if(out) out.innerHTML = `<p>Order placed ✅ ID: <strong>${data.order._id}</strong></p>
          <button id="cancel-order" data-id="${data.order._id}">Cancel Order</button>`;
        const cancelBtn = document.getElementById('cancel-order');
        if(cancelBtn) cancelBtn.addEventListener('click', cancelOrder);
      } else {
        alert(data.error || 'Order failed');
      }
    } catch(err){ alert('Network error: '+err.message); }
  }

  async function cancelOrder(ev){
    const id = ev && (ev.currentTarget && ev.currentTarget.dataset.id);
    if(!id){ alert('No order id'); return; }
    if(!confirm('Cancel this order?')) return;
    try{
      const res = await fetch('/api/orders/' + id, { method: 'DELETE' });
      const data = await res.json();
      if(res.ok){
        document.getElementById('order-result').innerHTML = '<p>Order cancelled ✅</p>';
      } else alert(data.error || 'Cancel failed');
    } catch(err){ alert('Network error: '+err.message); }
  }

  function renderCartPage(){
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const cart = getCart();
    if(!itemsEl || !totalEl) return;
    if(!cart.items.length){ itemsEl.innerHTML = '<p>Your cart is empty.</p>'; totalEl.textContent = '' ; return; }
    itemsEl.innerHTML = '';
    cart.items.forEach((it,idx)=>{
      const div = document.createElement('div');
      div.className = 'cart-row';
      div.innerHTML = `<span class="cart-name">${it.productName}</span>
        <span class="cart-qty">x${it.quantity}</span>
        <span class="cart-price">$${(it.price||0).toFixed(2)}</span>`;
      itemsEl.appendChild(div);
    });
    const total = cart.items.reduce((s,i)=>s + (i.price||0)*(i.quantity||1), 0);
    totalEl.textContent = 'Total: $' + total.toFixed(2);
    // wire checkout form
    const form = document.getElementById('checkout-form');
    if(form) form.addEventListener('submit', placeOrder);
  }

  // expose globally
  window.addToCart = addToCart;
  window.placeOrder = placeOrder;
  window.cancelOrder = cancelOrder;
  window.renderCartPage = renderCartPage;
  document.addEventListener('DOMContentLoaded', updateCountBadge);

})();
