import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

const Anggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnggota, setFilteredAnggota] = useState([]);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const response = await fetch('/api/anggota/get-all');
        const data = await response.json();
        setAnggota(data);
        setFilteredAnggota(data); // Initialize filteredAnggota with all anggota
      } catch (error) {
        console.error('Error fetching anggota:', error);
      }
    };

    fetchAnggota();
  }, []);

  // Fungsi untuk melakukan pencarian anggota
  const handleSearch = () => {
    if (searchTerm === '') {
      // Jika searchTerm kosong, kembalikan semua anggota
      setFilteredAnggota(anggota);
    } else {
      const result = anggota.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnggota(result);
    }
  };

  // Fungsi untuk menangani perubahan input pencarian
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      // Jika input pencarian kosong, kembalikan semua anggota
      setFilteredAnggota(anggota);
    }
  };

  // Fungsi untuk navigasi ke halaman tambah data
  const handleAddAnggota = () => {
    navigate('/tambah'); 
  };

  return (
    <div className="p-10">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 w-full"
          value={searchTerm}
          onChange={handleInputChange} // Panggil fungsi perubahan input
        />
        <button 
          className="ml-4 p-3 bg-gray-500 text-white rounded" 
          onClick={handleSearch} // Tetap panggil handleSearch saat tombol ditekan
        >
          Search
        </button>
      </div>
      <button 
        className="mb-4 p-3 bg-gray-500 text-white rounded" 
        onClick={handleAddAnggota} // Navigasi ke halaman tambah data
      >
        Tambah Anggota
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-600 text-center">
          <thead>
            <tr>
              <th className="border border-gray-600 px-2 py-2">Image</th>
              <th className="border border-gray-600 px-2 py-2">Name</th>
              <th className="border border-gray-600 px-2 py-2">Jabatan</th>
              <th className="border border-gray-600 px-2 py-2">Atasan</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnggota.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-600 px-2 py-2">
                  <img 
                    src={`data:image/jpeg;base64,${item.image}`} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover mx-auto" 
                  />
                </td>
                <td className="border border-gray-600 px-2 py-2">{item.name}</td>
                <td className="border border-gray-600 px-2 py-2">{item.jabatan}</td>
                <td className="border border-gray-600 px-2 py-2">{item.atasan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Anggota;
