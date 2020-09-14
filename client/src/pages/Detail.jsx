import React from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

function Detail() {
   const { token } = React.useContext(AuthContext);
   const { request, loading } = useHttp();

   const [link, setLink] = React.useState(null);
   const linkId = useParams().id;

   const getLink = React.useCallback(async () => {
      try {
         const fetched = await request(`/api/links/${linkId}`, 'GET', null, {
            Authorization: `Bearer ${token}`,
         });
         setLink(fetched);
      } catch (e) {}
   }, [token, linkId, request]);

   React.useEffect(() => {
      getLink();
   }, [getLink]);

   if (loading) {
      return <Loader />;
   }

   return <>{!loading && link && <LinkCard link={link} />}</>;
}

export default Detail;
