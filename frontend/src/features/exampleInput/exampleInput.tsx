import React,{ChangeEvent, useState} from 'react';

export interface InputProps {
  label: string;
}

export const ShowInputText = ({label}:InputProps) => {
  const [inputValue, setInputValue]=useState({value:''})
  const [paragraphValue, setParagraphValue]=useState({value:''});

  const onInputChange=(event:ChangeEvent<HTMLInputElement>)=>{
    setInputValue({value:event.target.value})
  }

  const onButtonClick=()=>{
setParagraphValue({value:inputValue.value})
  }

    return (
      
      <div>
          <div>
              <label>
              {label}
          <input type='text' name='name' onChange={onInputChange} ></input>
          </label>
          </div>
          
          <button onClick={onButtonClick}>Jakis button</button>
          <p>{paragraphValue.value}</p>
      </div>
      
    );
  };

