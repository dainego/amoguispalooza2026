
import { useState } from "react";
import "./App.css";

const families = [
  "Dudesek",
  "Otero",
  "Oliver",
  "Gomez Barrios",
  "Musso",
];

const initialProducts = [
  {
    id: 1,
    family: "Otero",
    product: "Vacío",
    category: "Comida",
    mode: "Repartir",
    quantity: 3,
    unit: "kg",
  },
  {
    id: 2,
    family: "Dudesek",
    product: "Fernet",
    category: "Bebidas",
    mode: "Repartir",
    quantity: 2,
    unit: "botellas",
  },
  {
    id: 3,
    family: "Oliver",
    product: "Carbón",
    category: "Insumos",
    mode: "Trae familia",
    quantity: 1,
    unit: "bolsa",
  },
];

const emptyForm = {
  family: "Otero",
  product: "",
  category: "Comida",
  mode: "Repartir",
  quantity: "1",
  unit: "unidad",
};

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = products.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      item.product.toLowerCase().includes(searchText) ||
      item.family.toLowerCase().includes(searchText)
    );
  });

  const totalProducts = products.length;

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleAddProduct(event) {
    event.preventDefault();

    const newProduct = {
      ...form,
      id: Date.now(),
      quantity: Number(form.quantity),
    };

    setProducts((current) => [...current, newProduct]);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="brand-tag">FESTIVAL · FRIENDS · FOOD</div>

          <h1>
            AMIGUIS<span>PALLOOZA</span>
          </h1>

          <p className="hero-subtitle">FOOD & DRINKS PLANNER 2026</p>

          <div className="hero-info">
            <span>📅 5 — 8 DICIEMBRE</span>
            <span>📍 PENTÁGONO · SAN ANDRÉS DE GILES</span>
          </div>
        </div>

        <div className="hero-decoration">🤖</div>
      </header>

      <main className="main-content">
        <section className="welcome">
          <div>
            <span className="section-label">CENTRO DE OPERACIONES</span>
            <h2>¿Qué vamos a llevar?</h2>
            <p>
              Cada familia puede cargar libremente sus aportes.
              Todos colaboramos, todos vemos los cambios.
            </p>
          </div>

          <div className="online-status">
            <span></span> PLANIFICACIÓN ABIERTA
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>📦</span>
            <strong>{totalProducts}</strong>
            <small>Productos cargados</small>
          </div>

          <div className="stat-card">
            <span>🍖</span>
            <strong>
              {products.filter((p) => p.category === "Comida").length}
            </strong>
            <small>Comida</small>
          </div>

          <div className="stat-card">
            <span>🍹</span>
            <strong>
              {products.filter((p) => p.category === "Bebidas").length}
            </strong>
            <small>Bebidas</small>
          </div>

          <div className="stat-card">
            <span>🧹</span>
            <strong>
              {products.filter((p) => p.category === "Limpieza").length}
            </strong>
            <small>Productos de limpieza</small>
          </div>

          <div className="stat-card">
            <span>🧰</span>
            <strong>
              {products.filter((p) => p.category === "Insumos").length}
            </strong>
            <small>Insumos</small>
          </div>

          <div className="stat-card">
            <span>📅</span>
            <strong>4</strong>
            <small>Días de encuentro</small>
          </div>
        </section>

        <section className="planner">
          <div className="planner-header">
            <div>
              <span className="section-label">REGISTRO COLABORATIVO</span>
              <h2>Lista de aportes</h2>
            </div>

            <button
              className="add-button"
              onClick={() => setShowForm(true)}
            >
              + AGREGAR PRODUCTO
            </button>
          </div>

          {showForm && (
            <div className="product-form-container">
              <h3>Nuevo aporte</h3>

              <form onSubmit={handleAddProduct} className="product-form">
                <div className="form-field">
                  <label>Familia responsable</label>
                  <select
                    name="family"
                    value={form.family}
                    onChange={handleFormChange}
                    required
                  >
                    {families.map((family) => (
                      <option key={family} value={family}>
                        {family}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Producto</label>
                  <input
                    type="text"
                    name="product"
                    placeholder="Ej. Asado, cerveza, servilletas..."
                    value={form.product}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Categoría</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Comida">Comida</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Insumos">Insumos</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Modalidad del aporte</label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Repartir">Repartir</option>
                    <option value="Trae familia">Trae familia</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    name="quantity"
                    min="0.01"
                    step="0.01"
                    value={form.quantity}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Unidad</label>
                  <select
                    name="unit"
                    value={form.unit}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="unidad">Unidad</option>
                    <option value="kg">Kg</option>
                    <option value="litros">Litros</option>
                    <option value="botellas">Botellas</option>
                    <option value="paquetes">Paquetes</option>
                    <option value="bolsas">Bolsas</option>
                    <option value="cajas">Cajas</option>
                  </select>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowForm(false);
                      setForm(emptyForm);
                    }}
                  >
                    CANCELAR
                  </button>

                  <button type="submit" className="add-button">
                    GUARDAR PRODUCTO
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="toolbar">
            <input
              type="text"
              placeholder="Buscar producto o familia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>FAMILIA</th>
                  <th>PRODUCTO</th>
                  <th>CATEGORÍA</th>
                  <th>MODALIDAD</th>
                  <th>CANTIDAD</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.family}</td>
                    <td className="product-name">{item.product}</td>
                    <td>
                      <span
                        className={`category ${item.category.toLowerCase()}`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td>{item.mode}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty">
                      No hay productos para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Mostrando {filteredProducts.length} de {totalProducts} productos
          </div>
        </section>

        <footer>
          <strong>AMIGUISPALLOOZA 2026</strong>
          <p>EL ÚNICO FILTRO ES EL DE LA PILETA.</p>
          <small>Organización asistida por inteligencia artificial 🤖</small>
        </footer>
      </main>
    </div>
  );
}

export default App;
