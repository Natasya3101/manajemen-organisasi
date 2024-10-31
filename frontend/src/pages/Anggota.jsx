import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Anggota = () => {
  const [anggota, setAnggota] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnggota, setFilteredAnggota] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnggota, setSelectedAnggota] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const response = await fetch('/api/anggota/get-all');
        const data = await response.json();
        setAnggota(data);
        setFilteredAnggota(data);
      } catch (error) {
        console.error('Error fetching anggota:', error);
      }
    };

    fetchAnggota();
  }, []);

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredAnggota(anggota);
    } else {
      const result = anggota.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnggota(result);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredAnggota(anggota);
    }
  };

  const handleAddAnggota = () => {
    navigate('/tambah');
  };

  const handleDetail = (item) => {
    setSelectedAnggota(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAnggota(null);
  };

  return (
    <div className="p-10">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 w-full"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="ml-4 p-3 bg-gray-500 text-white rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <button
        className="mb-4 p-3 bg-gray-500 text-white rounded"
        onClick={handleAddAnggota}
      >
        Tambah Anggota
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-600 text-center">
          <thead>
            <tr>
              <th className="border border-gray-600 px-2 py-2">Image</th>
              <th className="border border-gray-600 px-2 py-2">Nama</th>
              <th className="border border-gray-600 px-2 py-2">Jabatan</th>
              <th className="border border-gray-600 px-2 py-2">Atasan</th>
              <th className="border border-gray-600 px-2 py-2">Action</th>
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
                <td className="border border-gray-600 px-2 py-2">
                  <button
                    className="bg-gray-500 text-white px-3 py-3 rounded hover:bg-gray-700"
                    onClick={() => handleDetail(item)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Detail View */}
      {showModal && selectedAnggota && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded shadow-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Anggota Details</h2>
            <div className="text-center">
              <img
                src={`data:image/jpeg;base64,${selectedAnggota.image}`}
                alt={selectedAnggota.name}
                style={{ width: '300px', height: '300px' }}
                className="object-cover mx-auto mb-4"
              />
              <p><strong>Nama:</strong> {selectedAnggota.name}</p>
              <p><strong>Jabatan:</strong> {selectedAnggota.jabatan}</p>
              <p><strong>Atasan:</strong> {selectedAnggota.atasan}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anggota;
