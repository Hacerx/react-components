import './App.css';
import Combobox from './combobox/combobox';
import Card from './card/card';
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
            {/* <Card img="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" title="Mi titulo" description="Me hago rico" buttonLabel="Pulsa aquí bobo"/>
            <Card img="https://cdn.britannica.com/70/123170-050-D7AAF458/AK-47.jpg" title="Mi titulo" description="Me hago rico" buttonLabel="Pulsa aquí bobo"/> */}
            <Combobox options={options} onSelected={onSelected} selectPreview={true} label="Primer combobox"/>
            <br></br>
            {/* <Combobox options={options} selected={5} /> */}
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
