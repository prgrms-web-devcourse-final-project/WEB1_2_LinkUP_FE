import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../api/userService';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData('12345');
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data');
      }
    };

    loadUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          {/* <h1>{userData.name}</h1>
          <p>{userData.email}</p> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
