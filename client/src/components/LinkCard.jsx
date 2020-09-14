// 2:47 stopped

import React from 'react';

function LinkCard({ link }) {
   return (
      <div className="container">
         <div className="linkcard">
            <h1>Details of Link</h1>
            <div className="linkcard__details">
               <b>Source:</b>
               <a href={link.from} target="_blank" rel="noopener noreferrer">
                  {link.from}
               </a>
            </div>
            <div className="linkcard__details">
               <b>Chainsawed Link:</b>
               <a href={link.to} target="_blank" rel="noopener noreferrer">
                  {link.to}
               </a>
            </div>
            <div className="linkcard__details">
               <b>Amount of Clicks:</b>
               <span>{link.clicks}</span>
            </div>
            <div className="linkcard__details">
               <b>Date of Creation:</b>
               <span>{new Date(link.date).toLocaleDateString()}</span>
            </div>
         </div>
      </div>
   );
}

export default LinkCard;
