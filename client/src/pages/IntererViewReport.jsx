import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { serverUrl } from '../App';
import { Loader2 } from 'lucide-react';
import { Step3Report } from '../components/Step3Report';

const IntererViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/interview/report/" + id, { withCredentials: true })

        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReport()
  }, [])

  if(!report){
    return (
      <div className='min-h-screen flex items-center justify-center'>
      <p className='text-gray-500 text-lg flex items-center justify-center'>
        <Loader2 className='w-12 h-12 animate-spin'/>
        Loading Report...
      </p>

      </div>
    )
  }
  return <Step3Report report={report}/>
}

export default IntererViewReport