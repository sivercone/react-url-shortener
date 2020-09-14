import React from 'react';

function LinksList({ links }) {
   if (!links.length) {
      return <p>Здесь будут хранится ваши ссылки</p>;
   }

   return (
      <>
         <div className="links__top">
            <span className="links__index">#</span>
            <span className="links__from">Source</span>
            <span className="links__to">Chainsawed</span>
            <span>Details</span>
         </div>

         {links.map((link, index) => {
            return (
               <div className="links__content">
                  <span className="links__index">{index + 1}</span>
                  <span className="links__from">{link.from}</span>
                  <span className="links__to">{link.to}</span>
                  <span className="links__details">
                     <a href={`/detail/${link._id}`}>Open</a>
                  </span>
               </div>
            );
         })}
      </>
   );
}

export default LinksList;
