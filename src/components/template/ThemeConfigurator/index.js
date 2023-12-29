import React from 'react'
import ModeSwitcher from './ModeSwitcher'
import LayoutSwitcher from './LayoutSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import CopyButton from './CopyButton'

const ThemeConfigurator = ({ callBackClose }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-y-10 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h6>다크 모드</h6>
                    </div>
                    <ModeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">테마</h6>
                    <ThemeSwitcher />
                </div>
                <div>
                    <h6 className="mb-3">레이아웃</h6>
                    <LayoutSwitcher />
                </div>
            </div>
            <CopyButton />
        </div>
    )
}

export default ThemeConfigurator
