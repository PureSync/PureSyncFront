import React, { useCallback } from 'react'
import useDarkMode from 'utils/hooks/useDarkMode'
import { Switcher } from 'components/ui'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'

const withIcon = (component) => {
    return <div className="text-lg">{component}</div>
}

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark]
    )

    return (
        <div>
            <Switcher
                defaultChecked={isDark}
                onChange={(checked) => onSwitchChange(checked)}
                unCheckedContent={withIcon(<RiMoonClearLine />)}
                checkedContent={withIcon(<RiSunLine />)}
            />
        </div>
    )
}

export default ModeSwitcher
