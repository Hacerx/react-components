import './App.css';
import Combobox from './combobox/combobox';
// import DropdownList from "react-widgets/DropdownList";

function App() {

    const options = [...Array(100).keys()].map(el => {
        return {
            label: `Option | ${el}`,
            value: el
        };
    });

    function onSelected(data){
        console.log(`Selected: ${data.label}`);
    }

    return (
    
        <>
            <Combobox options={options} onSelected={onSelected} selectPreview={true}/>
            <br></br>
            <Combobox options={options} selected={5} />
            {/* <DropdownList
        data={options}
        textField="label"
        valueField="value"
        placeholder="Search..."
      /> */}
        </>
    );
}

export default App;
