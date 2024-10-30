import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tambah = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [jabatan, setJabatan] = useState('');
  const [atasan, setAtasan] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('jabatan', jabatan);
    formData.append('atasan', atasan);
    formData.append('anggotaImage', image);

    try {
      const response = await fetch('/api/anggota/add-anggota', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Data gagal ditambahkan');
        return;
      }

      const data = await response.json();
      alert(data.message); // Alert success message
      navigate('/anggota'); // Redirect to anggota page after successful addition
    } catch (error) {
      console.error('Error adding anggota:', error);
      alert('Terjadi kesalahan saat menambahkan data');
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tambah Anggota</h2>
      <form onSubmit={handleSubmit} className="bg-gray-200 p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-400 p-2 w-full rounded"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Jabatan</label>
          <input
            type="text"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            required
            className="border border-gray-400 p-2 w-full rounded"
            placeholder="Enter jabatan"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Atasan</label>
          <input
            type="text"
            value={atasan}
            onChange={(e) => setAtasan(e.target.value)}
            required
            className="border border-gray-400 p-2 w-full rounded"
            placeholder="Enter atasan"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="border border-gray-400 p-2 w-full rounded"
          />
        </div>

        <button type="submit" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Tambah;
