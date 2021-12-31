import axios from 'axios';
import { useState } from 'react';

const Claims = () => {
  const [uid, setUid] = useState('');

  const handlePrint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await axios.get<any>(
      `/api/claims?uid=${encodeURIComponent(uid)}`,
    );
    console.log(result.data);
  };

  return (
    <>
      <h2>Print server claims to console</h2>
      <form onSubmit={handlePrint}>
        <div>
          <input
            type="text"
            value={uid}
            onChange={e => setUid(e.target.value.trim())}
            placeholder="uid"
            required
          />
        </div>
        <div>
          <button type="submit">Print</button>
        </div>
      </form>
    </>
  );
};

export default Claims;
