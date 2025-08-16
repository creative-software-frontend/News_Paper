'use client';

const UsersPage = () => {
  const handelSubmit = e => {
    e.preventDefault();
    const image = e.target.image.files[0];
    console.log(image);
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="file" name="image" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UsersPage;
