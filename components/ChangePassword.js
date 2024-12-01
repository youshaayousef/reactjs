import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/change-password/', {
                old_password: oldPassword,
                new_password: newPassword,
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            // Handle successful password change
            alert(response.data.message);
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;