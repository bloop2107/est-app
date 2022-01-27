import React,{useState, useRef} from 'react';
import { Form } from 'react-bootstrap';

const SearchComponent = ({onSearchChange}) => {
    const [search,setSearch] = useState("");
    const debounce = useRef(null);

    const onInputChange = (value) => {
        let context = value;
        setSearch(context); 
        if(debounce.current){
            clearTimeout(debounce.current)
        }
        debounce.current = setTimeout(() =>{
            onSearchChange(context);
        },300);

    }   

  return (
      <>
            <Form.Control
                type="text"
                placeholder="Search..."
                value={search}
                onChange = {(e) => onInputChange(e.target.value)}
            />
      </>
  );
};

export default SearchComponent;
