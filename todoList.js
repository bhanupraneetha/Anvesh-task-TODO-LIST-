import React, { useState , useEffect,useRef} from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";


const TodoList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.classList.add('blink-animation');

    const removeBlinkClass = () => {
      inputRef.current.classList.remove('blink-animation');
    };

    const currentInputRef = inputRef.current; 

    currentInputRef.addEventListener('animationend', removeBlinkClass);

    return () => {
      currentInputRef.removeEventListener('animationend', removeBlinkClass); 
    };
  }, [inputValue]);




  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, { text: inputValue }]);
      setInputValue('');
    }
  };


  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };


  const handleEditItem = (index) => {
    const editedItem = prompt('Edit item:', items[index].text);
    if (editedItem !== null) {
      const updatedItems = [...items];
      updatedItems[index].text = editedItem;
      setItems(updatedItems);
    }
  };
  

  return (
    <div className="todo">
      <div>
        <h1 className="heading">TODO LIST </h1><hr/>
        <input
        className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="add item..."
          ref={inputRef}
        /><br/>
        <button className="add" onClick={handleAddItem}> <IoMdAddCircle size={30}/></button>

        <table  style={{ backgroundColor: 'lightgrey',   width: '100%', borderCollapse: 'collapse', margin:'5px 0px 0px 0px'}}>
          <tbody className="table">
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '2px solid brown' }} colSpan="2">
                  <span className="row">{item.text}</span>
                  
                  <span className="buttons">
                  <button  className="delete" onClick={() => handleDeleteItem(index)}><RiDeleteBin6Line size={20} /></button>
                  <button   className="edit" onClick={() => handleEditItem(index)}><MdOutlineEdit size={20} /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
