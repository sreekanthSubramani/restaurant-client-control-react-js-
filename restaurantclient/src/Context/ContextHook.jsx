import { createContext, useState } from "react";

export const AddonConext = createContext(null)

const StoreProvider = (props)=>{
    const [showAllAddons, setShowAllAddons] = useState([])
    const [showItems, setShowItems] = useState(false)
    const [addOnComp, setAddOnComp] = useState('')

    const contextValue = {
        showAllAddons,
        setShowAllAddons,
        showItems,
        setShowItems,
        addOnComp, 
        setAddOnComp
    }

    return(
        <AddonConext.Provider value={contextValue}>
            {props.children}
        </AddonConext.Provider>
    )

}


export default StoreProvider