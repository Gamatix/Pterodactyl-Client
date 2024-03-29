import { Dvr } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { GoCpu } from "react-icons/go";
import Divider from "@mui/material/Divider";
import { Button, Dialog, TextField } from "@mui/material";
import GooglePayButton from "@google-pay/button-react";
import productService from "../services/products.appwrite";
import classNames from "classnames";
import axios from "axios";
import { set } from "react-hook-form";
import { FaBullseye } from "react-icons/fa6";
function Card({ text, children, coins, resource, param }) {
  return (
    <div>
      <div className=" mt-2 flex flex-row bg-indigo-300 w-[350px] h-[85px] rounded-lg cursor-pointer hover:shadow-md hover:shadow-gray-600">
        <div className="mt-auto mb-auto ml-4 ">{children}</div>
        <div className="flex flex-col mr-auto mt-auto mb-auto ml-4">
          <div className="font-bold text-neutral-100  shadow-gray-300">
            {text}
          </div>
          <div className="flex flex-row m-auto font-bold text-neutral-700 text-lg">
            <div> {coins}💎 </div>
            <div className="text-neutral-500 -translate-y-0.5 text-[16px]">
              &nbsp; for {resource}
              {param}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaleCard({
  img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ztwi9-pKGPKh8edWZYNuu2vtiDlO2d2hQA&usqp=CAU",
  coinAmout = "40000",
  economy = "Coins",
  price = 200,
  oneTime = false,
  pid,
  id,
  onSuccess,
  onError
}) {
  
  
  const handleSubmitPayment = async(e) => {
    console.log('clicked')
   const receipt = `${pid}`
   const currency = 'INR'
   const amount = price * 100
    const body = JSON.stringify({
      amount,
      currency,
      receipt,
    })

   try {
    const response = await axios.post('http://localhost:5000/order', body , {
       headers: {
         'Content-Type': 'application/json'
       }
     
    } )
    console.log(response)
    

    // ----------------------------------------------


    var options = {
      "key": `rzp_test_xEWXISt9NNUkuF`, // Enter the Key ID generated from the Dashboard
      "amount": amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "How2MC Client", //your business name
      "description": "Test Transaction",
      "image": "https://cdn.freebiesupply.com/logos/large/2x/spider-man-3-logo-png-transparent.png",
      "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler":async function(response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)

        const body = {
          ...response
        };

        const  validateResponse = await axios.post('http://localhost:5000/order/validate' , JSON.stringify(body), { 
        headers:{
          'Content-Type': 'application/json'
        }

        })
        console.log(validateResponse)
        if(validateResponse.status === 200){
          
          onSuccess()
        }
        else{
          onError()
        }


      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "", //your customer's name
          "email": localStorage?.email, 
          "contact": ""  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
          onError()
  });
  rzp1.open();
    e.preventDefault();
 



   } catch (error) {
    console.log(error)
   }


  }
  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.9",
      }}
      className=   ' w-[300px] m-1 h-auto bg-opacity-30 bg-sky-300 mt-2 p-2 rounded-lg cursor-pointer hover:shadow hover:shadow-gray-400 hover:border-gray-500 ' 
    >
      <div className="container relative">
        <div className="content rounded-lg ">
          <div className="flex flex-row  p-2">
            <div className="font-bold  text-black text-2xl mt-[200px]">
              {coinAmout} {economy}
            </div>
            <div className="text-neutral-800 font-bold text-lg mt-[200px]">
              &nbsp;for {price}₹
            </div>
          </div>
        </div>
        {
          oneTime ?  <div className="overlay absolute top-0  right-0 bg-gray-800  p-2 rounded-lg border border-neutral-200 shadow-orange-200 text-neutral-200">
          One-time
          </div> : null
        }
        <div className="mb-2 ml-auto">
        <Button onClick={handleSubmitPayment} fullWidth variant="contained" className="  text-neutral-200">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}

function Shops() {
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setopen] = useState(false);

  async function onSuccess(){
    setopen(true)
    setSuccess(true)
  }

  async function getAllProducts() {
    const products = await productService.getProducts();
    if (!products) return;
    console.log(products);
    setProducts(products.documents);
  }
  const [perror, setPerror] = useState(false);
  function onError(){
      
      setPerror(true)
  }
  useEffect(() => {
    getAllProducts();

    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] flex-1 rounded-lg mb-2 pb-6 ">
      <div>
        <p className="font-bold text-3xl ml-2 mt-2">Shops</p>
      </div>
      <div>
        <p className="text-neutral-700 ml-2 mt-2 font-bold text-xl">
          Coin items
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <Card
            text="Upgrade for CPU"
            coins="100"
            resource="100%"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Upgrade your RAM"
            coins="300"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Upgrade your Disk"
            coins="100"
            resource="1024MB"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional ports"
            coins="20"
            resource="1 port"
            children={<GoCpu fontSize={"40px"} />}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Card
            text="Additional servers"
            coins="250"
            resource="1 server slot"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional backups"
            coins="50"
            resource="1 backup slot"
            children={<GoCpu fontSize={"40px"} />}
          />
          <Card
            text="Additional databases"
            coins="25"
            resource="1 database slot"
            children={<GoCpu fontSize={"40px"} />}
          />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-center items-center">
            <div>
              {" "}
              <p className="mr-4 font-bold text-neutral-800 text-[30px] hover:random">
                Coins
              </p>
            </div>

            <div className="bg-slate-700 w-full flex-1 h-[2px] mr-8 hover:bg-red-700"></div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row">
              {products &&
                products.map((product, index) => {
                  return (
                    <SaleCard
                      key={index}
                      coinAmout={product.coins}
                      economy="Coins"
                      price={product.price}
                      pid={product.$id}
                      id={product.productId}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  );
                })}
            </div>
            
          </div>
        </div>
        <div className="flex mt-6 flex-row justify-center items-center">
          <div>
            {" "}
            <p className="mr-4 font-bold text-neutral-800 text-[30px] hover:random">
              Exclusive
            </p>
          </div>

          <div className="bg-slate-700 w-full flex-1 h-[2px] mr-8 hover:bg-red-700"></div>
        </div>
        <div className="flex flex-row gap-4">
          <SaleCard price={1500} />
          <SaleCard
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Ztwi9-pKGPKh8edWZYNuu2vtiDlO2d2hQA&usqp=CAU"
            coinAmout="20000"
            economy="Coins"
            price={1250}
          />
        </div>
        <div className="flex flex-row gap-4"></div>
      </div>
      {
        open  ?
          <div>
            <Dialog open={open}  >
              <div className=" rounded-lg w-[500px] h-[150px] flex flex-col items-center justify-center bg-neutral-400">
                <div className="text-xl font-bold text-black">Payment Successful</div>
                <div className="mt-4">
                  <Button onClick={() => 
                    {
                      setopen(false)
                      setSuccess(false)
                    }
                  } variant="contained" className="bg-green-500 text-white">Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        : null
      }
      {
        perror  ?
          <div>
            <Dialog open={perror}  >
              <div className=" rounded-lg w-[500px] h-[150px] flex flex-col items-center justify-center bg-neutral-400">
                <div className="text-xl font-bold text-black">Payment Unsuccessful</div>
                <div className="mt-4">
                  <Button onClick={() => 
                    {
                      setPerror(false)
                    }
                  } variant="contained" className="bg-green-500 text-white">Close</Button>
                </div>
              </div>
            </Dialog>
          </div>
        : null
      }
    </div>
  );
}

export default Shops;
