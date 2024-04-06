import React , {useEffect, useState} from 'react'
import { orders  as orderDetails} from '../appwrite'
import OrderCard from '../components/Order/OrderCard'
const AllOrders = () => {
  const [orders, setorders] = useState(null)
  const fetchAllOrders = async() => {
    const [res,err] = await orderDetails.getAllOrders()
    if(res) setorders(res.documents)
    console.log(res)
  }
  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='m-2'>
      <div className='font-bold text-3xl underline'>
        All Orders&nbsp;
      </div>
      <div className='mt-6'>
        {
          orders && orders.map((order, index)=>(
            <div  key={order.$id}>
              <OrderCard
                index={index}
                $id={order.$id}
                buyerId={order.buyerId}
                success={order.success}
                total={order.total}
                amount={order.amount}
                productId={order.productId}
                $updatedAt={order.$updatedAt}
                orderId={order.orderId}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllOrders