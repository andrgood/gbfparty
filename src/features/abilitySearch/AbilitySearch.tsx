import React, {useState} from 'react'
import {useCombobox} from 'downshift'

import abilitySearchList, { AbilitySearchItemT } from './abilitySearchList'

interface AbilitySearchProps {
    onChange(selectedItem: AbilitySearchItemT): void;
}

function AbilitySearch({ onChange }: AbilitySearchProps): React.ReactElement {

    const [inputItems, setInputItems] = useState(abilitySearchList)

    const {
        getLabelProps,
        getComboboxProps,
        getInputProps,
        getToggleButtonProps,
        isOpen, getMenuProps,
        highlightedIndex, getItemProps,
        reset
    } = useCombobox({
        items: inputItems,
        itemToString: (item) => {
            return item == null ? '' : String(item.label)
        },
        onInputValueChange: ({inputValue}) => {
            setInputItems(
                abilitySearchList.filter(item => {
                    return item.label.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
                })
            )
        },
        onSelectedItemChange: (changes) => {
            if(changes.selectedItem !== null) {
                onChange(changes.selectedItem)
            }
            reset()
        }
    })

    return(
        <React.Fragment>
            <form>
                <label className="is-sr-only" {...getLabelProps()}>Choose a characteristic (Element, Race) or ability (Delay, Dispel)</label>
                <div className="field has-addons" {...getComboboxProps()}>
                    <div className="control is-expanded">
                        <input className="input is-medium" type="text" placeholder="Type in characteristic (Element, Race) or ability (Delay, Dispel)" {...getInputProps()} />
                    </div>
                    <div className="control">
                        <button type="button" className="button is-primary is-medium" {...getToggleButtonProps()} aria-label={'toggle menu'} >&#129047;</button>
                    </div>
                </div>
            </form>
            
            <div className={isOpen ? `dropdown is-active`: `dropdown`} {...getMenuProps()} >
                <div className="dropdown-menu">
                    <div className="dropdown-content">
                        {isOpen &&
                        inputItems.map((item, index) => (
                            <a 
                                className={
                                    highlightedIndex === index ? 'dropdown-item is-active' : 'dropdown-item'
                                }
                                key={`${item.value}${index}`}
                                {...getItemProps({item, index})}
                            >
                                {item.label}
                            </a>
                        ))
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AbilitySearch