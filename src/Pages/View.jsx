import React, { useState, useEffect,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { editTask, getOneTaskApi } from '../services/allApi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { addResponseContext } from '../context/ContextApi';


function View() {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false);
  const [edit,setEdit]=useState([])
  const {setAddResponse}=useContext(addResponseContext)

  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await getOneTaskApi(id)
    if (res.status == 200) {
      setData(res.data)
      setEdit(res.data)
    } else {
      console.log(res);
    }

  }

  const handleEdit=async()=>{
    // console.log(edit);
    const {title,due,status,description}=data
    if(!title || !due || !status || !description){
        toast.error("Enter Valid Inputs")
    }else{
      const res=await editTask(id,edit)
      if(res.status==200){
        toast.success("Updated")
        handleClose()
        setAddResponse(res)
        getData()
      }else{
        toast.error("Updation Failed")
        console.log(res);
      }
      
    }
        
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center' style={{ minHeight: "87vh" }}>
        {
          data ?
            <div className='viewDiv border p-3 rounded shadow'>
              <h3>{data?.title}</h3>
              <p style={{ textAlign: "justify" }}>{data?.description}</p>
              <h6 className='mb-3'>Due : {data?.due}</h6>
              <h6>status : <b>{data?.status}</b></h6>
              <button className='btn btn-outline-primary my-3' onClick={handleShow}>
                <i className="fa-solid fa-file-pen me-2 " style={{ color: "#309ef2", }} />
                Edit
              </button>            </div>
            :
            <h4 className='text-center text-danger'>Something Went Wrong</h4>
        }


      </div>


      {/* edit-modal */}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FloatingLabel controlId="Title" label="Title">
            <Form.Control type="text" placeholder="" defaultValue={data?.title} className="mb-3" onChange={(e) => { setEdit({ ...edit, title: e.target.value }) }} />
          </FloatingLabel>
          <FloatingLabel controlId="Description" label="Description">
            <Form.Control type="text" placeholder="" defaultValue={data?.description} className="mb-3" onChange={(e) => { setEdit({ ...edit, description: e.target.value }) }} />
          </FloatingLabel>
          <FloatingLabel controlId="Due Date" label="Due Date">
            <Form.Control type="date" placeholder="" defaultValue={data?.due} className="mb-3" onChange={(e) => { setEdit({ ...edit, due: e.target.value }) }} />
          </FloatingLabel>

          <select name="" className='form-control' id="" onChange={(e) => { setEdit({ ...edit, status: e.target.value }) }} >
            {
              data?.status == 'Completed' ?
                <>
                  <option value={`${data?.status}`}  >{data?.status}</option>
                  <option value="Not Completed">Not Completed</option>
                  <option value="Working On It">Working On It</option>
                </>
                :
                data?.status == 'Not Completed' ?
                  <>
                    <option value={`${data?.status}`}  >{data?.status}</option>
                    <option value="Completed">Completed</option>
                    <option value="Working On It">Working On It</option>
                  </>
                  :
                  <>
                    <option value={`${data?.status}`}  >{data?.status}</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                  </>
            }
          </select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default View