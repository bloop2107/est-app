import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

const SortComponent = ({onSortChange}) => {
    const [sort,setSort] = useState('newest');

    function handleSortChange(e) {
        const value = e.target.value;
        setSort(value);
        onSortChange(value);
    }


  return (
      <>
        <Form.Select value={sort} onChange={handleSortChange}>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
        </Form.Select>
      </>
  );
};

export default SortComponent;
