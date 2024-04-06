import React, { useEffect, useState } from 'react'
import { contactDetais } from '../appwrite'
import ContactCard from '../components/Contacts/ContactCard'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllContacts = () => {
  const [contacts, setContacts] = useState(null)
  const fetchAllContact = async() => {
    const res  = await contactDetais.fetchAllCOntacts();
    if(res) setContacts(res.documents)
    console.log(res)
  }
useEffect(()=>{
  fetchAllContact()
},[])
  return (
    <div className='m-3'>
    <ToastContainer /> 
      <div className='font-bold text-3xl underline'>All Contacts &nbsp;</div>
      {
        contacts && contacts.map((contact, index)=>(
          <div className='text-black' key={contact.$id}>
            <ContactCard
              index={index}
              $id={contact.$id}
              content={contact.content}
              userId={contact.userId}
              email={contact.email}
              fetchAllContact={fetchAllContact}
              ToastContainer={ToastContainer}
            />
          </div>
        ))
      }
    </div>
  )
}

export default AllContacts