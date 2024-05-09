import React, { PureComponent} from 'react';
import { Provider } from 'react-redux'
import { store, persistor } from '@src/store/configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'

import App from '@src/App'

class Index extends PureComponent{

    render(){
        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        )
    }
}

export default Index