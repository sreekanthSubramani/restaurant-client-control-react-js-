import { createContext, useState } from "react";

export const AddonConext = createContext(null)

const StoreProvider = (props)=>{
    const [showAddOnScreen, setShowAddonScreen] = useState(false)

    const contextValue = {
        showAddOnScreen,
        setShowAddonScreen
    }

    return(
        <AddonConext.Provider value={contextValue}>
            {props.children}
        </AddonConext.Provider>
    )

}


export default StoreProvider