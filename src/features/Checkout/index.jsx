import React, { useEffect, useState } from 'react';
import Footer from 'features/Product/components/Footer/Footer';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from 'react-router-dom';
import StorageUser from 'constants/storage-user';
import NavBar from 'components/Header';
import './Checkout.scss';
import customerApi from 'api/customerApi';
import GENDER_CONSTANTS from 'constants/gender';
import { Dialog, DialogContent, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import UpdateCustomer from 'features/CRUD/components/UpdateCustomer/UpdateCustomer';

function CheckoutFeature(props) {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [profile, setProfile] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(StorageUser.ID);
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
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch profile: ', error);
      }
    })();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === 'backdropClick') return;

    setOpen(false);
  };

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
          <div className="profile_container">
            <div className="profile_wrapper">
              <div className="profile_title">Thông tin cá nhân</div>
              <div className="profile_info">{`Họ tên: ${profile.name}`}</div>
              <div className="profile_info">{`Số điện thoại: ${profile.phoneNumber}`}</div>
              <div className="profile_info">{`Email: ${profile.email}`}</div>
              <div className="profile_info">{`Địa chỉ: ${profile.address}`}</div>
              <div className="profile_info">{`Giới tính: ${
                GENDER_CONSTANTS.find((i) => i.value === profile.gender).text
              }`}</div>
              <div className="profile_edit" onClick={handleClickOpen}>
                Chỉnh sửa
              </div>
            </div>
            <div>
              <img src="banner.png" alt="banner" className="profile_banner" />
            </div>
          </div>
          <Footer />
          <Dialog
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <IconButton className="dialog__close-button" onClick={handleClose}>
              <Close />
            </IconButton>
            <DialogContent>
              <UpdateCustomer closeDialog={handleClose} Customer={profile} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default CheckoutFeature;
