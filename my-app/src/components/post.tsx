// import React, { useState } from 'react';
// import axios from 'axios';

// const JobPost: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     if (!token) {
//       setError('You must be logged in to create a job post.');
//       return;
//     }

//     try {
//       await axios.post(
//         'http://127.0.0.1:8000/jobposts/', // Adjust the URL as needed
//         { title, description },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setSuccess('Job post created successfully!');
//       setTitle('');
//       setDescription('');
//     } catch (error) {
//       console.error('Error creating job post:', error);
//       setError('Failed to create job post.');
//     }
//   };

//   return (
//     <div>
//       <h2>Create Job Post</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Job Post</button>
//         {success && <p style={{ color: 'green' }}>{success}</p>}
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default JobPost;
import React, { useState } from 'react';
import axios from 'axios';

const PostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://127.0.0.1:8000/post/', { title, description }, {
      headers: { Authorization: `Token ${token}` }
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
