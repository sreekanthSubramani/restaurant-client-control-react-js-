import { createContext, useState } from "react";

export const AddonConext = createContext(null)

const StoreProvider = (props)=>{
    const [showAddOnScreen, setShowAddonScreen] = useState(false)
    const [showAllAddons, setShowAllAddons] = useState([])
    const [showItems, setShowItems] = useState(false)

    const contextValue = {
        showAddOnScreen,
        setShowAddonScreen,
        showAllAddons,
        setShowAllAddons,
        showItems,
        setShowItems
    }

    return(
        <AddonConext.Provider value={contextValue}>
            {props.children}
        </AddonConext.Provider>
    )

}


export default StoreProvider