import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8000/order.php";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [nama, setNama] = useState("");
  const [menu, setMenu] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [editId, setEditId] = useState(null);

  // Ambil data order dari backend
  const fetchOrders = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Edit order (PUT)
      fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, nama, menu, jumlah }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPesan(data.message);
          setEditId(null);
          setNama("");
          setMenu("");
          setJumlah(1);
          fetchOrders();
        });
    } else {
      // Tambah order (POST)
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, menu, jumlah }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPesan(data.message);
          setNama("");
          setMenu("");
          setJumlah(1);
          fetchOrders();
        });
    }
  };

  // Hapus order
  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus order ini?")) {
      fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPesan(data.message);
          fetchOrders();
        });
    }
  };

  // Edit order (isi form dengan data order)
  const handleEdit = (order) => {
    setEditId(order.id);
    setNama(order.nama);
    setMenu(order.menu);
    setJumlah(order.jumlah);
  };

  return (
    <div id="order" className="py-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading section */}
        <div className="mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-center text-amber-900 text-4xl font-bold font-cursive"
          >
            Order Form
          </motion.h1>
        </div>
        {/* Order card section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex flex-col gap-8 items-center"
        >
          <div className="w-full max-w-md shadow-lg py-8 px-6 mx-4 rounded-xl bg-amber-900/10 relative">
            {pesan && <div className="mb-4 text-green-700 text-center">{pesan}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Pemesan"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
              <input
                type="text"
                placeholder="Menu"
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
              <input
                type="number"
                min={1}
                placeholder="Jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
              <button type="submit" className="w-full py-2 px-4 bg-amber-900 text-white font-semibold rounded-lg shadow-md hover:bg-amber-950 transition duration-300">
                {editId ? "Update" : "Order"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setNama("");
                    setMenu("");
                    setJumlah(1);
                  }}
                  className="w-full py-2 px-4 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 mt-2"
                >
                  Batal Edit
                </button>
              )}
            </form>
          </div>
          <div className="w-full max-w-md shadow-lg py-8 px-6 mx-4 rounded-xl bg-amber-900/10 relative">
            <h3 className="text-xl font-bold text-center text-black/80 font-cursive2 mb-4">Daftar Orderan</h3>
            <ul className="space-y-2">
              {orders.length === 0 && <li className="text-center text-gray-500">Belum ada orderan.</li>}
              {orders.map((order) => (
                <li key={order.id} className="flex justify-between items-center bg-white/70 rounded px-3 py-2">
                  <span>{order.nama} - {order.menu} ({order.jumlah})</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="px-2 py-1 bg-amber-900 text-white rounded hover:bg-amber-950 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-800 text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Order;
