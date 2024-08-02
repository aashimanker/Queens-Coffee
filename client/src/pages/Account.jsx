import React from 'react'
import '../css/account.css'

function Account({name,email,role}) {
  const imageUrl = 'https://sales.webtel.in/images/Login-page-character1.png'
  return (
    <>
    <div className="account-details">
      {imageUrl && (
        <div className="account-image">
          <img src={imageUrl} alt={`${name}'s profile`} />
        </div>
      )}
      <div className="account-info">
        <h2 className="account-title">Account Details</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      
    </div>
    <div>
    <div className="map-container">
      <iframe
        className="map-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30462.68339400504!2d78.4715125743164!3d17.3716505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb998ca96730fb%3A0x44c7e3a735a93ee!2sQaffeine!5e0!3m2!1sen!2sin!4v1722609112151!5m2!1sen!2sin"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    </div>
    </>
  )
}

export default Account