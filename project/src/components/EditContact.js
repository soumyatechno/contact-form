import React, {useState, useEffect}from 'react'
import {Link , useParams} from "react-router-dom" ;
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
 const EditContact = () => {
     const [name,setName] = useState("");
     const [email,setEmail] = useState("");
     const [number,setNumber] = useState("");
     const {id} = useParams();
     const contacts = useSelector(state => state);
     const currentContact = contacts.find(contact =>contact.id === parseInt(id));
     useEffect(() => {
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
     }, [currentContact])
     const dispatch = useDispatch();

     const history = useHistory();

     const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number) && number);
        console.log(checkNumber);
        if(!email || !number || !name){
            return toast.warning("Please filll in all the fields!")
        }

        if(checkEmail) {
            return toast.error("Email already exist!")
        }

        if(checkNumber) {
           return toast.error("Phonenumber already exist!")
       }
       const data = {
           id: parseInt(id),
           name,
           email,
           number
       };
       dispatch({type:"UPDATE_CONTACT", payload: data})
       toast.success("Student updated successfully !!")
       history.push("/");
    }
    return (
        <div className="container">
            {currentContact ? (
            <>
              <h1 className="display-3 my-5 text-center">
               Edit Student {id}
               </h1>
             <div className="row">
            
               <div className="col-md-6 shadow mx-auto p-5">
                 <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input type="text" placeholder="Name" className="form-control" value={name} onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="email" placeholder="Email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="number" placeholder="Phone Number" className="form-control" value={number} onChange={(e)=> setNumber(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="submit" value="Update Student" className="btn btn-dark"/>
                        <Link to="/" className="btn btn-danger ms-3">Cancel</Link>
                    </div>
                </form>
            </div>
        
          </div>
          </> ): (
          <h1 className="display-3 my-5 text-center">
           Student Contact with this id {id} does not exist in the Student database.
           </h1>
        )} 
    </div>
    )
}

export default EditContact
