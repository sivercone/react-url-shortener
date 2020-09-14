import React from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

function Create() {
   const history = useHistory();

   const auth = React.useContext(AuthContext);

   const { request } = useHttp();

   const [link, setLink] = React.useState('');

   const pressHandler = async () => {
      try {
         const data = await request('/api/links/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` });
         history.push(`/detail/${data.link._id}`);
      } catch (e) {}
   };

   return (
      <div className="container">
         <h1>Create Chainsawed Link</h1>
         <input
            className="link_input"
            placeholder="http://example.com"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
         />

         <button onClick={pressHandler}>Create</button>
      </div>
   );
}

export default Create;
