import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from 'components/template/Theme'
import Layout from 'components/layout'
import history from './history'
import mockServer from './mock'
import appConfig from 'configs/app.config'
import './locales'
import Visit from 'visit'
import { RecoilRoot } from 'recoil';

const environment = process.env.NODE_ENV

if (appConfig.enableMock) {
    mockServer({ environment })
}

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RecoilRoot>
                <BrowserRouter history={history}>
                    <Theme>
                        <Layout />
                    </Theme>
                </BrowserRouter>
                </RecoilRoot>
            </PersistGate>
            <Visit />
        </Provider>
    )
}

export default App
