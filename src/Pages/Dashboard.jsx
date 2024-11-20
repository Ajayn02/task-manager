import React,{useEffect, useState,useContext} from 'react'
import Add from '../Components/Add'
import { Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getAllTaskApi ,deleteTask} from '../services/allApi';
import { addResponseContext } from '../context/ContextApi';
import toast from 'react-hot-toast';

function Dashboard() {
  const [data,setData]=useState([])
  const {addResponse}=useContext(addResponseContext)

  useEffect(()=>{
    getAllTasks()
  },[addResponse])

  const getAllTasks=async()=>{
    const res=await getAllTaskApi()
    // console.log(res);
    if(res.status==200){
      setData(res.data)
    }else{
      console.log(res);
      
    }
    
  }

  const handleDelete=async(id)=>{
    const res=await deleteTask(id)
    if(res.status==200){
      toast.success("Deleted")
      getAllTasks()
    }else{
      toast.error("Deletion Failed")
      console.log(res);

    }
  }

  return (
    <>
      <div className='container-fluid' style={{ minHeight: "87vh" }}>

      <Add />
      
    
       
        <Row className='row'>
          {
            data?.length>0 ?
            data.map((item)=>(
              <Col md={6} lg={3} sm={12} className='d-flex  justify-content-center align-items-center flex-column'key={item._id}>

              <Card className='m-2' style={{ width: '16rem' }}>
                <Card.Body>
                  <Card.Title>{item?.title}</Card.Title>
                  <Card.Text style={{ textAlign: "justify" }}>
                    {item?.description}
                  </Card.Text>
                  <div className='d-flex justify-content-between'>
                  <Link to={`/view/${item._id}`} className='btn btn-primary'>View More</Link>
                  <button className='btn btn-outline-danger' onClick={()=>{handleDelete(item._id)}}>
                      <i className="fa-solid fa-trash-can fa-lg" style={{ color: "#be375f", }} />
                    </button>
                  </div>
                </Card.Body>
              </Card>
  
            </Col>
            ))
            :
            <h3 className='text-center text-danger'>No Tasks Added Yet</h3>
          }
        </Row>
      </div>
    </>
  )
}

export default Dashboard

