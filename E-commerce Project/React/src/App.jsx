import { useState, useMemo } from "react";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format", rating: 4.5, reviews: 128 },
  { id: 2, name: "Running Sneakers", price: 3999, category: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format", rating: 4.3, reviews: 87 },
  { id: 3, name: "Leather Wallet", price: 899, category: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop&auto=format", rating: 4.7, reviews: 203 },
  { id: 4, name: "Smart Watch", price: 8999, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format", rating: 4.6, reviews: 312 },
  { id: 5, name: "Sunglasses", price: 1599, category: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&auto=format", rating: 4.2, reviews: 65 },
  { id: 6, name: "Backpack", price: 2199, category: "Bags", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format", rating: 4.4, reviews: 149 },
  { id: 7, name: "Yoga Mat", price: 1299, category: "Fitness", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop&auto=format", rating: 4.8, reviews: 91 },
  { id: 8, name: "Coffee Maker", price: 4599, category: "Kitchen", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format", rating: 4.5, reviews: 176 },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#d97706", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#888", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

export default function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);

  const showToast = (msg, color = "#10b981") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2200);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    setCart(prev => prev.filter(i => i.id !== id));
    if (item) showToast(`${item.name} removed`, "#ef4444");
  };

  const changeQty = (id, delta) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = useMemo(() =>
    PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [search, category]);

  const handleAuth = (e) => {
    e.preventDefault();
    setLoginError("");
    if (isRegister) {
      if (!form.name || !form.email || !form.mobile || !form.password) {
        setLoginError("All fields are required.");
        return;
      }
      if (!/^\d{10}$/.test(form.mobile)) {
        setLoginError("Enter a valid 10-digit mobile number.");
        return;
      }
      setUser({ name: form.name, email: form.email });
      setPage("shop");
      showToast(`Welcome, ${form.name}! 🎉`);
    } else {
      if (!form.email || !form.password) {
        setLoginError("Email and password are required.");
        return;
      }
      setUser({ name: form.email.split("@")[0], email: form.email });
      setPage("shop");
      showToast("Logged in successfully!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCartOpen(false);
    showToast("Logged out.", "#6b7280");
  };

  const navStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 24px", height: 60, background: "#1e1b4b",
    position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
  };

  const btnStyle = (bg, color = "#fff") => ({
    background: bg, color, border: "none", borderRadius: 8,
    padding: "8px 18px", fontWeight: 600, cursor: "pointer", fontSize: 14
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f4fb", fontFamily: "system-ui,sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 18, right: 24, zIndex: 9999,
          background: toast.color, color: "#fff", padding: "12px 22px",
          borderRadius: 10, fontWeight: 600, fontSize: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all .3s"
        }}>{toast.msg}</div>
      )}

      {/* Navbar */}
      <nav style={navStyle}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>
          🛍 ShopArc
        </span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ color: "#c7d2fe", fontSize: 14 }}>Hi, {user.name}</span>
              <button onClick={handleLogout} style={{ ...btnStyle("#4338ca"), fontSize: 13 }}>Logout</button>
            </>
          ) : (
            <button onClick={() => { setPage("login"); setIsRegister(false); }} style={btnStyle("#4338ca")}>
              Login / Register
            </button>
          )}
          <button onClick={() => setCartOpen(o => !o)} style={{
            ...btnStyle("#6d28d9"), position: "relative"
          }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -7, right: -7, background: "#ef4444",
                color: "#fff", borderRadius: "50%", width: 20, height: 20,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{
          position: "fixed", top: 60, right: 0, width: 340, height: "calc(100vh - 60px)",
          background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.13)", zIndex: 99,
          display: "flex", flexDirection: "column", borderLeft: "0.5px solid #e5e7eb"
        }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#1e1b4b" }}>Your Cart ({cartCount})</span>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: 60, color: "#9ca3af" }}>
                <div style={{ fontSize: 40 }}>🛒</div>
                <p style={{ marginTop: 12 }}>Your cart is empty</p>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{
                display: "flex", gap: 12, alignItems: "center",
                padding: "12px 0", borderBottom: "1px solid #f3f4f6"
              }}>
                <img src={item.image} alt={item.name} style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", border: "1px solid #e5e7eb", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1e1b4b" }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>₹{item.price.toLocaleString()}</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
                    <button onClick={() => changeQty(item.id, -1)} style={{ ...btnStyle("#e0e7ff", "#4338ca"), padding: "2px 10px", fontSize: 16 }}>−</button>
                    <span style={{ fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)} style={{ ...btnStyle("#e0e7ff", "#4338ca"), padding: "2px 10px", fontSize: 16 }}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1e1b4b" }}>₹{(item.price * item.qty).toLocaleString()}</div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    marginTop: 8, background: "#fee2e2", color: "#ef4444",
                    border: "none", borderRadius: 6, padding: "4px 10px",
                    fontSize: 12, fontWeight: 600, cursor: "pointer"
                  }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: "16px 20px", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 600, color: "#374151" }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: "#1e1b4b" }}>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button style={{ ...btnStyle("#4f46e5"), width: "100%", padding: "12px", fontSize: 15, borderRadius: 10 }}>
                Checkout →
              </button>
              <button onClick={() => setCart([])} style={{
                ...btnStyle("#fee2e2", "#ef4444"), width: "100%",
                padding: "10px", fontSize: 14, borderRadius: 10, marginTop: 8
              }}>Clear Cart</button>
            </div>
          )}
        </div>
      )}

      {/* LOGIN PAGE */}
      {page === "login" && (
        <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "36px 32px",
            width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(79,70,229,0.10)"
          }}>
            <h2 style={{ textAlign: "center", margin: "0 0 6px", color: "#1e1b4b", fontSize: 24, fontWeight: 800 }}>
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p style={{ textAlign: "center", color: "#6b7280", margin: "0 0 24px", fontSize: 14 }}>
              {isRegister ? "Join ShopArc today" : "Sign in to your account"}
            </p>
            {loginError && (
              <div style={{ background: "#fee2e2", color: "#ef4444", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 14 }}>
                {loginError}
              </div>
            )}
            <form onSubmit={handleAuth}>
              {isRegister && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name</label>
                  <input
                    type="text" placeholder="John Doe" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
              )}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                <input
                  type="email" placeholder="you@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              {isRegister && (
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Mobile Number</label>
                  <input
                    type="tel" placeholder="10-digit mobile" value={form.mobile}
                    onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
                <input
                  type="password" placeholder="••••••••" value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }}
                />
              </div>
              <button type="submit" style={{ ...btnStyle("#4f46e5"), width: "100%", padding: "12px", fontSize: 15, borderRadius: 10 }}>
                {isRegister ? "Create Account" : "Sign In"}
              </button>
            </form>
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#6b7280" }}>
              {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => { setIsRegister(r => !r); setLoginError(""); }}
                style={{ background: "none", border: "none", color: "#4f46e5", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {isRegister ? "Sign In" : "Register"}
              </button>
            </p>
            <button onClick={() => setPage("shop")} style={{
              display: "block", margin: "12px auto 0", background: "none", border: "none",
              color: "#9ca3af", fontSize: 13, cursor: "pointer"
            }}>← Back to Shop</button>
          </div>
        </div>
      )}

      {/* SHOP PAGE */}
      {page === "shop" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
          {/* Hero */}
          <div style={{
            background: "linear-gradient(120deg, #4f46e5 0%, #7c3aed 100%)",
            borderRadius: 16, padding: "32px 36px", marginBottom: 28, color: "#fff"
          }}>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800 }}>Discover Amazing Products</h1>
            <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: 15 }}>Free delivery on orders above ₹999 · Best prices guaranteed</p>
          </div>

          {/* Search + Filter */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 18 }}>🔍</span>
              <input
                type="text" placeholder="Search products…" value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "11px 14px 11px 38px", borderRadius: 10,
                  border: "1.5px solid #e5e7eb", fontSize: 14, background: "#fff",
                  boxSizing: "border-box", outline: "none"
                }}
              />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{
              padding: "11px 16px", borderRadius: 10, border: "1.5px solid #e5e7eb",
              fontSize: 14, background: "#fff", cursor: "pointer"
            }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Results count */}
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            {search && ` for "${search}"`}
          </p>

          {/* Products Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {filtered.map(product => {
              const inCart = cart.find(i => i.id === product.id);
              return (
                <div key={product.id} style={{
                  background: "#fff", borderRadius: 14, overflow: "hidden",
                  border: "1px solid #e5e7eb", transition: "box-shadow .2s",
                  display: "flex", flexDirection: "column"
                }}>
                  <div style={{ position: "relative", height: 180, background: "#f3f4f6", overflow: "hidden" }}>
                    <img
                      src={product.image} alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    {inCart && (
                      <div style={{
                        position: "absolute", top: 8, right: 8, background: "#10b981",
                        color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700
                      }}>In Cart</div>
                    )}
                  </div>
                  <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{ fontSize: 11, background: "#ede9fe", color: "#5b21b6", borderRadius: 6, padding: "3px 8px", fontWeight: 600, alignSelf: "flex-start", marginBottom: 8 }}>
                      {product.category}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1e1b4b", marginBottom: 4 }}>{product.name}</div>
                    <StarRating rating={product.rating} />
                    <span style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{product.reviews} reviews</span>
                    <div style={{ fontWeight: 800, fontSize: 20, color: "#4f46e5", marginBottom: 14 }}>₹{product.price.toLocaleString()}</div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        ...btnStyle(inCart ? "#d1fae5" : "#4f46e5", inCart ? "#059669" : "#fff"),
                        borderRadius: 9, padding: "10px", fontSize: 14, marginTop: "auto"
                      }}
                    >
                      {inCart ? `✓ In Cart (${inCart.qty})` : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 48 }}>🔍</div>
                <p style={{ marginTop: 12, fontSize: 16 }}>No products found. Try a different search.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
