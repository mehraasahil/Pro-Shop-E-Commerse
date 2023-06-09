import React from 'react'
import { useState,useEffect, } from 'react'
import { Link,useParams } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card, ListGroupItem,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch ,useSelector} from 'react-redux'  // for redux
import { listProductDetails } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
// import products from '../products'
// import axios from 'axios'
function ProductScreen() {
    const navigate = useNavigate();
    const [qty ,setQty] = useState(1)
    const match = useParams()
    const dispatch = useDispatch()
   // const params = useParams();
    //let {id} = useParams();
    // const product = products.find((p) => p._id == id)      //s remove from all produccts after using axios
    // const[product,setProduct] = useState([])
    const productDetails = useSelector(state => state.productDetails)
    const{loading, error, product} = productDetails
    useEffect(()=>{
        dispatch(listProductDetails(match.id))
    //   async function fetchProduct(){     //this code all changed into comment after the redux
    //   const {data}= await axios.get(`/api/products/${params.id}`)
    //   setProduct(data)
    //   }
    //   fetchProduct()
    },[])

    const addToCartHandler = () =>{
        navigate(`/cart/${match.id}?qty=${qty}`)
        console.log('Add to cart:',match.id)
    }
//let product = {}
  return (
    <div>
     <Link to ='/' className='btn btn-light my-3'>Go Back</Link>
    {
        loading ? 
        <Loader />
        : error
        ?<Message variant='danger'>{error}</Message>
        :(
            <Row>
            <Col md = {6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md = {3}>
                <ListGroup varient='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text= {`${product.numReviews} reviews `} color={`#f8e825`}/>
                    </ListGroup.Item>
    
                    <ListGroup.Item>
                       Price : ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                       Decription : {product.description }
                    </ListGroup.Item>
                   
    
                </ListGroup>
            </Col>
            <Col md = {3}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                <strong>${product.price}</strong>
                                </Col>
    
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                               {product.countInstock > 0 ? 'In Stock' : 'Out of Stock' }
                                </Col>
    
                            </Row>
                        </ListGroup.Item>

                        {
                            product.countInstock > 0  && (       // Logic for dropdown on item quantity
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty
                                        </Col>
                                        <Col xs = 'auto' className='my-1'>
                                        <Form.Control
                                            as = "select"
                                            value={qty}
                                            onChange={(e)=> setQty(e.target.value)
                                            }>
                                                {
                                                    [...Array(product.countInstock).keys()].map((x) => (
                                                        <option key = { x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                        </Form.Control>
                                        
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                                    }
                        <ListGroup.Item>
                            <Button
                             onClick={addToCartHandler}
                            className = 'btn-block' 
                            disabled={product.countInstock==0} 
                            type = 'button'>
                            Add To Cart
                            </Button>
                        </ListGroup.Item>
                        <ListGroup/>
    
                    </ListGroup>
                </Card>
            </Col>
         </Row>
        )
    //     <Row>    //made comment after the Redux logic for loader
    //     <Col md = {6}>
    //         <Image src={product.image} alt={product.name} fluid/>
    //     </Col>
    //     <Col md = {3}>
    //         <ListGroup varient='flush'>
    //             <ListGroup.Item>
    //                 <h3>{product.name}</h3>
    //             </ListGroup.Item>
    //             <ListGroup.Item>
    //                 <Rating value={product.rating} text= {`${product.numReviews} reviews `} color={`#f8e825`}/>
    //             </ListGroup.Item>

    //             <ListGroup.Item>
    //                Price : ${product.price}
    //             </ListGroup.Item>
    //             <ListGroup.Item>
    //                Decription : {product.description }
    //             </ListGroup.Item>
               

    //         </ListGroup>
    //     </Col>
    //     <Col md = {3}>
    //         <Card>
    //             <ListGroup variant = 'flush'>
    //                 <ListGroup.Item>
    //                     <Row>
    //                         <Col>Price:</Col>
    //                         <Col>
    //                         <strong>${product.price}</strong>
    //                         </Col>

    //                     </Row>
    //                 </ListGroup.Item>
    //                 <ListGroup.Item>
    //                     <Row>
    //                         <Col>Status:</Col>
    //                         <Col>
    //                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
    //                         </Col>

    //                     </Row>
    //                 </ListGroup.Item>
    //                 <ListGroup.Item>
    //                     <Button className = 'btn-block' disabled={product.countInStock==0} type = 'button'>
    //                     Add To Cart
    //                     </Button>
    //                 </ListGroup.Item>
    //                 <ListGroup/>

    //             </ListGroup>
    //         </Card>
    //     </Col>
    //  </Row>
    }
    
    </div>
  )
}

export default ProductScreen;
