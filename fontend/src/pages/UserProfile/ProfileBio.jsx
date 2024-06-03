
import React from 'react';

export const ProfileBio  = ({ user }) => {
  return (
    <div className="profile" style={styles.profile}>
      <div className="userProfileCard" style={styles.userProfileCard}>
        <img src="user-profile-image.jpg" alt="User Profile Image" className="userProfileImag" style={styles.userProfileImage } />
        <h2 className="userProfileName" style={styles.userProfileName}>{user.name}</h2>
        <p className="userProfileEmail" style={styles.userProfileEmail}>{user.email}</p>
        <p className="userProfilePhone" style={styles.userProfilePhone}>{user.phone}</p>
        <p className="userProfileLocation " style={styles.userProfileLocation}>{user.location}</p>
        <button className="editButton" style={styles.editButton}>Edit</button>
      </div>
    </div>
  );
};

const styles = {
  profile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
  },
  userProfileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  },
  userProfileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  userProfileName: {
    fontSize: '24px',
    marginBottom: '5px',
  },
  userProfileEmail: {
    fontSize: '16px',
    marginBottom: '5px',
    color:'black'
  },
  userProfilePhone: {
    fontSize: '16px',
    marginBottom: '5px',
    color:'black'
  },
  userProfileLocation: {
    fontSize: '16px',
    marginBottom: '5px',
    color:'black'
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  '@media screen and (max-width: 768px)': {
    userProfileCard: {
      width: '100%',
    },
  },
};
