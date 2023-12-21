import React from 'react'
import Logo from 'components/template/Logo'
import { useSelector } from 'react-redux'
import ActionLink from 'components/shared/ActionLink'

const HeaderLogo = () => {
    const mode = useSelector((state) => state.theme.mode)

    return (
        <ActionLink to="/home">
            <Logo mode={mode} className="hidden md:block" />
        </ActionLink>
    )
}

export default HeaderLogo
