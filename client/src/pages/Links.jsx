import React from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

function Links() {
   const [links, setLinks] = React.useState([]);
   const { loading, request } = useHttp();
   const { token } = React.useContext(AuthContext);

   const fetchLinks = React.useCallback(async () => {
      try {
         const fetched = await request('/api/links', 'GET', null, { Authorization: `Bearer ${token}` });
         setLinks(fetched);
      } catch (e) {}
   }, [token, request]);

   React.useEffect(() => {
      fetchLinks();
   }, [fetchLinks]);

   if (loading) {
      return <Loader />;
   }

   return (
      <div className="container">
         <h1>Your Links</h1>
         <>{!loading && <LinksList links={links} />}</>
      </div>
   );
}

export default Links;
