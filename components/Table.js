import Image from 'next/image';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const Table = ({ columns, data, searchBy, acrossSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-fit">
          <input
            type="text"
            className="rounded-md border border-slate-300 py-1 px-4 outline-none focus:ring-1 focus:ring-primary"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute top-2 right-2 text-slate-300" size={20} />
        </div>
        {acrossSearch}
      </div>
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name} className="border bg-blue-200 px-8 py-4 text-left">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data
              .filter((item) => {
                if (search === '') {
                  return item;
                } else if (searchBy.length) {
                  return searchBy.some((key) => item[key].toLowerCase().includes(search.toLowerCase()));
                }
              })
              .map((item, i) => (
                <tr key={i}>
                  {columns.map((column) => (
                    <td key={column} className="border px-8 py-4">
                      {item[column.label]}
                    </td>
                  ))}
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center">
                <Image src="/gif/circle-loading.gif" width={30} height={30} alt="Loading" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
