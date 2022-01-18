import React, { useEffect, useState } from 'react';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';
import StorageUser from 'constants/storage-user';
import NavBar from 'components/Header';
import './Profile.scss';
import customerApi from 'api/customerApi';

function ProfileFeature(props) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [profile, setProfile] = useState();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(StorageUser.TOKEN);
    if (!token) {
      history.replace('/login');
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await customerApi.get(
          localStorage.getItem(StorageUser.ID)
        );
        console.log(data);
      } catch (error) {
        console.log('Failed to fetch profile: ', error);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div className="sweet_loading">
          <ClipLoader color={'#F5A623'} loading={loading} size={40} />
          <span>Please Wait</span>
        </div>
      ) : (
        <>
          <NavBar />
          <Footer />
        </>
      )}
    </>
  );
}

export default ProfileFeature;
