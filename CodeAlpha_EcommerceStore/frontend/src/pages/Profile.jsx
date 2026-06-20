function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="cart-container">
      <h1>My Profile</h1>

      <div className="cart-item">
        <h2>{user?.name}</h2>

        <p>Email: {user?.email}</p>

        <p>
          Account Status: Active
        </p>
      </div>
    </div>
  );
}

export default Profile;