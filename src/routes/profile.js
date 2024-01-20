import React, { useState, useEffect } from 'react';
import { storage, db } from '../config/firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [workNumber, setWorkNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) {
      setError('User not authenticated.');
      return;
    }
  
  

    setLoading(true);
    setError(null);

    try {
      const batch = [];

      if (displayName.trim() !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: displayName.trim() });
        batch.push(updateDoc(doc(db, 'users', currentUser.uid), { displayName: displayName.trim() }));
      }

      if (email.trim() !== currentUser.email) {
        batch.push(updateDoc(doc(db, 'users', currentUser.uid), { email: email.trim() }));
      }

      if (profilePicture) {
        const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
        await uploadBytes(storageRef, profilePicture);
        const url = await getDownloadURL(storageRef);

        await updateProfile(currentUser, { photoURL: url });
        batch.push(updateDoc(doc(db, 'users', currentUser.uid), { photoURL: url }));
      }


      await Promise.all(batch);

    } catch (error) {
      console.error('Error updating profile:', error.message);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
      navigate('/routes/home');

    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  if (!currentUser) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '0' }}>
      <div>
        <h2>Edit Profile</h2>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Work Number:
          <input
            type="tel"
            value={workNumber}
            onChange={(e) => setWorkNumber(e.target.value)}
          />
        </label>

        <label>
          Mobile Number:
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label>

        <label>
          Work Address:
          <textarea
            rows="3"
            value={workAddress}
            onChange={(e) => setWorkAddress(e.target.value)}
          ></textarea>
        </label>

        <label>
          Profile Picture:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100px' }} />}
        </label>

        <button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        <button onClick={handleLogout}>Logout</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
