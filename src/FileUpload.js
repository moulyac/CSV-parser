import React, { useState } from 'react';

import CSVReader from 'react-csv-reader'
import Report from './Report'

function FileUpload(){
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (e)=>{
        setSelectedFile(e)
        
    }
   // console.log(selectedFile)
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
          header
         .toLowerCase()
         .replace(/\W/g, '_')
    }

    const handleSubmission = ()=>{
        setIsFilePicked(true)
    }
    const handleSelect = ()=>{
        setIsFilePicked(false)
    }

	return(
   <div className='mt-3'>
        <CSVReader
        onFileLoaded={changeHandler}
        parserOptions={papaparseOptions}
        //onClick={handleSelect}
        />
        <div className='mt-3'>
		    <button onClick={handleSubmission}>Submit</button>
		</div>
        <hr/>
        {
            isFilePicked&&(
                <Report
                    selectedFile={selectedFile}
                />
            )
        }

		</div>
	)
}
export default FileUpload