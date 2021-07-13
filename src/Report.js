import React, { useState,useEffect} from 'react'
import {BarChart , Bar , XAxis, YAxis, Tooltip, CartesianGrid} from  'recharts'

const Report = ({selectedFile})=>{
    const [minute,setMin]=useState(0)
    const [hour,setHr]=useState(0)

    useEffect(()=>{
        const hr=parseInt((selectedFile[0].total_duration__minutes_)/60)
        const min = (selectedFile[0].total_duration__minutes_)%60
            setHr(hr)
            setMin(min)
    },[])
        
    
    return (
        <div>
            <div>
                <div>
                    <h1>Report</h1>
                    <h5>Host-{selectedFile[0].name__original_name_}</h5>
                    <h5>email-{selectedFile[0].user_email}</h5>
                    <h5>duriation-{selectedFile[0].total_duration__minutes_}min ({hour}hr{minute}min)</h5>
                </div>
                
              <div className='row' >
                <div className='col'>
                    <ParticipantsTable
                        selectedFile={selectedFile}
                    />
                </div>
                <div className='col'>
                    <Charts
                        selectedFile={selectedFile}
                    />
                </div>
              </div>
            </div>
        </div>
    )
}

const ParticipantsTable =({selectedFile})=>{
    return(
        <div>
            <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedFile.map((ele,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{ele.name__original_name_}</td>
                                        <td>{ele.user_email}</td>
                                        <td>{ele.total_duration__minutes_}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
}

const Charts=({selectedFile})=>{
    const [participants,setParticipants]=useState([])
    const [minutes,setminutes]=useState([])
    useEffect(()=>{
        const result=selectedFile.filter((ele)=>{
            return(ele.guest==='Yes')
        })
        setParticipants(result)

        const mins=[]
        selectedFile.forEach((ele)=>{
            mins.push(ele.total_duration__minutes_)
        })
        setminutes(mins)
    },[])

    const min =Math.min(...minutes)
    const max= Math.max(...minutes)
    const domainValues=[min,max]
    const tickValues=[]
    for(let i=min-5;i<=max+5;i++){
        tickValues.push(i)
    }
    
    return(
        <div className='mt-3'>
            <BarChart width={600} height= {300} data={participants}>
                <XAxis dataKey='name__original_name_' stroke='#800080'/>
                <YAxis ticks={tickValues} domain={domainValues}/>
                <Tooltip/>
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5'/>
                <Bar dataKey='total_duration__minutes_' fill='#800080' barSize={30}/>

            </BarChart>
        </div>
    )
}

export default Report