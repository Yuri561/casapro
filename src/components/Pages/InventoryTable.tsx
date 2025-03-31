import React, { useState } from "react";
import productData from "../../db/InventoryProdDb";
import { ChevronDown, Clock, Search, PlusCircle } from "lucide-react";

// Product Type Definition
export type Product = {
  id: number;
  name: string;
  category: string;
  location: string;
  quantity: number;
  price: number;
  color: string;
};

const InventoryTable: React.FC = () => {
  const [selectedRange] = useState<string>("Last 30 days");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: productData.length + 1,
    name: "",
    category: "",
    location: "",
    quantity: 0,
    price: 0,
    color: "#ffffff",
  });

  // Handle Search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter Products Based on Search
  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Edit Click
  const handleEditClick = (product: Product) => {
    setEditRowId(product.id);
    setEditedProduct({ ...product });
  };

  // Handle Input Change in Editable Row
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [field]:
          field === "quantity" || field === "price"
            ? parseFloat(event.target.value)
            : event.target.value,
      });
    }
  };

  // Save Updated Row
  const handleSaveClick = (id: number) => {
    const updatedProducts = productData.map((product) =>
      product.id === id ? { ...editedProduct } : product
    );
    console.log("Updated Products:", updatedProducts);
    setEditRowId(null);
  };

  // Handle New Inventory Input Change
  const handleNewInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Product
  ) => {
    setNewProduct({
      ...newProduct,
      [field]:
        field === "quantity" || field === "price"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };

  // Add New Inventory Item
  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.quantity &&
      newProduct.price
    ) {
      productData.push({ ...newProduct, id: productData.length + 1 });
      setShowAddForm(false);
      setNewProduct({
        id: productData.length + 1,
        name: "",
        category: "",
        location: "",
        quantity: 0,
        price: 0,
        color: "#ffffff",
      });
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        {/* Dropdown Menu */}
        <div className="relative">
          <button
            id="dropdownRadioButton"
            type="button"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            {selectedRange}
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Search Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            id="table-search"
            value={searchQuery}
            onChange={handleSearch}
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>

        {/* Add Inventory Button */}
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {showAddForm ? "Close" : "Add"}
          </button>
        </div>
      </div>

      {/* Add Inventory Form */}
      {showAddForm && (
        <div className="p-4 bg-white rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => handleNewInputChange(e, "name")}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => handleNewInputChange(e, "category")}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={newProduct.location}
              onChange={(e) => handleNewInputChange(e, "location")}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) => handleNewInputChange(e, "quantity")}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => handleNewInputChange(e, "price")}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="color"
              value={newProduct.color}
              onChange={(e) => handleNewInputChange(e, "color")}
              className="w-12 h-12"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddProduct}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              Save Item
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 bg-gray-50 rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm"
              />
            </th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Color</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Quantity</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product, index) => (
           <tr
           key={product.id}
           className={`transition-all duration-200 ${
             index % 2 === 0
               ? "bg-gradient-to-r from-teal-50 to-cyan-50"
               : "bg-gradient-to-r from-blue-50 to-blue-100"
           } hover:bg-gray-100`}
         >
              <td className="w-4 p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                />
              </td>

              {/* Editable Row */}
              {editRowId === product.id ? (
                <>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editedProduct?.name || ""}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editedProduct?.color || ""}
                      onChange={(e) => handleInputChange(e, "color")}
                      className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={editedProduct?.category || ""}
                      onChange={(e) => handleInputChange(e, "category")}
                      className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={editedProduct?.quantity || 0}
                      onChange={(e) => handleInputChange(e, "quantity")}
                      className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={editedProduct?.price || 0}
                      onChange={(e) => handleInputChange(e, "price")}
                      className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSaveClick(product.id)}
                      className="text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 text-xs font-bold rounded-lg shadow-md transition-all duration-200"
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {/* Normal Row */}
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: product.color }}
                      />
                      <span className="text-gray-600">{product.color}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">${product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-white bg-teal-500 hover:bg-teal-600 px-4 py-2 text-xs font-bold rounded-lg shadow-md transition-all duration-200"
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
