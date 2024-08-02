import React,{useState,useEffect}from 'react'
import '../css/sales.css'
import axios from 'axios'

function Sales() {
  const [dailyAmt,setDailyAmt] = useState(0)
  const [weeklyAmt,setWeeklyAmt] = useState(0)
  const [monthlyAmt,setMonthlyAmt] = useState(0)

  useEffect(()=>{
    getDailySales()
    getWeeklySales()
    getMonthlySales()
  },[])


  const getDailySales = async()=>{
    try {
      const response = await axios.get('http://localhost:5000/api/collections/daily')

      const {data} = response
      const {total} = data[0]

      setDailyAmt(total)
      // console.log(total)
      
    } catch (error) {
      console.log("Error in fetching the Daily sales data")
    }
  }

  const getWeeklySales = async()=>{
    try {
      const response = await axios.get('http://localhost:5000/api/collections/weekly')

      const {data} = response

      const {total} = data[0]

      setWeeklyAmt(total)
      
    } catch (error) {
      console.log("Error in fetching weekly sales data")
    }
  }

  const getMonthlySales = async()=>{
    try {
      const response = await axios.get('http://localhost:5000/api/collections/monthly')

      const {data} = response

      const {total} = data[0]

      setMonthlyAmt(total)
    } catch (error) {
      console.log("Error in fetching monthly sales data")
    }
  }
  return (
    <>
    <title>Sales Page</title>
      <main>
        <div className="body"></div>
        <div className="card-container">
          <div className="card">
            <h2>Today's Sales</h2>
            <p>
              <b>{dailyAmt}</b>
            </p>
          </div>
          <div className="card">
            <h2>Weekly Sales</h2>
            <p>
              <b>{weeklyAmt}</b>
            </p>
          </div>
          <div className="card">
            <h2>Monthly Sales</h2>
            <p>
              <b>{monthlyAmt}</b>
            </p>
          </div>
        </div>
      </main>
      </>
  )
}

export default Sales