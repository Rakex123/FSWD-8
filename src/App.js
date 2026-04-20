import { useState } from "react";
import "./App.css";

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Laptop Pro", price: 50000, category: "Electronics", desc: "Intel i5, 8GB RAM, 512GB SSD, 15.6\" FHD Display" },
  { id: 2, name: "Smartphone X", price: 20000, category: "Mobile", desc: "6.5\" AMOLED, 128GB Storage, 5G Enabled, 50MP Camera" },
  { id: 3, name: "Wireless Headphones", price: 3500, category: "Audio", desc: "Active Noise Cancellation, 30hr Battery, Foldable" },
  { id: 4, name: "Smartwatch S2", price: 8000, category: "Wearable", desc: "Health Tracking, AMOLED Display, 5ATM Water Resistant" },
  { id: 5, name: "Tablet Air", price: 25000, category: "Electronics", desc: "10.5\" Display, 6GB RAM, 256GB, Octa-core Processor" },
  { id: 6, name: "DSLR Camera", price: 45000, category: "Photography", desc: "24.2MP, 4K Video, Mirrorless, 18-55mm Kit Lens" },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, user, cart, onLogout }) {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setPage("home")}>ShopEasy</div>
      <div className="nav-links">
        <button className={`nav-btn ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>Home</button>
        <button className={`nav-btn ${page === "products" ? "active" : ""}`} onClick={() => setPage("products")}>Products</button>
        <button className={`nav-btn ${page === "cart" ? "active" : ""}`} onClick={() => setPage("cart")}>
          Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
        {user ? (
          <div className="nav-user-group">
            <span className="nav-user-name">{user.split("@")[0]}</span>
            <button className="nav-btn logout-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className={`nav-btn nav-login-btn ${page === "auth" ? "active" : ""}`} onClick={() => setPage("auth")}>Login</button>
        )}
      </div>
    </nav>
  );
}

// ─── AUTH PAGE ───────────────────────────────────────────────────────────────
function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState(null);

  const handle = () => {
    setMsg(null);
    if (!email || !pass) return setMsg({ type: "err", text: "Please fill all required fields." });
    if (!/\S+@\S+\.\S+/.test(email)) return setMsg({ type: "err", text: "Please enter a valid email address." });
    if (pass.length < 6) return setMsg({ type: "err", text: "Password must be at least 6 characters." });
    if (mode === "register" && !name) return setMsg({ type: "err", text: "Please enter your full name." });

    if (mode === "register") {
      setMsg({ type: "ok", text: "Account created successfully! Redirecting..." });
      setTimeout(() => onLogin(email), 1000);
    } else {
      onLogin(email);
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
          <p>{mode === "login" ? "Sign in to continue shopping" : "Register to get started"}</p>
        </div>
        {msg && <div className={`alert ${msg.type === "err" ? "alert-err" : "alert-ok"}`}>{msg.text}</div>}

        {mode === "register" && (
          <div className="form-group">
            <label>Full Name</label>
            <input className="form-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label>Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-input" type="password" placeholder="Minimum 6 characters" value={pass}
            onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} />
        </div>

        <button className="btn-primary full-width" onClick={handle}>
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div className="auth-toggle">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setMsg(null); }}>
            {mode === "login" ? " Register" : " Sign In"}
          </span>
        </div>
        <p className="demo-hint">Demo: Use any valid email and 6+ character password</p>
      </div>
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">New Arrivals 2026</span>
          <h1 className="hero-title">Quality Products<br />Delivered to You</h1>
          <p className="hero-sub">Discover our curated collection of electronics, gadgets, and accessories at the best prices.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage("products")}>Shop Now</button>
            <button className="btn-outline" onClick={() => setPage("auth")}>Create Account</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            {["Laptop Pro — Rs. 50,000", "Smartphone X — Rs. 20,000", "Smartwatch S2 — Rs. 8,000"].map((t, i) => (
              <div key={i} className={`hero-stack-card hero-stack-card-${i}`}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        {[
          ["Free Delivery", "On orders above Rs. 999"],
          ["Secure Payments", "UPI, Card & COD accepted"],
          ["Easy Returns", "30-day hassle-free returns"],
          ["24/7 Support", "Always here to help you"],
        ].map(([title, sub]) => (
          <div className="feature-card" key={title}>
            <div className="feature-dot"></div>
            <h4>{title}</h4>
            <p>{sub}</p>
          </div>
        ))}
      </section>

      <section className="promo-section">
        <h2>Featured Categories</h2>
        <div className="category-grid">
          {["Electronics", "Mobile", "Audio", "Wearable", "Photography"].map(cat => (
            <div className="category-chip" key={cat} onClick={() => setPage("products")}>{cat}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({ cart, setCart, user, setPage }) {
  const [added, setAdded] = useState({});
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  const filtered = PRODUCTS.filter(p =>
    (filter === "All" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (p) => {
    if (!user) { setPage("auth"); return; }
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
    setAdded(a => ({ ...a, [p.id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [p.id]: false })), 1500);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>All Products</h2>
          <p>{filtered.length} items available</p>
        </div>
        <input className="search-input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="filter-bar">
        {categories.map(c => (
          <button key={c} className={`filter-btn ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map(p => (
          <div className="product-card" key={p.id}>
            <div className="product-image-placeholder">
              <span className="product-category-tag">{p.category}</span>
            </div>
            <div className="product-info">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-desc">{p.desc}</p>
              <div className="product-footer">
                <span className="product-price">Rs. {p.price.toLocaleString("en-IN")}</span>
                <button
                  className={`btn-add ${added[p.id] ? "added" : ""}`}
                  onClick={() => addToCart(p)}
                >
                  {added[p.id] ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function CartPage({ cart, setCart, setPage, user }) {
  const updateQty = (id, delta) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  if (!user) return (
    <div className="page-center">
      <div className="empty-card">
        <h3>Login Required</h3>
        <p>Please sign in to view your cart</p>
        <button className="btn-primary" onClick={() => setPage("auth")}>Sign In</button>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="page-center">
      <div className="empty-card">
        <h3>Your cart is empty</h3>
        <p>Add products to your cart to continue</p>
        <button className="btn-primary" onClick={() => setPage("products")}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Shopping Cart</h2>
          <p>{totalQty} item{totalQty > 1 ? "s" : ""} in your cart</p>
        </div>
        <button className="btn-outline" onClick={() => setPage("products")}>Continue Shopping</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="cart-product-cell">
                    <div className="cart-product-thumb">{item.name[0]}</div>
                    <div>
                      <div className="cart-product-name">{item.name}</div>
                      <div className="cart-product-cat">{item.category}</div>
                    </div>
                  </td>
                  <td>Rs. {item.price.toLocaleString("en-IN")}</td>
                  <td>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                    </div>
                  </td>
                  <td className="subtotal">Rs. {(item.price * item.qty).toLocaleString("en-IN")}</td>
                  <td><button className="remove-btn" onClick={() => remove(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary-box">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>Rs. {total.toLocaleString("en-IN")}</span></div>
          <div className="summary-row"><span>Delivery</span><span className="free-tag">Free</span></div>
          <div className="summary-row"><span>Discount</span><span>- Rs. 0</span></div>
          <div className="summary-divider"></div>
          <div className="summary-total"><span>Total</span><span>Rs. {total.toLocaleString("en-IN")}</span></div>
          <button className="btn-primary full-width" onClick={() => setPage("checkout")}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
function CheckoutPage({ cart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="page-center">
      <div className="checkout-card">
        <h2>Order Summary</h2>
        <div className="checkout-items">
          {cart.map(i => (
            <div className="checkout-item" key={i.id}>
              <div className="checkout-item-thumb">{i.name[0]}</div>
              <div className="checkout-item-info">
                <span className="checkout-item-name">{i.name}</span>
                <span className="checkout-item-qty">x{i.qty}</span>
              </div>
              <span className="checkout-item-price">Rs. {(i.price * i.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
        <div className="checkout-divider"></div>
        <div className="checkout-total">
          <span>Grand Total</span>
          <span>Rs. {total.toLocaleString("en-IN")}</span>
        </div>
        <button className="btn-primary full-width" style={{ marginTop: 20 }} onClick={() => setPage("payment")}>
          Proceed to Payment
        </button>
        <button className="btn-outline full-width" style={{ marginTop: 10 }} onClick={() => setPage("cart")}>
          Back to Cart
        </button>
      </div>
    </div>
  );
}

// ─── PAYMENT PAGE ─────────────────────────────────────────────────────────────
function PaymentPage({ cart, setCart, setPage }) {
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const pay = () => {
    setProcessing(true);
    setTimeout(() => { setCart([]); setPage("success"); }, 2200);
  };

  return (
    <div className="page-center">
      <div className="payment-card">
        <h2>Payment</h2>
        <div className="amount-box">
          <span>Amount Payable</span>
          <strong>Rs. {total.toLocaleString("en-IN")}</strong>
        </div>

        <h4 className="method-label">Select Payment Method</h4>
        <div className="method-group">
          {[["upi", "UPI Payment"], ["card", "Credit / Debit Card"], ["cod", "Cash on Delivery"]].map(([val, label]) => (
            <label key={val} className={`method-option ${method === val ? "selected" : ""}`}>
              <input type="radio" name="payment" value={val} checked={method === val} onChange={() => setMethod(val)} />
              <div className="method-indicator"></div>
              <span>{label}</span>
            </label>
          ))}
        </div>

        {method === "upi" && (
          <div className="payment-fields">
            <div className="form-group">
              <label>UPI ID</label>
              <input className="form-input" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
            </div>
          </div>
        )}
        {method === "card" && (
          <div className="payment-fields">
            <div className="form-group">
              <label>Card Number</label>
              <input className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} value={cardNo} onChange={e => setCardNo(e.target.value)} />
            </div>
            <div className="card-row">
              <div className="form-group">
                <label>Expiry</label>
                <input className="form-input" placeholder="MM / YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input className="form-input" placeholder="***" maxLength={3} type="password" value={cvv} onChange={e => setCvv(e.target.value)} />
              </div>
            </div>
          </div>
        )}
        {method === "cod" && (
          <div className="cod-note">You will pay Rs. {total.toLocaleString("en-IN")} at the time of delivery.</div>
        )}

        <button className={`btn-primary full-width ${processing ? "btn-loading" : ""}`} onClick={pay} disabled={processing}>
          {processing ? "Processing Payment..." : `Pay Rs. ${total.toLocaleString("en-IN")}`}
        </button>
        <button className="btn-outline full-width" style={{ marginTop: 10 }} onClick={() => setPage("checkout")} disabled={processing}>
          Back
        </button>
      </div>
    </div>
  );
}

// ─── SUCCESS PAGE ─────────────────────────────────────────────────────────────
function SuccessPage({ setPage }) {
  const orderId = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
  return (
    <div className="page-center">
      <div className="success-card">
        <div className="success-check">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="25" stroke="#2e7d32" strokeWidth="2" fill="#f1f8e9" />
            <path d="M14 27l9 9 15-16" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2>Payment Successful</h2>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        <div className="order-id-box">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>
        <p className="delivery-note">Estimated delivery: 2 - 4 business days</p>
        <button className="btn-primary" onClick={() => setPage("home")}>Continue Shopping</button>
        <button className="btn-outline" style={{ marginTop: 10 }} onClick={() => setPage("products")}>Browse More Products</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogin = (email) => { setUser(email); setPage("products"); };
  const handleLogout = () => { setUser(null); setCart([]); setPage("home"); };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} user={user} cart={cart} onLogout={handleLogout} />
      <main className="main-content">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "auth" && <AuthPage onLogin={handleLogin} />}
        {page === "products" && <ProductsPage cart={cart} setCart={setCart} user={user} setPage={setPage} />}
        {page === "cart" && <CartPage cart={cart} setCart={setCart} setPage={setPage} user={user} />}
        {page === "checkout" && <CheckoutPage cart={cart} setPage={setPage} />}
        {page === "payment" && <PaymentPage cart={cart} setCart={setCart} setPage={setPage} />}
        {page === "success" && <SuccessPage setPage={setPage} />}
      </main>
      <footer className="footer">
        <p>ShopEasy &copy; 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}