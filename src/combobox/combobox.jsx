import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

const Combobox = ({
    selected, 
    placeholder="Search...", 
    options=[], 
    selectPreview=false,
    label="",
    rightLabel="",
    bottomLeftLabel="",
    bottomRightLabel="",
    onSelected =() => undefined
}) => {

    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if(selected){
            setSearchValue(options.find(option => option.value === selected).label);
        }
    }, [selected, options]);

    let timeout = null;

    function onChange(event) {
        clearTimeout(timeout);
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        if (searchValue) {
            setFilteredOptions(options.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase())));
        } else {
            setFilteredOptions(options);
        }
    }, [searchValue, options]);

    let _selectedValue = null;

    const setSelectedValue = (value, close) =>{
        _selectedValue = options.find(option => option.value.toString() === value);
        if(close){
            setSearchValue(_selectedValue.label);
            setOpen(false);
        }
        onSelected(_selectedValue);
    };

    function handleKeyDown(event) {
        if(event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') return;
        
        event.stopPropagation();
        event.preventDefault();
        if(!event.currentTarget.contains(document.activeElement)) return;
        const index = document.activeElement.tabIndex ?? 0;
        let newIndex = index;
        if (event.key === 'ArrowDown') {
            if(index >= filteredOptions.length) return;
            newIndex++;
        } else if (event.key === 'ArrowUp') {
            if(index <= 1) return;
            newIndex--;
            
        } else if (event.key === 'Enter') {
            setSelectedValue(event.target.getAttribute('value').toString(), true);
        }

        if(newIndex !== index){
            dropdownRef?.current?.querySelector(`a[tabindex="${newIndex}"]`).focus();
        }        
        if(selectPreview){
            setSelectedValue(dropdownRef?.current?.querySelector(`a[tabindex="${newIndex}"]`).getAttribute('value').toString());
        }
    }

    let blurTimeout = null; 

    function handleBlur(){
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
            if(!dropdownRef.current.contains(document.activeElement)){
                setOpen(false);
            }
        }, 100);
    }

    return (
        <div ref={dropdownRef} className={classNames({
            "dropdown w-full": true,
            "dropdown-open": open,
        })}>
            {(label || rightLabel) &&
                <label className="label">
                    <span className="label-text">{label}</span>
                    <span className="label-text-alt">{rightLabel}</span>
                </label>
            }
            <input
                type="text"
                className="input input-bordered w-full"
                value={searchValue}
                onChange={onChange}
                onClick={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                onBlur={handleBlur}
                tabIndex={0}
            />
            {(bottomLeftLabel || bottomRightLabel) &&
                <label className="label">
                    <span className="label-text-alt">{bottomLeftLabel}</span>
                    <span className="label-text-alt">{bottomRightLabel}</span>
                </label>
            }
            {open &&
            <div className="dropdown-content bg-base-200 top-17 max-h-96 overflow-auto flex-col rounded-md w-full z-10" onBlur={handleBlur}>
                <ul className="menu menu-compact">
                    {filteredOptions?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                tabIndex={index+1}
                                value={item.value}
                                className="border-b border-b-base-content/10 w-full"
                            >
                                <a tabIndex={index+1} value={item.value} onBlur={handleBlur} onMouseDown={(event) => setSelectedValue(event.target.getAttribute('value').toString(), true)} onKeyDown={handleKeyDown}><div dangerouslySetInnerHTML={{ __html: item.label }}/></a>
                            </li>
                        );
                    })}
                </ul>
            </div>}
        </div>
        
    );
};

export default Combobox;