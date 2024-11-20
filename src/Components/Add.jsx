import React,{ useState,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { addTaskApi } from '../services/allApi';
import { addResponseContext } from '../context/ContextApi';

function Add() {
  const [show, setShow] = useState(false);
  const [input,setInput]=useState({
    title:"",description:"",due:"",status:""
  })
  const {setAddResponse}=useContext(addResponseContext)


  const handleAdd=async()=>{
    const {title,due,description,status}=input
    if(!title || !due || !description || !status){
      toast.error("Please Enter Valid Inputs")
    }else{
      const res=await addTaskApi(input)
      console.log(res);
      if(res.status==200){
        toast.success("Task Added")
        setAddResponse(res)
        setInput({title:"",description:"",due:"",status:""})
        handleClose()
      }
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn btn-warning mt-5 mb-3 ms-2' onClick={handleShow} >Add-Task +</button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FloatingLabel controlId="Title" label="Title">
            <Form.Control type="text" placeholder="" className="mb-3"  onChange={(e)=>{setInput({...input,title:e.target.value})}} />
          </FloatingLabel>
          <FloatingLabel controlId="Description" label="Description">
            <Form.Control type="text" placeholder="" className="mb-3"  onChange={(e)=>{setInput({...input,description:e.target.value})}} />
          </FloatingLabel>
          <FloatingLabel controlId="Due Date" label="Due Date">
            <Form.Control type="date" placeholder="" className="mb-3"  onChange={(e)=>{setInput({...input,due:e.target.value})}} />
          </FloatingLabel>
          
          <select name="" className='form-control' id="" onChange={(e)=>{setInput({...input,status:e.target.value})}}>
            <option value="" selected disabled>Status</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
            <option value="Working On It">Working On It</option>

          </select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add