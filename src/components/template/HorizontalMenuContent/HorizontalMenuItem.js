import React from 'react'
import navigationIcon from 'configs/navigation-icon.config'
import { MenuItem } from 'components/ui'
import HorizontalMenuNavLink from './HorizontalMenuNavLink'
import { useTranslation } from 'react-i18next'

const HorizontalMenuItem = ({ nav, isLink, manuVariant }) => {
    const { title, translateKey, icon, path } = nav

    const { t } = useTranslation()

    const itemTitle = t(translateKey, title)

    const renderIcon = icon && <span className="text-2xl">{navigationIcon[icon]}</span>

    return (
        <>
            {path && isLink ? (
                <HorizontalMenuNavLink path={path}>
                    <MenuItem variant={manuVariant}>
                        <span className="flex items-center gap-2">
                            {renderIcon}
                            {itemTitle}
                        </span>
                    </MenuItem>
                </HorizontalMenuNavLink>
            ) : (
                <MenuItem variant={manuVariant}>
                    {renderIcon}
                    <span>{itemTitle}</span>
                </MenuItem>
            )}
        </>
    )
}

export default HorizontalMenuItem
